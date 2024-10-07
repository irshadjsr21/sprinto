const { executeCommand, serverPath, websitePath } = require("./utils");

process.env.NODE_ENV = "";

executeCommand("npm install", serverPath);
executeCommand("npm install", websitePath);
