const { readFile } = require("../functions");

module.exports = {
  packages: {
    usual: ["electron"]
  },
  scripts: [
    {
      name: "start",
      value: "electron ."
    }
  ],
  templates: [
    // index.html
    {
      path: "/index.html",
      file: readFile(`${__dirname}/../templates/electron-app/index.html`)
    },
    // index.js
    {
      path: "/index.js",
      file: readFile(`${__dirname}/../templates/electron-app/index.js`)
    }
  ]
};
