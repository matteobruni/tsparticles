(function() {
  let objectDifference = (object, base) => {
    function changes(object, base) {
      return _.transform(object, function(result, value, key) {
        if (!_.isEqual(value, base[key])) {
          result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
        }
      });
    }

    return changes(object, base);
  };

  let editor;
  let schema = {};
  const stats = new Stats();

  stats.addPanel('count', '#ff8', 0, () => {
    const container = tsParticles.domItem(0);
    if (container) {
      maxParticles = Math.max(container.particles.count, maxParticles);

      return {
        value: container.particles.count,
        maxValue: maxParticles
      };
    }
  });

  let maxParticles = 0;
  stats.showPanel(2);
  stats.dom.style.position = "absolute";
  stats.dom.style.left = "3px";
  stats.dom.style.top = "3px";
  stats.dom.id = "stats-graph";

  let initStats = function () {
    const update = function () {
      stats.begin();

      stats.end();

      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  function distinct(value, index, self) {
    return self.indexOf(value) === index;
  }

  let getValuesFromProp = function(prop, path, index) {
    if (prop) {
      if (prop.type) {
        switch (prop.type) {
          case "boolean":
            return [ "true", "false" ];
          case "number":
            return prop.enum;
          case "string":
            return prop.enum;
          case "array":
            return getSchemaValuesFromProp(prop.items);
        }
      } else if (prop["$ref"]) {
        const def = prop["$ref"].split("/");
        const type = def[def.length - 1];
        const typeDef = schema.definitions[type];
        return getSchemaValuesFromPath(typeDef, path, index + (/I[A-Z]/.exec(type) ? 1 : 0));
      } else if (prop.anyOf) {
        let res = [];

        for (const type of prop.anyOf) {
          const values = getSchemaValuesFromProp(type, path, index);

          for (const value of values) {
            res.push(value);
          }
        }

        return res.filter(distinct);
      }
    }
  };

  let getSchemaValuesFromPath = function(obj, path, index) {
    const key = path[index];
    const prop = obj.properties ? obj.properties[key] : obj;
    const values = getValuesFromProp(prop, path, index);

    return values;
  };

  let jsonEditorAutoComplete = function(text, path, input, editor) {
    try {
      switch (input) {
        case "field":
          break;
        case "value":
          return getSchemaValuesFromPath(schema, path, 0).filter(function(v) {
            return v.includes(text);
          });
      }
    } catch (e) {

    }

    return null;
  };

  let updateParticles = function(editor) {
    const presetItems = document.body.querySelectorAll(".preset-item");
    const randomPreset = presetItems[Math.floor(Math.random() * presetItems.length)].dataset.preset;
    const presetId = localStorage.presetId || randomPreset;

    if (presetId === "divRepulse") {
      document.getElementById("repulse-div").className = "d-block";
    } else {
      document.getElementById("repulse-div").className = "d-none";
    }

    tsParticles.loadJSON("tsparticles", `../presets/${presetId}.json`).then((particles) => {
      localStorage.presetId = presetId;
      window.location.hash = presetId;
      editor.set(particles.options);
      editor.expandAll();
    });
  };

  let initSidebar = function() {
    const rightCaret = document.body.querySelector(".caret-right");
    const leftCaret = document.body.querySelector(".caret-left");
    const sidebar = document.getElementById("sidebar");
    const sidebarHidden = sidebar.hasAttribute("hidden");

    if (sidebarHidden) {
      leftCaret.setAttribute("hidden", "");
      rightCaret.removeAttribute("hidden");
    } else {
      rightCaret.setAttribute("hidden", "");
      leftCaret.removeAttribute("hidden");
    }
  };


  let refreshParticles = function(callback) {
    const container = tsParticles.domItem(0);

    gtag("event", "particles_refresh", {
      dimension_particles_options: JSON.stringify(container.options),
      event_category: "Particles",
      event_action: "Particles Refresh",
      event_label: "Particles Refresh"
    });

    container.refresh().then(() => {
      if (callback && typeof callback === "function") {
        callback();
      }
    });
  };

  let toggleSidebar = function() {
    const rightCaret = document.body.querySelector(".caret-right");
    const leftCaret = document.body.querySelector(".caret-left");
    const sidebar = document.getElementById("sidebar");
    const sidebarHidden = sidebar.hasAttribute("hidden");

    if (sidebarHidden) {
      rightCaret.setAttribute("hidden", "");
      leftCaret.removeAttribute("hidden");
      sidebar.removeAttribute("hidden");
      sidebar.classList.add("d-md-block");
    } else {
      leftCaret.setAttribute("hidden", "");
      rightCaret.removeAttribute("hidden");
      sidebar.setAttribute("hidden", "");
      sidebar.classList.remove("d-md-block");
    }

    gtag("event", "toggle_sidebar", {
      dimension_status: !sidebarHidden ? "Hidden" : "Visible",
      event_category: "Sidebar",
      event_action: "Sidebar Toggle",
      event_label: "Sidebar Toggle"
    });

    refreshParticles();
  };

  let exportImage = function() {
    const container = tsParticles.domItem(0);

    if (container) {
      container.exportImage(function(blob) {
        const modalBody = document.body.querySelector("#exportModal .modal-body .modal-body-content");
        const particlesContainer = document.getElementById("tsparticles");

        modalBody.innerHTML = "";
        modalBody.style.backgroundColor = particlesContainer.style.backgroundColor;
        modalBody.style.backgroundImage = particlesContainer.style.backgroundImage;
        modalBody.style.backgroundPosition = particlesContainer.style.backgroundPosition;
        modalBody.style.backgroundRepeat = particlesContainer.style.backgroundRepeat;
        modalBody.style.backgroundSize = particlesContainer.style.backgroundSize;

        const image = new Image();

        image.className = "img-fluid";
        image.onload = () => URL.revokeObjectURL(image.src);

        const url = URL.createObjectURL(blob);

        image.src = url;

        modalBody.appendChild(image);

        gtag("event", "export_image", {
          event_category: "Particles",
          event_action: "Image Export",
          event_label: "Image Export"
        });

        $("#exportModal").modal("show");
      });
    }
  };

  let exportConfig = function() {
    const container = tsParticles.domItem(0);

    if (container) {
      const modalBody = document.body.querySelector("#exportModal .modal-body .modal-body-content");

      const tmp = document.createElement("div");

      tsParticles.set("tmp", tmp, {}).then((tmpContainer) => {

        const source = {};

        _.assignIn(source, tmpContainer.options);

        tmpContainer.destroy();

        const diff = objectDifference(container.options, source);

        const json = JSON.stringify(diff, undefined, 2);

        modalBody.innerHTML = `<pre style="max-height: 70vh">${json}</pre>`;

        const copyBtn = document.querySelector("#exportConfigCopy");
        const downloadBtn = document.querySelector("#exportConfigDownload");

        copyBtn.onclick = function() {
          if (!navigator.clipboard) {
            return;
          }

          navigator.clipboard.writeText(json);
        };

        downloadBtn.onclick = function() {
          const contentType = "application/json";
          const blob = new Blob([ json ], { type: contentType });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");

          a.download = "particles.json";
          a.href = url;
          a.dataset.downloadUrl = [ contentType, a.download, a.href ].join(":");

          const e = document.createEvent("MouseEvents");

          e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          a.dispatchEvent(e);
        };

        gtag("event", "export_config", {
          dimension_particles_export_config: JSON.stringify(container.options),
          event_category: "Particles",
          event_action: "Config Export",
          event_label: "Config Export"
        });

        $("#exportModal").modal("show");
      });
    }
  };

  let codepenExport = function() {
    const container = tsParticles.domItem(0);

    if (container) {
      const form = document.getElementById("code-pen-form");
      const inputData = document.getElementById("code-pen-data");
      const particlesContainer = document.getElementById("tsparticles");
      const data = {
        html: `<!-- tsParticles - https://particles.js.org - https://github.com/matteobruni/tsparticles -->
<div id="tsparticles"></div>`,
        css: `/* ---- reset ---- */
body {
    margin: 0;
    font: normal 75% Arial, Helvetica, sans-serif;
}

canvas {
    display: block;
    vertical-align: bottom;
}
/* ---- tsparticles container ---- */
#tsparticles {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${particlesContainer.style.backgroundColor};
    background-image: ${particlesContainer.style.backgroundImage};
    background-repeat: ${particlesContainer.style.backgroundRepeat};
    background-size: ${particlesContainer.style.backgroundSize};
    background-position: ${particlesContainer.style.backgroundPosition};
}`,
        js: `tsParticles.load("tsparticles", ${JSON.stringify(container.options)});`,
        js_external: "https://cdn.jsdelivr.net/npm/tsparticles@1.19.0/dist/tsparticles.min.js",
        title: "tsParticles example",
        description: "This pen was created with tsParticles from https://particles.js.org",
        tags: "tsparticles, javascript, typescript, design, animation",
        editors: "001"
      };
      const JSONstring = JSON.stringify(data)
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

      inputData.value = JSONstring;

      gtag("event", "export_codepen", {
        dimension_codepen_data: JSONstring,
        event_category: "Particles",
        event_action: "CodePen Export",
        event_label: "CodePen Export"
      });

      form.submit();
    }
  };

  let toggleStats = function() {
    const statsEl = document.body.querySelector("#stats");
    const statsHidden = statsEl.hasAttribute("hidden");

    if (statsHidden) {
      statsEl.removeAttribute("hidden");
    } else {
      statsEl.setAttribute("hidden", "");
    }

    gtag("event", "stats_toggle", {
      dimension_status: !statsHidden ? "Hidden" : "Visible",
      event_category: "Stats",
      event_action: "Stats Toggle",
      event_label: "Stats Toggle"
    });
  };

  let btnParticlesUpdate = function() {
    const particles = tsParticles.domItem(0);
    particles.options.load(editor.get());
    refreshParticles(() => {
    });
  };

  let changeGenericPreset = function(presetId) {
    const oldPreset = localStorage.presetId;

    localStorage.presetId = presetId;
    window.location.hash = presetId;

    gtag("event", "preset_change", {
      dimension_old_preset: oldPreset,
      dimension_new_preset: localStorage.presetId,
      event_category: "Particles",
      event_action: "Preset Changed",
      event_label: "Preset Changed"
    });

    updateParticles(editor);
  };

  let changePreset = function() {
    changeGenericPreset(this.value);
  };

  let changeNavPreset = function() {
    changeGenericPreset(this.dataset.preset);
  };

  window.addEventListener("hashchange", function() {
    const presets = document.body.querySelectorAll(".preset-item");

    if (window.location.hash) {
      for (let i = 0; i < presets.length; i++) {
        if (presets[i].dataset.preset === window.location.hash.replace("#", "")) {
          localStorage.presetId = window.location.hash.replace("#", "");

          changeGenericPreset(localStorage.presetId);

          return;
        }
      }
    }
  });

  window.addEventListener("load", function() {
    const element = document.getElementById("editor");
    const options = {
      mode: "form",
      modes: [ "form", "view", "preview" ], // allowed modes
      autocomplete: {
        filter: "contain",
        trigger: "focus",
        getOptions: jsonEditorAutoComplete
      },
      onError: function(err) {
        gtag("event", "editor_error", {
          dimension_editor_error: "Editor error: " + err,
          event_category: "Editor",
          event_action: "Editor Error",
          event_label: "Editor Error"
        });

        alert(err.toString());
      },
      onModeChange: function(newMode, oldMode) {
        gtag("event", "editor_mode_change", {
          dimension_editor_mode: "Editor changed from " + oldMode + " to " + newMode,
          event_category: "Editor",
          event_action: "Editor Mode Change",
          event_label: "Editor Mode Change"
        });
      },
      onChange: function() {
        gtag("event", "editor_change", {
          dimension_editor_data: JSON.stringify(editor.get()),
          event_category: "Editor",
          event_action: "Editor Change",
          event_label: "Editor Change"
        });
      }
    };

    editor = new JSONEditor(element, options);

    const presetItems = document.body.querySelectorAll(".preset-item");

    if (window.location.hash) {
      for (let i = 0; i < presetItems.length; i++) {
        if (presetItems[i].dataset.preset === window.location.hash.replace("#", "")) {
          localStorage.presetId = window.location.hash.replace("#", "");

          break;
        }
      }
    }

    if (!localStorage.presetId) {
      localStorage.presetId = presetItems[Math.floor(Math.random() * presetItems.length)].dataset.preset;
    }

    changeGenericPreset(localStorage.presetId);

    fetch("../schema/options.schema.json").then(function(response) {
      response.json().then(function(data) {
        schema = data;
        editor.setSchema(schema);
      });
    });

    document.getElementById("btnUpdate").addEventListener("click", btnParticlesUpdate);
    document.getElementById("btnNavUpdate").addEventListener("click", btnParticlesUpdate);

    document.getElementById("stats").appendChild(stats.dom);

    document.getElementById("toggle-stats").addEventListener("click", toggleStats);
    document.getElementById("nav-toggle-stats").addEventListener("click", toggleStats);

    document.body.querySelector(".toggle-sidebar").addEventListener("click", toggleSidebar);

    for (const presetItem of presetItems) {
      presetItem.addEventListener("click", changeNavPreset);
    }

    document.getElementById("export-image").addEventListener("click", exportImage);
    document.getElementById("nav-export-image").addEventListener("click", exportImage);

    document.getElementById("export-config").addEventListener("click", exportConfig);
    document.getElementById("nav-export-config").addEventListener("click", exportConfig);

    document.getElementById("codepen-export").addEventListener("click", codepenExport);
    document.getElementById("nav-codepen-export").addEventListener("click", codepenExport);

    initSidebar();
    initStats();
  });
})();