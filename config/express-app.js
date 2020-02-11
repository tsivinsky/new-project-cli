const { readFile } = require("../functions");

module.exports = {
  packages: {
    dev: ["nodemon"],
    usual: ["express", "cors", "dotenv"]
  },
  scripts: [
    {
      name: "start",
      value: "node app.js"
    },
    {
      name: "dev",
      value: "nodemon app.js"
    }
  ],
  templates: [
    // index.js
    {
      path: "/routes/index.js",
      file: readFile(`${__dirname}/../templates/express-app/index.js`)
    },
    // app.js
    {
      path: "/app.js",
      file: readFile(`${__dirname}/../templates/express-app/app.js`)
    }
  ],
  folders: ["/routes"]
};
