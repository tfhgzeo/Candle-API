const fs = require("fs");
const spawn = require("child_process").spawn;
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

async function chamaBotSpawn(vela, entrada, gale, loss, win) {
    //loss, entradas) {
    let pythonProcess = spawn("python", [
        "./Boot/Boot 2.0 .py",
        vela,
        entrada,
        gale,
        loss,
        win,
    ]);

    await pythonProcess.stdout.on("data", function (data) {
        console.log(data.toString());
    });

    console.log("Finalizando o bot");
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
    chamaBotSpawn,
    chamaBotPythonShell,
};
