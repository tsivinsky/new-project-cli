const version = require("../package.json").version;

const message = `
For use this package, see the documentation on GitHub: https://github.com/tsivinsky/new-project-cli
`;

module.exports = {
  name: "new-project",
  version,
  message
};
