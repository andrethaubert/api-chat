exports.get = async  (req, res)=> {
    const salaModel = require('../models/salaModels')
    return salaModel.listarSalas();
}