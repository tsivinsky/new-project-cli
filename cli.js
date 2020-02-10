#! /usr/bin/env node

// Require functions for create projects
const createWebpackReact = require("./modules/react-webpack");

/* Arguments
  1. Project Type
  2. Name of new project
  3. Additional options
*/

// Get arguments from user
const [, , ...args] = process.argv;

const projectType = args[0];
const projectName = args[1];

// Get current user directory
const userDir = process.cwd();

switch (projectType) {
  case "react-webpack":
    if (projectName) {
      createWebpackReact(userDir, projectName);
    } else {
      console.log("Type a valid name of project");
    }
    break;

  default:
    console.log("Type a type of project after new-project command");
    break;
}
