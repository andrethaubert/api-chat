const token = require("../util/token");
const ususaioModel = require("../model/usuarioModel");

exports.entrar = async(nick)=>{
    let resp = await ususaioModel.registrarUsuario(nick);
    if (resp.insertedId) {
        return {
            "idUser": resp.insertedId,
            "token": await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g, ''),nick),
            "nick": nick
        };
    };
};

exports.sairChat=async(iduser)=>{
    let resp = await ususaioModel.removerUsuario(iduser)
    return ("Saiu do chat")
}