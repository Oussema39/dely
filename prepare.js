const child_process = require("child_process");

child_process.execSync("start cmd.exe /K npm start");
child_process.execSync(
  "start cmd.exe /K json-server src/db/db.json --port 3030"
);
