const path = require("path");
const fs = require("fs");
const { executeCommand, serverPath, websitePath } = require("./utils");

executeCommand("npm run build", websitePath);
executeCommand("npm run build", serverPath);

fs.rmSync(path.join(serverPath, "public"), { recursive: true, force: true });
fs.cpSync(path.join(websitePath, "out"), path.join(serverPath, "public"), { recursive: true });
