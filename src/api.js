const express = require('express');
const path = require('path');
const app = express();
const token = require("./util/token.js")

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const router = express.Router();

app.use('/', router.get('/sobre', (req, res, next) => {
    res.status(200).send ({
        "nome" : "CHAT",
        "autor" : "andre",
        "versao" : "0.1.0"
    });
}));

app.use("/entrar", router.post("/entrar", async(req, res, next) => {
    const usuarioController = require("./controllers/usuarioController.js");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

app.use("/salas",router.get("/salas", async (req, res,next) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaControllers.js");
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
    const salaController = require("./controllers/salaControllers.js");
    if (token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)){
        let resp = await salaController.entrar(req.headers.iduser, req.query.idSala);
        res.status(200).send(resp);
    } else{
        res.status(401).send({msg:"Usuário não autorizado"});
    }
}));
  
app.use("/sala/enviar", router.post("/sala/enviar", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("../src/controllers/salaControllers.js");
    if (!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg,req.body.idSala);
    res.status(200).send(resp);
}))
  
app.use("/sala/listar", router.get("/sala/listar", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("../src/controllers/salaControllers.js");
    if (!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);
}))


app.use("/", router.delete("/sala/sair", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("../src/controllers/salaControllers.js");
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)){ 
    
        return false;
    }
    const resp = await salaController.sair(req.headers.iduser, req.query.idSala)
    res.status(200).send(resp)

}))

app.use("/", router.delete("/sair", async (req, res) => {
    const token = require("./util/token");
    const usuarioController = require("./controllers/usuarioController.js");
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)){ 
        return false;
    }
    const resp = await usuarioController.sairChat(req.headers.iduser)
    res.status(200).send(resp)

}))

module.exports = app;