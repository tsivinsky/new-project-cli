#! /usr/bin/env node

// Require Project class
const Project = require("./Project");

/* Arguments
  1. Project Type
  2. Name of new project
  3. Additional options
*/

// Get React Webpack config
const ReactWebpackConfig = require("./config/react-webpack");
const ExpressConfig = require("./config/express-app");

// Get arguments from user
const [, , ...args] = process.argv;

const projectType = args[0];
const projectName = args[1];

// Get current user directory
const userDir = process.cwd();

switch (projectType) {
  case "react-webpack":
    if (projectName) {
      const ReactWebpack = new Project({
        userDir,
        name: projectName,
        type: projectType,
        packages: ReactWebpackConfig.packages,
        scripts: ReactWebpackConfig.scripts,
        templates: ReactWebpackConfig.templates,
        folders: ReactWebpackConfig.folders
      });

      ReactWebpack.create();
    } else {
      console.log("Type a valid name of project");
    }
    break;
  case "express-app":
    if (projectName) {
      const ExpressApp = new Project({
        userDir,
        name: projectName,
        type: projectType,
        packages: ExpressConfig.packages,
        scripts: ExpressConfig.scripts,
        templates: ExpressConfig.templates,
        folders: ExpressConfig.folders
      });

      ExpressApp.create();
    } else {
      console.log("Type a valid name of project");
    }
    break;

  default:
    console.log("Type a type of project after new-project command");
    break;
}
