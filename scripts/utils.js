const path = require("path");
const { execSync } = require("child_process");

const serverPath = path.join(__dirname, "..", "server");
const websitePath = path.join(__dirname, "..", "website");

const executeCommand = (command, directory) => {
  console.log(`Running '${command}' in '${path.basename(directory)}'...`);
  execSync(command, {
    stdio: "inherit",
    stderr: "inherit",
    cwd: directory,
  });
};

module.exports = {
  serverPath,
  websitePath,
  executeCommand,
};
