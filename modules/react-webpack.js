// Require modules
const fs = require("fs");
const shell = require("shelljs");

module.exports = function createWebpackReact(userDir, projectName) {
  // Templates
  const htmlTemplate = fs.readFileSync(
    __dirname + "/../templates/react-webpack/index.html"
  );
  const indexJSTemplate = fs.readFileSync(
    __dirname + "/../templates/react-webpack/index.js"
  );
  const AppJSXTemplate = fs.readFileSync(
    __dirname + "/../templates/react-webpack/App.jsx"
  );
  const styleTemplate = fs.readFileSync(
    `${__dirname}/../templates/react-webpack/style.scss`
  );
  const webpackConfig = fs.readFileSync(
    `${__dirname}/../templates/react-webpack/webpack.config.js`,
    "utf-8"
  );
  const babelConfig = fs.readFileSync(
    `${__dirname}/../templates/react-webpack/.babelrc`,
    "utf-8"
  );

  // Array of packages for new project
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

  // Object of name and value for new project
  const scripts = {
    start: "webpack-dev-server --mode development --open --hot",
    build: "webpack --mode production"
  };

  // Check folder of project name for existing
  if (fs.existsSync(`${userDir}/${projectName}`)) {
    return console.log(`Folder with name \"${projectName}\" already exists.`);
  }

  // Create a project folder
  fs.mkdirSync(`${userDir}/${projectName}`);

  // Cd to a new project folder and initialize it
  shell.exec(`cd ${projectName} && npm init -y`);

  console.log("Now, script is installing dependencies to your new project");

  // Install usual dependencies
  let packagesString = "";
  packages.forEach(package => {
    packagesString += `${package} `;
  });
  shell.exec(`cd ${projectName} && npm install ${packagesString}`);

  console.log(
    "Usual dependencies was installed and dev dependencies will install now."
  );

  // Install dev dependencies
  let devPackagesString = "";
  devPackages.forEach(package => {
    devPackagesString += `${package} `;
  });
  shell.exec(`cd ${projectName} && npm install ${devPackagesString}`);

  console.log(
    "All dependencies was installed and now script is setting up your new project"
  );

  // Read package.json file in new directory
  const packageJSON = JSON.parse(
    fs.readFileSync(`${userDir}/${projectName}/package.json`),
    "utf-8"
  );

  // Add scripts to package.json file in new directory
  packageJSON.scripts.start = scripts.start;
  packageJSON.scripts.build = scripts.build;
  fs.writeFileSync(
    `${userDir}/${projectName}/package.json`,
    JSON.stringify(packageJSON, null, 2),
    "utf-8"
  );

  // Create webpack and babel files in new project folder
  fs.appendFileSync(
    `${userDir}/${projectName}/webpack.config.js`,
    webpackConfig
  );
  fs.appendFileSync(`${userDir}/${projectName}/.babelrc`, babelConfig);

  // Create a src folder
  fs.mkdirSync(`${userDir}/${projectName}/src`);

  // Create index.html file
  fs.appendFileSync(
    `${userDir}/${projectName}/src/index.html`,
    htmlTemplate,
    "utf-8"
  );

  // Create index.js file
  fs.appendFileSync(
    `${userDir}/${projectName}/src/index.js`,
    indexJSTemplate,
    "utf-8"
  );

  // Create App.jsx file
  fs.appendFileSync(
    `${userDir}/${projectName}/src/App.jsx`,
    AppJSXTemplate,
    "utf-8"
  );

  // Create style directory in project folder
  fs.mkdirSync(`${userDir}/${projectName}/src/style`);

  // Add style.scss file to style folder
  fs.appendFileSync(
    `${userDir}/${projectName}/src/style/style.scss`,
    styleTemplate,
    "utf-8"
  );
};
