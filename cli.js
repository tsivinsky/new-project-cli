#! /usr/bin/env node

// Require fs module
const fs = require("fs");
const shell = require("shelljs");

//! Arguments
// 1. Project Type
// 2. Name of new project
// 3. Additional options

// Get arguments from user
const [, , ...args] = process.argv;

const projectType = args[0];
const projectName = args[1];

const htmlTemplate = fs.readFileSync("files/index.html");
const indexJSTemplate = fs.readFileSync("files/index.js");
const AppJSXTemplate = fs.readFileSync("files/App.jsx");

switch (projectType) {
  case "react-webpack":
    if (args[1]) {
      createWebpackReact();
    } else {
      console.log("Type a name of project");
    }
    break;

  default:
    console.log("Type a type of project after create-project");
    break;
}

function createWebpackReact() {
  // Array of packages for new project
  const packages = [
    "webpack",
    "webpack-cli",
    "webpack-dev-server",
    "@babel/core",
    "@babel/preset-env",
    "@babel/preset-react",
    "babel-loader",
    "css-loader",
    "html-webpack-plugin",
    "jsx-loader",
    "node-sass",
    "sass-loader",
    "style-loader",
    "url-loader"
  ];

  // Object of name and value for new project
  const scripts = {
    start: "webpack-dev-server --mode development --open --hot",
    build: "webpack --mode production"
  };

  // Check folder of project name for exists
  if (fs.existsSync(`${__dirname}/${projectName}`)) {
    return console.log(`Folder with name \"${projectName}\" already exists.`);
  }

  // Create a project folder
  fs.mkdirSync(`${__dirname}/${projectName}`);

  // Cd to a new project folder and initialize it
  shell.exec(`cd ${projectName} && npm init -y`);

  console.log("Now, script is installing dependencies to your new project");

  // Install all dependencies
  packages.forEach(package =>
    shell.exec(`cd ${projectName} && npm install ${package}`)
  );

  console.log(
    "All dependencies was installed and now script is setting up your new project"
  );

  // Read packaje.json file in new directory
  const packageJSON = JSON.parse(
    fs.readFileSync(`${__dirname}/${projectName}/package.json`),
    "utf-8"
  );

  // Add scripts to package.json file in new directory
  packageJSON.scripts.start = scripts.start;
  packageJSON.scripts.build = scripts.build;
  fs.writeFileSync(
    `${__dirname}/${projectName}/package.json`,
    JSON.stringify(packageJSON, null, 2),
    "utf-8"
  );

  // Read boilerplate files
  // Read webpack.config.js file
  const webpackConfig = fs.readFileSync("files/webpack.config.js", "utf-8");

  // Read .babelrc file
  const babelConfig = fs.readFileSync("files/.babelrc", "utf-8");

  // Create webpack and babel files in new project folder
  fs.appendFileSync(
    `${__dirname}/${projectName}/webpack.config.js`,
    webpackConfig
  );
  fs.appendFileSync(`${__dirname}/${projectName}/.babelrc`, babelConfig);

  // Create a src folder
  fs.mkdirSync(`${__dirname}/${projectName}/src`);

  // Create index.html file
  fs.appendFileSync(
    `${__dirname}/${projectName}/src/index.html`,
    htmlTemplate,
    "utf-8"
  );

  // Create index.js file
  fs.appendFileSync(
    `${__dirname}/${projectName}/src/index.js`,
    indexJSTemplate,
    "utf-8"
  );

  // Create App.jsx file
  fs.appendFileSync(
    `${__dirname}/${projectName}/src/App.jsx`,
    AppJSXTemplate,
    "utf-8"
  );
}
