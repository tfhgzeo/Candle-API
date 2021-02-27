const Express = require("express");
const app = Express();
const cors = require('cors')
const cadastra = require("./cadastro");
const port = 3000;
const InicializeApp = require("./inicializeApp");
const { criaSinais, chamaBotPythonShell }  = require('./chamaBot')

InicializeApp()

app.use(cors());

app.get("/", (req, res) => {
    let email = req.query.email;
    let senha = req.query.senha;

    console.log(email, senha);

    let cadastrando = cadastra(email, senha);
    console.log(cadastrando)
});

app.get('/inicia_aplicacao', (req, res) => {
    res.send("iniciando o Bot")
    let lista = req.query.lista;
    let entrada = req.query.entrada;
    let vela = req.query.vela;
    let gale = req.query.gale;
    let loss = req.query.loss;
    let win = req.query.win;

    criaSinais(lista)
    // chamaBotSpawn(vela, entrada, gale, loss, win)
    chamaBotPythonShell(vela, entrada, gale, loss, win)
})

app.get("/cadastra", (req, res) => {
    res.send("Iniciando Cadastro no Firestore")
    let email = req.query.email;
    let nome = req.query.nome;
    let sobrenome = req.query.sobrenome;
    let uid = req.query.uid

    cadastra(email, nome, sobrenome, uid)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
