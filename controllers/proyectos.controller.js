/**********  Proyect Controllers  **********/

const Usuario = require("../models/Usuario");
const Proyecto = require("../models/Proyecto");
const Tarea = require("../models/Tarea");

const getProyects = async ({ usuario: { id } }, res) => {
	try {
		const [results, proyectos] = await Promise.all([
			Proyecto.count({ creador: id }),
			Proyecto.find({ creador: id })
				.sort({ name: -1 })
				.populate("creador", "nombre email"),
		]);

		res.json({ results, proyectos });
	} catch (e) {
		console.error(e);
		res.status(401).json({ msg: "Hable con el Administrador" });
	}
};

const getProyectById = async ({ params: { id } }, res) => {
	try {
		const proyecto = await Proyecto.findById(id).populate(
			"creador",
			"nombre email"
		);

		res.json({ proyecto });
	} catch (e) {
		console.error(e);
		res.status(401).json({ msg: "Hable con el Administrador" });
	}
};

const createProyect = async ({ body: { nombre }, usuario: { id } }, res) => {
	try {
		// Valided User
		const user = await Usuario.findById(id);
		if (!user) {
			return res.status(401).json({ msg: "El usuario no existe" });
		}

		const validedProyect = await Proyecto.findOne({ nombre });
		if (validedProyect) {
			return res.status(401).json({
				msg: `El proyecto "${nombre}" ya existe`,
			});
		}

		// Create Proyect
		const proyecto = new Proyecto({ nombre });

		// Id of req.user
		proyecto.creador = id;

		// Save Proyect
		await proyecto.save();

		res.json({ proyecto });
	} catch (e) {
		console.error(e);
		res.status(401).json({ msg: "Hable con el Administrador" });
	}
};

const deleteProyect = async ({ params: { id }, usuario: { id: uid } }, res) => {
	try {
		// Valided User
		const user = await Usuario.findById(uid);
		if (!user) {
			return res.status(401).json({ msg: "El usuario no existe" });
		}

		// Valided Proyect
		const proyecto = await Proyecto.findById(id);
		if (!proyecto) {
			return res.status(401).json({ msg: "Proyecto no encontrado" });
		}

		// Remove Task of proyect
		const isValid = await Tarea.find({ proyecto: id });
		if (isValid) {
			for (let i = 0; i <= isValid.length - 1; i++) {
				await Tarea.findOneAndRemove({ proyecto: id });
			}
		}

		// Remove Task
		await Proyecto.findByIdAndRemove(id);

		res.json({ msg: "Proyecto eliminado" });
	} catch (e) {
		console.error(e);
		res.status(401).json({ msg: "Hable con el administrador" });
	}
};

module.exports = {
	createProyect,
	getProyects,
	getProyectById,
	deleteProyect,
};
