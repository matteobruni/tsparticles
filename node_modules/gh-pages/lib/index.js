const findCacheDir = require('find-cache-dir');
const Git = require('./git');
const filenamify = require('filenamify-url');
const copy = require('./util').copy;
const getUser = require('./util').getUser;
const fs = require('fs-extra');
const globby = require('globby');
const path = require('path');
const util = require('util');

const log = util.debuglog('gh-pages');

function getCacheDir() {
  return findCacheDir({name: 'gh-pages'});
}

function getRepo(options) {
  if (options.repo) {
    return Promise.resolve(options.repo);
  } else {
    const git = new Git(process.cwd(), options.git);
    return git.getRemoteUrl(options.remote);
  }
}

exports.defaults = {
  dest: '.',
  add: false,
  git: 'git',
  depth: 1,
  dotfiles: false,
  branch: 'gh-pages',
  remote: 'origin',
  src: '**/*',
  remove: '.',
  push: true,
  history: true,
  message: 'Updates',
  silent: false
};

/**
 * Push a git branch to a remote (pushes gh-pages by default).
 * @param {string} basePath The base path.
 * @param {Object} config Publish options.
 * @param {Function} callback Callback.
 */
exports.publish = function publish(basePath, config, callback) {
  if (typeof config === 'function') {
    callback = config;
    config = {};
  }

  const options = Object.assign({}, exports.defaults, config);

  // For backward compatibility before fixing #334
  if (options.only) {
    options.remove = options.only;
  }

  if (!callback) {
    callback = function(err) {
      if (err) {
        log(err.message);
      }
    };
  }

  function done(err) {
    try {
      callback(err);
    } catch (err2) {
      log('Publish callback threw: %s', err2.message);
    }
  }

  try {
    if (!fs.statSync(basePath).isDirectory()) {
      done(new Error('The "base" option must be an existing directory'));
      return;
    }
  } catch (err) {
    done(err);
    return;
  }

  const files = globby
    .sync(options.src, {
      cwd: basePath,
      dot: options.dotfiles
    })
    .filter(file => {
      return !fs.statSync(path.join(basePath, file)).isDirectory();
    });

  if (!Array.isArray(files) || files.length === 0) {
    done(
      new Error('The pattern in the "src" property didn\'t match any files.')
    );
    return;
  }

  let repoUrl;
  let userPromise;
  if (options.user) {
    userPromise = Promise.resolve(options.user);
  } else {
    userPromise = getUser();
  }
  return userPromise.then(user =>
    getRepo(options)
      .then(repo => {
        repoUrl = repo;
        const clone = path.join(getCacheDir(), filenamify(repo));
        log('Cloning %s into %s', repo, clone);
        return Git.clone(repo, clone, options.branch, options);
      })
      .then(git => {
        return git.getRemoteUrl(options.remote).then(url => {
          if (url !== repoUrl) {
            const message =
              'Remote url mismatch.  Got "' +
              url +
              '" ' +
              'but expected "' +
              repoUrl +
              '" in ' +
              git.cwd +
              '.  Try running the `gh-pages-clean` script first.';
            throw new Error(message);
          }
          return git;
        });
      })
      .then(git => {
        // only required if someone mucks with the checkout between builds
        log('Cleaning');
        return git.clean();
      })
      .then(git => {
        log('Fetching %s', options.remote);
        return git.fetch(options.remote);
      })
      .then(git => {
        log('Checking out %s/%s ', options.remote, options.branch);
        return git.checkout(options.remote, options.branch);
      })
      .then(git => {
        if (!options.history) {
          return git.deleteRef(options.branch);
        } else {
          return git;
        }
      })
      .then(git => {
        if (options.add) {
          return git;
        }

        log('Removing files');
        const files = globby
          .sync(options.remove, {
            cwd: path.join(git.cwd, options.dest)
          })
          .map(file => path.join(options.dest, file));
        if (files.length > 0) {
          return git.rm(files);
        } else {
          return git;
        }
      })
      .then(git => {
        log('Copying files');
        return copy(files, basePath, path.join(git.cwd, options.dest)).then(
          function() {
            return git;
          }
        );
      })
      .then(git => {
        return Promise.resolve(
          options.beforeAdd && options.beforeAdd(git)
        ).then(() => git);
      })
      .then(git => {
        log('Adding all');
        return git.add('.');
      })
      .then(git => {
        if (!user) {
          return git;
        }
        return git.exec('config', 'user.email', user.email).then(() => {
          if (!user.name) {
            return git;
          }
          return git.exec('config', 'user.name', user.name);
        });
      })
      .then(git => {
        log('Committing');
        return git.commit(options.message);
      })
      .then(git => {
        if (options.tag) {
          log('Tagging');
          return git.tag(options.tag).catch(error => {
            // tagging failed probably because this tag alredy exists
            log(error);
            log('Tagging failed, continuing');
            return git;
          });
        } else {
          return git;
        }
      })
      .then(git => {
        if (options.push) {
          log('Pushing');
          return git.push(options.remote, options.branch, !options.history);
        } else {
          return git;
        }
      })
      .then(
        () => done(),
        error => {
          if (options.silent) {
            error = new Error(
              'Unspecified error (run without silent option for detail)'
            );
          }
          done(error);
        }
      )
  );
};

/**
 * Clean the cache directory.
 */
exports.clean = function clean() {
  fs.removeSync(getCacheDir());
};
