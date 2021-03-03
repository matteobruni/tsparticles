tsParticles.load("tsparticles", {
  fpsLimit: 60,
  "fullScreen": {
    "enable": true,
    "zIndex": -1
  },
  "particles": {
    "number": {
      "value": 50
    },
    "color": {
      "value": [
        "#3998D0",
        "#2EB6AF",
        "#A9BD33",
        "#FEC73B",
        "#F89930",
        "#F45623",
        "#D62E32",
        "#EB586E",
        "#9952CF"
      ]
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.8,
      "random": {
        "enable": true,
        "minimumValue": 0.4
      }
    },
    "size": {
      "value": 400,
      "random": {
        "enable": true,
        "minimumValue": 200
      },
      "animation": {
        "enable": true,
        "speed": 100,
        "minimumValue": 200,
        "sync": false
      }
    },
    "move": {
      "enable": true,
      "speed": 10,
      "direction": "top",
      "random": false,
      "straight": false,
      "outMode": "out",
      "attract": {
        "enable": false,
        "rotate": {
          "x": 600,
          "y": 1200
        }
      }
    }
  },
  "detectRetina": true,
  "background": {
    "color": "#ffffff",
    "image": "",
    "position": "50% 50%",
    "repeat": "no-repeat",
    "size": "cover"
  }
});