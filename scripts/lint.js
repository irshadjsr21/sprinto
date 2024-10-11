const { executeCommand, serverPath, websitePath } = require("./utils");

executeCommand("npm run lint", websitePath);
executeCommand("npm run lint:fix", serverPath);
