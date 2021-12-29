const router = require("express").Router();
const { check } = require("express-validator");

const { validarCampos } = require("../helpers/validar-campos");
const {
	createProyect,
	getProyects,
	getProyectById,
	deleteProyect,
} = require("../controllers/proyectos.controller");
const { verifyJWT } = require("../middlewares/auth");

// api/proyectos

router.get("/", verifyJWT, getProyects);

router.get("/:id", getProyectById);

router.post(
	"/",
	[check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
	validarCampos,
	verifyJWT,
	createProyect
);

router.delete(
	"/:id",
	verifyJWT,
	[check("id", "Ingrese un Id válido").isMongoId()],
	validarCampos,
	deleteProyect
);

module.exports = router;
