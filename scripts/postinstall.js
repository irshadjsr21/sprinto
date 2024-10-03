const { executeCommand, serverPath, websitePath } = require("./utils");

executeCommand("npm install", serverPath);
executeCommand("npm install", websitePath);
