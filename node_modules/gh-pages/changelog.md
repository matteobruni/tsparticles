## v3.1.0

The cache directory used by `gh-pages` is now `node_modules/.cache/gh-pages`.  If you want to use a different location, set the `CACHE_DIR` environment variable.

 * [#362](https://github.com/tschaub/gh-pages/pull/362) - Move the cache directory ([@tschaub](https://github.com/tschaub))
 * [#361](https://github.com/tschaub/gh-pages/pull/361) - Update dev dependencies ([@tschaub](https://github.com/tschaub))

## v3.0.0

Breaking changes:

None really.  But tests are no longer run on Node < 10.  Development dependencies were updated to address security warnings, and this meant tests could no longer be run on Node 6 or 8.  If you still use these Node versions, you may still be able to use this library, but be warned that tests are no longer run on these versions.

All changes:

 * [#357](https://github.com/tschaub/gh-pages/pull/357) - Dev dependency updates ([@tschaub](https://github.com/tschaub))
 * [#333](https://github.com/tschaub/gh-pages/pull/333) - Update readme with command line options ([@Victoire44](https://github.com/Victoire44))
 * [#356](https://github.com/tschaub/gh-pages/pull/356) - Test as a GitHub action ([@tschaub](https://github.com/tschaub))
 * [#355](https://github.com/tschaub/gh-pages/pull/355) - feat(beforeAdd): allow custom script before git add ([@Xiphe](https://github.com/Xiphe))
 * [#336](https://github.com/tschaub/gh-pages/pull/336) - Fix remove not working properly ([@sunghwan2789](https://github.com/sunghwan2789))
 * [#328](https://github.com/tschaub/gh-pages/pull/328) - Update .travis.yml ([@XhmikosR](https://github.com/XhmikosR))
 * [#327](https://github.com/tschaub/gh-pages/pull/327) - Fix typo ([@d-tsuji](https://github.com/d-tsuji))

## v2.2.0

 * [#318](https://github.com/tschaub/gh-pages/pull/318) - Allow an absolute path as dist directory ([@okuryu](https://github.com/okuryu))
 * [#319](https://github.com/tschaub/gh-pages/pull/319) - Added 'remove' documentation to the readme ([@Sag-Dev](https://github.com/Sag-Dev))
 * [#323](https://github.com/tschaub/gh-pages/pull/323) - Update dependencies ([@tschaub](https://github.com/tschaub))
 * [#277](https://github.com/tschaub/gh-pages/pull/277) - Add `--no-history` flag not to preserve deploy history ([@dplusic](https://github.com/dplusic))

## v2.1.1

 * [#312](https://github.com/tschaub/gh-pages/pull/312) - Add default for '--git' option ([@tschaub](https://github.com/tschaub))

 ## v2.1.0

 * [#307](https://github.com/tschaub/gh-pages/pull/307) - Dev dependency updates ([@tschaub](https://github.com/tschaub))
 * [#303](https://github.com/tschaub/gh-pages/pull/303) - Support '--git' CLI option ([@JRJurman](https://github.com/JRJurman))

## v2.0.1

 * [#268](https://github.com/tschaub/gh-pages/pull/268) - Continue even if no git configured user.

## v2.0.0

Breaking changes:

 * Requires Node 6 and above.  If you require support for Node 4, stick with v1.2.0.
 * The git user for commits is determined by running `git config user.name` and `git config user.email` in the current working directory when `gh-pages` is run.  Ideally, this is what you want.  In v1, the git user was determined based on the `gh-pages` install directory.  If the package was installed globally, the git user might not have been what you expected when running in a directory with a locally configured git user.

 * [#264](https://github.com/tschaub/gh-pages/pull/264) - Better user handling (thanks @holloway for getting this going and @nuklearfiziks and @paulirish for pushing it over the edge)
 * [#263](https://github.com/tschaub/gh-pages/pull/263) - Infra: newer syntax and upgrade deps to latest stable versions ([@AviVahl](https://github.com/AviVahl))


## v1.2.0

 * [#252](https://github.com/tschaub/gh-pages/pull/252) - Update dependencies ([@tschaub](https://github.com/tschaub))
 * [#245](https://github.com/tschaub/gh-pages/pull/245) - Typos ([@thekevinscott](https://github.com/thekevinscott))
 * [#251](https://github.com/tschaub/gh-pages/pull/251) - Update async to the latest version 🚀 ([@tschaub](https://github.com/tschaub))
 * [#243](https://github.com/tschaub/gh-pages/pull/243) - docs(readme.md): add tips ([@polyglotm](https://github.com/polyglotm))
 * [#241](https://github.com/tschaub/gh-pages/pull/241) - Update sinon to the latest version 🚀 ([@tschaub](https://github.com/tschaub))
 * [#240](https://github.com/tschaub/gh-pages/pull/240) - Update eslint-config-tschaub to the latest version 🚀 ([@tschaub](https://github.com/tschaub))
 * [#239](https://github.com/tschaub/gh-pages/pull/239) - Assorted updates ([@tschaub](https://github.com/tschaub))
 * [#238](https://github.com/tschaub/gh-pages/pull/238) - fix(package): update commander to version 2.15.1 ([@tschaub](https://github.com/tschaub))
 * [#237](https://github.com/tschaub/gh-pages/pull/237) - chore(package): update mocha to version 5.0.5 ([@tschaub](https://github.com/tschaub))
 * [#232](https://github.com/tschaub/gh-pages/pull/232) - Update sinon to the latest version 🚀 ([@tschaub](https://github.com/tschaub))

## v1.1.0

 * [#218](https://github.com/tschaub/gh-pages/pull/218) - Update dependencies, test on Node 8 ([@tschaub](https://github.com/tschaub))
 * [#211](https://github.com/tschaub/gh-pages/pull/211) - Update async to the latest version 🚀 ([@tschaub](https://github.com/tschaub))
 * [#202](https://github.com/tschaub/gh-pages/pull/202) - chore(package): update sinon to version 3.2.1 ([@tschaub](https://github.com/tschaub))
 * [#201](https://github.com/tschaub/gh-pages/pull/201) - chore(package): update chai to version 4.1.1 ([@tschaub](https://github.com/tschaub))
 * [#196](https://github.com/tschaub/gh-pages/pull/196) - fix(package): update fs-extra to version 4.0.1 ([@tschaub](https://github.com/tschaub))
 * [#199](https://github.com/tschaub/gh-pages/pull/199) - Update tmp to the latest version 🚀 ([@tschaub](https://github.com/tschaub))
 * [#193](https://github.com/tschaub/gh-pages/pull/193) - Return the promise in the publish function ([@Ambyjkl](https://github.com/Ambyjkl))
 * [#188](https://github.com/tschaub/gh-pages/pull/188) - chore(package): update sinon to version 2.3.3 ([@tschaub](https://github.com/tschaub))
 * [#185](https://github.com/tschaub/gh-pages/pull/185) - fix(package): update commander to version 2.11.0 ([@tschaub](https://github.com/tschaub))
 * [#186](https://github.com/tschaub/gh-pages/pull/186) - chore(package): update eslint to version 4.1.1 ([@tschaub](https://github.com/tschaub))
 * [#187](https://github.com/tschaub/gh-pages/pull/187) - fix(package): update async to version 2.5.0 ([@tschaub](https://github.com/tschaub))
 * [#175](https://github.com/tschaub/gh-pages/pull/175) - Removed unnecessary path require ([@antialias](https://github.com/antialias))


## v1.0.0

This release includes a couple breaking changes:

 * Node 4+ is required.
 * The `logger` option has been removed.  Set `NODE_DEBUG=gh-pages` to see debug output.

If you are using Node 4+ and not using the `logger` option, upgrades should be painless.  See below for a full list of changes:

 * [#174](https://github.com/tschaub/gh-pages/pull/174) - Remove the logger option and use util.debuglog() ([@tschaub](https://github.com/tschaub))
 * [#173](https://github.com/tschaub/gh-pages/pull/173) - Dedicated cache directory per repo ([@tschaub](https://github.com/tschaub))
 * [#172](https://github.com/tschaub/gh-pages/pull/172) - Provision for root path when splitting ([@esarbanis](https://github.com/esarbanis))
 * [#171](https://github.com/tschaub/gh-pages/pull/171) - Add a dest option ([@lelandmiller](https://github.com/lelandmiller))
 * [#73](https://github.com/tschaub/gh-pages/pull/73) - feat(plugin): add plugin support for semantic-release ([@tusharmath](https://github.com/tusharmath))
 * [#170](https://github.com/tschaub/gh-pages/pull/170) - Integration tests ([@tschaub](https://github.com/tschaub))
 * [#21](https://github.com/tschaub/gh-pages/pull/21) - Document that git 1.9+ is required. ([@warmhug](https://github.com/warmhug))
 * [#169](https://github.com/tschaub/gh-pages/pull/169) - Fix noPush command argument and include regression tests for the CLI ([@thiagofelix](https://github.com/thiagofelix))
 * [#168](https://github.com/tschaub/gh-pages/pull/168) - Clone with depth 1 by default ([@tschaub](https://github.com/tschaub))
 * [#167](https://github.com/tschaub/gh-pages/pull/167) - Require Node 4+ ([@tschaub](https://github.com/tschaub))
 * [#166](https://github.com/tschaub/gh-pages/pull/166) - Updates ([@tschaub](https://github.com/tschaub))
 * [#158](https://github.com/tschaub/gh-pages/pull/158) - Update dependencies to enable Greenkeeper 🌴 ([@tschaub](https://github.com/tschaub))
 * [#150](https://github.com/tschaub/gh-pages/pull/150) - Fix small typo ([@mandeldl](https://github.com/mandeldl))

## v0.12.0

 * [#146](https://github.com/tschaub/gh-pages/pull/146) - Updates dependencies ([@tschaub](https://github.com/tschaub))
 * [#138](https://github.com/tschaub/gh-pages/pull/138) - Updated readme.md with svg image ([@sobolevn](https://github.com/sobolevn))
 * [#142](https://github.com/tschaub/gh-pages/pull/142) - Update globby to version 6.1.0 🚀 ([@tschaub](https://github.com/tschaub))
 * [#134](https://github.com/tschaub/gh-pages/pull/134) - Update eslint to version 3.8.0 🚀 ([@tschaub](https://github.com/tschaub))
 * [#135](https://github.com/tschaub/gh-pages/pull/135) - Update async to version 2.1.2 🚀 ([@tschaub](https://github.com/tschaub))
 * [#130](https://github.com/tschaub/gh-pages/pull/130) - Update mocha to version 3.1.1 🚀 ([@tschaub](https://github.com/tschaub))
 * [#112](https://github.com/tschaub/gh-pages/pull/112) - Update graceful-fs to version 4.1.6 🚀 ([@tschaub](https://github.com/tschaub))
 * [#106](https://github.com/tschaub/gh-pages/pull/106) - Add a --tag option to the cli ([@donavon](https://github.com/donavon))
 * [#102](https://github.com/tschaub/gh-pages/pull/102) - Update graceful-fs to version 4.1.5 🚀 ([@tschaub](https://github.com/tschaub))
 * [#89](https://github.com/tschaub/gh-pages/pull/89) - Update globby to version 5.0.0 🚀 ([@tschaub](https://github.com/tschaub))
 * [#87](https://github.com/tschaub/gh-pages/pull/87) - Update eslint-config-tschaub to version 5.0.0 🚀 ([@tschaub](https://github.com/tschaub))
 * [#78](https://github.com/tschaub/gh-pages/pull/78) - Use rimraf for cleaning ([@tschaub](https://github.com/tschaub))
 * [#75](https://github.com/tschaub/gh-pages/pull/75) - Expose a "remove" option to the CLI ([@tschaub](https://github.com/tschaub))
 * [#76](https://github.com/tschaub/gh-pages/pull/76) - Update eslint to version 2.8.0 🚀 ([@tschaub](https://github.com/tschaub))
 * [#70](https://github.com/tschaub/gh-pages/pull/70) - Update eslint to version 2.7.0 🚀 ([@tschaub](https://github.com/tschaub))
 * [#63](https://github.com/tschaub/gh-pages/pull/63) - Update eslint to version 2.4.0 🚀 ([@tschaub](https://github.com/tschaub))
 * [#62](https://github.com/tschaub/gh-pages/pull/62) - Update eslint to version 2.3.0 🚀 ([@tschaub](https://github.com/tschaub))

## v0.11.0

  * [#61](https://github.com/tschaub/gh-pages/pull/61) - Support a custom remote. ([@marco-c](https://github.com/marco-c))
  * [#60](https://github.com/tschaub/gh-pages/pull/60) - Update eslint-config-tschaub to version 4.0.0 🚀 ([@tschaub](https://github.com/tschaub))
  * [#57](https://github.com/tschaub/gh-pages/pull/57) - Update eslint to version 2.2.0 🚀 ([@tschaub](https://github.com/tschaub))
  * [#59](https://github.com/tschaub/gh-pages/pull/59) - Allow an array of src patterns to be provided. ([@tschaub](https://github.com/tschaub))
  * [#54](https://github.com/tschaub/gh-pages/pull/54) - Ugrade ESLint and config. ([@tschaub](https://github.com/tschaub))


## v0.10.0

 * [#50](https://github.com/tschaub/gh-pages/pull/50) - Update glob to version 7.0.0 🚀 ([@tschaub](https://github.com/tschaub))
 * [#51](https://github.com/tschaub/gh-pages/pull/51) - Add --silent option to the bin ([@MoOx](https://github.com/MoOx))


## v0.9.0

 * [#46](https://github.com/tschaub/gh-pages/pull/46) - cli: add `--no-push` flag to allow testing ([@amtrack](https://github.com/amtrack))
 * [#43](https://github.com/tschaub/gh-pages/pull/43) - Update async to version 1.5.2 🚀 ([@tschaub](https://github.com/tschaub))
 * [#41](https://github.com/tschaub/gh-pages/pull/41) - Update async to version 1.5.1 🚀 ([@tschaub](https://github.com/tschaub))

## v0.8.0

 * [#38](https://github.com/tschaub/gh-pages/pull/38) - Update all dependencies 🌴 ([@tschaub](https://github.com/tschaub))
 * [#39](https://github.com/tschaub/gh-pages/pull/39) - Add message option to cli. ([@markdalgleish](https://github.com/markdalgleish))
 * [#37](https://github.com/tschaub/gh-pages/pull/37) - Rework callback error handling. ([@tschaub](https://github.com/tschaub))
 * [#36](https://github.com/tschaub/gh-pages/pull/36) - Better error handling. ([@timaschew](https://github.com/timaschew))
 * [#35](https://github.com/tschaub/gh-pages/pull/35) - Make CLI exit with error if publishing fails. ([@timaschew](https://github.com/timaschew))

## v0.7.0

 * [#32](https://github.com/tschaub/gh-pages/pull/32) - Remove dependency on Lodash. ([@tschaub](https://github.com/tschaub))

## v0.6.0

 * [#31](https://github.com/tschaub/gh-pages/pull/31) - Updated linter and assorted dependencies. ([@tschaub](https://github.com/tschaub))
 * [#23](https://github.com/tschaub/gh-pages/pull/23) - Support `--repo` CLI option. ([@cvan](https://github.com/cvan))

## v0.5.0

 * [#26](https://github.com/tschaub/gh-pages/pull/26) - Added support for the --add option to cli. ([@n1k0](https://github.com/n1k0))

## v0.4.0

 * Option to include dotfiles.

## v0.3.0

 * [#18](https://github.com/tschaub/gh-pages/pull/18) - Support command line. ([@afc163](https://github.com/afc163))

## v0.2.0

 * [#9](https://github.com/tschaub/gh-pages/pull/9) - Port readme and update to reflect API changes. ([@markdalgleish](https://github.com/markdalgleish))
 * [#8](https://github.com/tschaub/gh-pages/pull/8) - Make base path required and options optional. ([@markdalgleish](https://github.com/markdalgleish))
 * [#7](https://github.com/tschaub/gh-pages/pull/7) - Use glob and fs instead of Grunt, fixes #2. ([@markdalgleish](https://github.com/markdalgleish))
 * [#6](https://github.com/tschaub/gh-pages/pull/6) - Move cache to install directory, fixes #4. ([@markdalgleish](https://github.com/markdalgleish))
 * [#5](https://github.com/tschaub/gh-pages/pull/5) - Add util tests. ([@tschaub](https://github.com/tschaub))
 * [#1](https://github.com/tschaub/gh-pages/pull/1) - Extract publish task logic from grunt-gh-pages. ([@markdalgleish](https://github.com/markdalgleish))

## v0.1.0

 * Setup.
