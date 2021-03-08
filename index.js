const Express = require("express");
const app = Express();
const cors = require("cors");
const cadastra = require("./cadastro");
const port = 3000;
const InicializeApp = require("./inicializeApp");
const { criaSinais, chamaBotPythonShell } = require("./chamaBot");
const descriptografa = require("./criptografia").descriptografar;

InicializeApp();

app.use(cors());

app.get("/", (req, res) => {
    res.send("Api em funcionamento");
});

app.get("/inicia_aplicacao", (req, res) => {
    res.send("iniciando o Bot");
    let lista = req.query.lista;
    let entrada = req.query.entrada;
    let vela = req.query.vela;
    let gale = req.query.gale;
    let loss = req.query.loss;
    let win = req.query.win;
    let senhaCriptografada = req.query.senha;
    let userId = req.query.uid;

    let senha = descriptografa(senhaCriptografada);

    let login = loginIqoptin(senha, lista, vela, entrada, gale, loss, win);
});

app.get("/cadastra", (req, res) => {
    res.send("Iniciando Cadastro no Firestore");
    let email = req.query.email;
    let nome = req.query.nome;
    let sobrenome = req.query.sobrenome;
    let uid = req.query.uid;

    cadastra(email, nome, sobrenome, uid);
});

app.get("/updateDoc", async (req, res) => {
    nome = req.query.nome;
    email = req.query.email;
    sobrenome = req.query.sobrenome;
    uid = req.query.uid;

    console.log(uid);

    let { update } = require("./firestore");

    res.send(await update(email, nome, sobrenome, uid));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
