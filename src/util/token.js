const jwt = require('jsonwebtoken');

async function checkToken (token, id, key) {
    return jwt.verify(token, key, (err, decoded) => {
        let autorizacao = false;
        if (err) {
            autorizacao = false;
        }
        if (decoded) {
            if (decoded.id == id) {
                autorizacao = true;
            }
            else {
                autorizacao = false;
            }
        }
        return autorizacao;
    }
)};

async function setToken (id, key) {
    console.log("id: "+id);

    if (id) {
        return jwt.sign({id}, key, {expiresIn: 28800});
    }
    return false;
};

module.exports = {
    checkToken,
    setToken
};