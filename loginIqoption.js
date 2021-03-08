const { PythonShell } = require("python-shell");

async function loginIqoptin(senha) {

    var login = false

    let options = {
        mode: "text",
        pythonOptions: ["-u"],
        scriptPath: "./",
        args: [senha],
    };

    let pyshell = new PythonShell("./iqoption.py", options);

    pyshell.on("message", function (msg) {
        console.log(msg);
        var login = false;
        if (msg == "conectado") {
            // criaSinais(lista);
            // chamaBotPythonShell(vela, entrada, gale, loss, win, senha);
        } else if (result == "erro") {
            console.log("Erro no login");
        }
    });
}

// criaSinais(lista)
// chamaBotPythonShell(vela, entrada, gale, loss, win, senha)

let login = loginIqoptin("FeGu3112");
