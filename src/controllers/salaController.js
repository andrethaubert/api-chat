const salaModel = require('../models/salaModel');

exports.get = async (req, res) => {
    return await salaModel.listarSalas();
};  

exports.entrar = async (iduser, idsala) => {
    const sala = await salaModel.buscarSala(idsala);
    let usuarioModel = require('../models/usuarioModel');
    let user = await usuarioModel.buscarUsuario(iduser);
    console.log(sala);
    console.log(user);
    user.sala={_id:sala._id, nome:sala.nome, tipo:sala.tipo};
    if (await usuarioModel.alterarUsuario(user)) {
      return {msg:"OK", timestamp:timestamp=Date.now()};
    }
    return false;
};

exports.enviarMensagem = async (nick, msg, idsala) => {
    const sala = await salaModel.buscarSala(idsala);

    if (!sala.msgs) {
      sala.msgs=[];
    }

    timestamp=Date.now();

    sala.msgs.push(
      {
        timestamp:timestamp,
        msg:msg,
        nick:nick
      }
    );

    let resp = await salaModel.atualizarMensagens(sala);

    return {"msg":"OK", "timestamp":timestamp};
};

exports.buscarMensagens = async (idsala, timestamp) => {
    let mensagens = await salaModel.buscarMensagens(idsala, timestamp);
    
    return {
      "timestamp":mensagens[mensagens.length - 1].timestamp,
      "msgs":mensagens
    };
};