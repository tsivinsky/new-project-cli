const { readFile } = require("../functions");

module.exports = {
  packages: {
    dev: [
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
      "style-loader",
      "url-loader",
      "node-sass",
      "sass-loader"
    ],
    usual: ["react", "react-dom"]
  },
  scripts: [
    {
      name: "start",
      value: "webpack-dev-server --mode development --open --hot"
    },
    {
      name: "build",
      value: "webpack --mode production"
    }
  ],
  templates: [
    // webpack.config.js
    {
      path: "/webpack.config.js",
      file: readFile(`${__dirname}/../templates/react-webpack/webpack.txt`)
    },
    // .babelrc
    {
      path: "/.babelrc",
      file: readFile(`${__dirname}/../templates/react-webpack/.babelrc`)
    },
    // index.html
    {
      path: "/src/index.html",
      file: readFile(`${__dirname}/../templates/react-webpack/index.html`)
    },
    // index.js
    {
      path: "/src/index.js",
      file: readFile(`${__dirname}/../templates/react-webpack/index.js`)
    },
    // App.jsx
    {
      path: "/src/App.jsx",
      file: readFile(`${__dirname}/../templates/react-webpack/App.jsx`)
    },
    // style.scss
    {
      path: "/src/style/style.scss",
      file: readFile(`${__dirname}/../templates/react-webpack/style.scss`)
    }
  ],
  folders: ["/src", "/src/style"]
};
