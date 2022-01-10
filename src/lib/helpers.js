const bcrypt = require("bcryptjs");

const helpers = {};
//Encryptador de contraseña | registracion
helpers.encryptPassword = async (password) => {
    //genSalt crea un hash, parametro es la cantidad de veces que se genera
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

//Comparador de hashes | logueo
helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e);
    }
}

module.exports = helpers;
