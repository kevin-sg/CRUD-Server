/**********  Users Controllers  **********/

// Hash password
const bcryptjs = require("bcryptjs");
const { crearJWT } = require("../helpers/crear-jwt");
// Models
const Usuario = require("../models/Usuario");

/* 
    {
        "email": "tes1@correo.com",
        "password": "123456"
    }
*/

const getAuth = async ({ usuario: { id } }, res) => {
	try {
		const usuario = await Usuario.findById(id);

		res.json({ usuario });
	} catch (e) {
		console.error(e);
		res.status(401).json({ msg: "Hable con el Administrador" });
	}
};

const autenticarUsers = async ({ body: { email, password } }, res) => {
	try {
		// Valided unique user register
		const usuario = await Usuario.findOne({ email });
		if (!usuario) {
			return res.status(401).json({ msg: "El usuario no existe" });
		}
		// Compare password
		const passCorrect = await bcryptjs.compare(password, usuario.password);
		if (!passCorrect) {
			return res.status(401).json({
				msg: "Contraseña incorrecta",
			});
		}

		const token = await crearJWT(usuario.id);

		res.json({ usuario, token });
	} catch (e) {
		console.error(e);
		res.status(401).json({ msg: "Hable con el Administrador" });
	}
};

module.exports = { getAuth, autenticarUsers };
