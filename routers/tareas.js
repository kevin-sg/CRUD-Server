const router = require("express").Router();
const { check } = require("express-validator");
const {
	createTask,
	getTasks,
	getTasksById,
	updateTaks,
	deleteTask,
} = require("../controllers/tarea.controller");

const { validarCampos } = require("../helpers/validar-campos");

const { verifyJWT } = require("../middlewares/auth");

// api/proyectos

router.get(
	"/",
	verifyJWT,
	[check("proyecto", "Ingrese un proyecto válido").not().isEmpty()],
	validarCampos,
	getTasks
);

// router.get("/:id", verifyJWT, getTasksById);

router.post(
	"/",
	verifyJWT,
	[check("nombre", "El nombre de la tarea es obligatorio").not().isEmpty()],
	validarCampos,
	createTask
);

router.put(
	"/:id",
	verifyJWT,
	[
		check("id", "Ingrese un Id válido").isMongoId(),
		check("nombre", "El nombre de la tarea es obligatorio").not().isEmpty(),
		check("proyecto", "Ingrese un proyecto válido").not().isEmpty(),
	],
	validarCampos,
	updateTaks
);

router.delete(
	"/:id",
	verifyJWT,
	[
		check("id", "Ingrese un Id válido").isMongoId(),
		check("proyecto", "Ingrese un proyecto válido").isMongoId(),
	],
	validarCampos,
	deleteTask
);

module.exports = router;
