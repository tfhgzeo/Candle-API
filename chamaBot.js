const fs = require("fs");
const spawn = ("child_process").spawn;
const { PythonShell } = require("python-shell");

function criaSinais(lista) {
    let sinais = lista.split(" ");
    let sinaiStr = " ";

    for (x in sinais) {
        sinaiStr = sinaiStr + sinais[x] + "\n";
    }

    sinaiStr = sinaiStr.trim();

    fs.unlink("./sinais.txt", (err) => {
        if (err) {
            console.log(err);
        }
    });

    fs.appendFile("./sinais.txt", sinaiStr, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

async function chamaBotPythonShell(vela, entrada, gale, loss, win) {
    let options = {
        mode: "text",
        pythonOptins: ["-u"],
        scriptPath: "./Boot",
        args: [vela, entrada, gale, loss, win],
    };
    let pyshell = new PythonShell("Boot 2.0 .py", options);

    pyshell.on("message", function (message) {
        console.log(message);
    });
}

module.exports = {
    criaSinais,
    chamaBotPythonShell,
};
