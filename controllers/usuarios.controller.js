/**********  Users Controllers  **********/

// Hash password
const bcryptjs = require("bcryptjs");
const { crearJWT } = require("../helpers/crear-jwt");
// Models
const Usuario = require("../models/Usuario");

/* 
    {
        "nombre": "test1",
        "email": "tes1@correo.com",
        "password": "123456"
    }
*/

const createUsers = async ({ body: { nombre, email, password } }, res) => {
	try {
		// Valided unique user register
		const validarUsuario = await Usuario.findOne({ email });
		if (validarUsuario) {
			return res.status(401).json({ msg: "El usuario ya existe" });
		}

		// Create new User
		const usuario = new Usuario({ nombre, email, password });
		// Hash password
		const salt = await bcryptjs.genSalt(10);
		usuario.password = await bcryptjs.hash(password, salt);

		const token = await crearJWT(usuario.id);
		// Save DB
		await usuario.save();

		res.json({ usuario, token });
	} catch (e) {
		console.error(e);
		res.status(401).json({ msg: "Hable con el Administrador" });
	}
};

module.exports = { createUsers };
