const { check } = require("express-validator");
const router = require("express").Router();

const { createUsers } = require("../controllers/usuarios.controller");
const { validarCampos } = require("../helpers/validar-campos");

// api/auth

/* 

	[
		check("email", "Ingrese un email válido").isEmail(),
		check(
			"password",
			"La contraseña debe ser como mínimo de 6 carácteres"
		).isLength({ min: 6 }),
	],
	validarCampos,
*/

router.post("/", createUsers);

module.exports = router;
