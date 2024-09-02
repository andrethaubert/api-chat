const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const router = express.Router();

app.use('/', router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
}));

app.use('/', router.get('/sobre', (req, res, next) => {
    res.status(200).send ({
        "nome" : "chat-info",
        "autor" : "André Haubert",
        "versao" : "0.0.1"
    });
}));

app.use("/entrar", router.post("/entrar", async(req, res, next) => {
    const usuarioController = require("./controllers/usuarioController.js");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

app.use("/salas",router.get("/salas", async (req, res,next) => {
    const token = require("..token.js/util/token");
    const salaController = require("./controllers/salaController");
    const test = await token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick);
    console.log(test)
    if (test) {
        let resp = await salaController.get();
        res.status(200).send(resp);
    } else {
        res.status(401).send({msg:"Usuário não autorizado"});
    }
})); 

app.use("/sala/entrar", router.post("/sala/entrar", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");
    if (token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)){
        let resp = await salaController.entrar(req.headers.iduser, req.query.idSala);
        res.status(200).send(resp);
    } else{
        res.status(401).send({msg:"Usuário não autorizado"});
    }
}));
  
app.use("/sala/enviar", router.post("/sala/enviar", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");
    if (!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg,req.body.idSala);
    res.status(200).send(resp);
}))
  
app.use("/sala/listar", router.get("/sala/listar", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");
    if (!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);
}))

module.exports = app;