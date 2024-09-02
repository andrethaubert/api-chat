const db = require("./db");

async function registrarUsuario(nick) {
    return await db.insertOne("usuarios",{"nick": nick});
};

let buscarUsuario = async (idUser) => {
    let user = await db.findOne("usuarios", idUser);
    return user;
};
  
  
let alterarUsuario = async (user) => {
    return await db.updateOne("usuarios", user,{_id:user._id});
};
 
module.exports = {registrarUsuario, buscarUsuario, alterarUsuario};