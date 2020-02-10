// Require modules
const fs = require("fs");
const shell = require("shelljs");
const { splitPackages, addFile, readFile, writeJson } = require("../functions");

module.exports = function createWebpackReact(userDir, projectName) {
  const baseUrl = userDir + "/" + projectName;

  // Templates
  const htmlTemplate = readFile(
    __dirname + "/../templates/react-webpack/index.html"
  );
  const indexJSTemplate = readFile(
    __dirname + "/../templates/react-webpack/index.js"
  );
  const AppJSXTemplate = readFile(
    __dirname + "/../templates/react-webpack/App.jsx"
  );
  const styleTemplate = readFile(
    `${__dirname}/../templates/react-webpack/style.scss`
  );
  const webpackConfig = readFile(
    `${__dirname}/../templates/react-webpack/webpack.config.js`,
    "utf-8"
  );
  const babelConfig = readFile(
    `${__dirname}/../templates/react-webpack/.babelrc`,
    "utf-8"
  );

  // Array of packages
  const packages = ["react", "react-dom"];
  const devPackages = [
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

  // Object of scripts
  const scripts = {
    start: "webpack-dev-server --mode development --open --hot",
    build: "webpack --mode production"
  };

  // Check folder of project name for existing
  if (fs.existsSync(baseUrl)) {
    return console.log(`Folder with name \"${projectName}\" already exists.`);
  }

  // Create a project folder
  fs.mkdirSync(baseUrl);

  // Cd to a new project folder and initialize it
  shell.exec(`cd ${projectName} && npm init -y`);

  console.log("Now, script is installing dependencies to your new project.");

  // Install usual dependencies
  shell.exec(splitPackages(packages, projectName));

  console.log(
    "Usual dependencies was installed and dev dependencies will install now."
  );

  // Install dev dependencies
  if (typeof devPackages !== "undefined") {
    shell.exec(splitPackages(devPackages, projectName));
  }

  console.log(
    "All dependencies was installed and now script is setting up your new project."
  );

  // Read package.json file in new directory
  const packageJSON = JSON.parse(
    fs.readFileSync(`${baseUrl}/package.json`),
    "utf-8"
  );

  // Add scripts to package.json file in new directory
  packageJSON.scripts.start = scripts.start;
  packageJSON.scripts.build = scripts.build;
  writeJson(`${baseUrl}/package.json`, packageJSON);

  // Create webpack and babel files in new project folder
  addFile(`${baseUrl}/webpack.config.js`, webpackConfig);
  addFile(`${baseUrl}/.babelrc`, babelConfig);

  // Create a src folder
  fs.mkdirSync(`${baseUrl}/src`);

  // Create index.html file
  addFile(`${baseUrl}/src/index.html`, htmlTemplate);

  // Create index.js file
  addFile(`${baseUrl}/src/index.js`, indexJSTemplate);

  // Create App.jsx file
  addFile(`${baseUrl}/src/App.jsx`, AppJSXTemplate);

  // Create style directory in project folder
  fs.mkdirSync(`${baseUrl}/src/style`);

  // Add style.scss file to style folder
  addFile(`${baseUrl}/src/style/style.scss`, styleTemplate);
};
