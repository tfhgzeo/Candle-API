const { PythonShell } = require("python-shell");

let options = {
    mode: "text",
    pythonOptins: ["-u"],
    scriptPath: "./Boot",
    args: ["5", "50", "2", "25", "100"],
};
let pyshell = new PythonShell("Boot 2.0 .py", options);

pyshell.on("message", function (message) {
    console.log(message);
})