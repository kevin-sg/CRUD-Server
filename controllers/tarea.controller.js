/**********  Proyect Controllers  **********/

const Usuario = require("../models/Usuario");
const Proyecto = require("../models/Proyecto");
const Tarea = require("../models/Tarea");

const getTasks = async ({ query: { proyecto }, usuario: { id } }, res) => {
	try {
		// Valided User
		const isUser = await Usuario.findById(id);
		if (!isUser) {
			return res.status(401).json({ msg: "El usuario no existe" });
		}
		// Valided Proyect
		const isProyect = await Proyecto.findById(proyecto);
		if (!isProyect) {
			return res.status(401).json({ msg: "Proyecto no encontrado" });
		}
		// Valided Creator of proyect && user.id
		if (isProyect.creador.toString() !== id) {
			return res.status(401).json({ msg: "No autorizado" });
		}

		const [results, tareas] = await Promise.all([
			Tarea.count({ proyecto }),
			Tarea.find({ proyecto })
				.sort({ creado: -1 })
				.populate("creador", "nombre email")
				.populate("proyecto", "nombre"),
		]);

		res.json({ results, tareas });
	} catch (e) {
		console.error(e);
		res.status(401).json({ msg: "Hable con el Administrador" });
	}
};

const getTasksById = async ({ params: { id: proyecto } }, res) => {
	try {
		const tarea = await Tarea.find({ proyecto })
			.populate("creador", "nombre email")
			.populate("proyecto", "nombre");

		res.json({ tarea });
	} catch (e) {
		console.error(e);
		res.status(401).json({ msg: "Hable con el Administrador" });
	}
};

const createTask = async (
	{ body: { nombre, proyecto: uid }, usuario: { id } },
	res
) => {
	try {
		// Valided User
		const isUser = await Usuario.findById(id);
		if (!isUser) {
			return res.status(401).json({ msg: "El usuario no existe" });
		}

		// Valided Proyect
		const isProyect = await Proyecto.findById(uid);
		if (!isProyect) {
			return res.status(401).json({ msg: "Proyecto no encontrado" });
		}
		// Valided Creator of proyect && user.id
		if (isProyect.creador.toString() !== id) {
			return res.status(401).json({ msg: "No autorizado" });
		}

		// Create Proyect
		const tarea = new Tarea({ nombre });

		// Id of req.user
		tarea.creador = id;
		// Id of id=proyect
		tarea.proyecto = uid;

		// Save Proyect
		await tarea.save();

		res.json({ tarea });
	} catch (e) {
		console.error(e);
		res.status(401).json({ msg: "Hable con el Administrador" });
	}
};

const updateTaks = async (
	{
		body: { nombre, estado, proyecto },
		params: { id },
		usuario: { id: uid },
	},
	res
) => {
	try {
		// Valided User
		const isUser = await Usuario.findById(uid);
		if (!isUser) {
			return res.status(401).json({ msg: "El usuario no existe" });
		}

		// Valided Proyect
		const isProyect = await Proyecto.findById(proyecto._id);
		if (!isProyect) {
			return res.status(401).json({ msg: "Proyecto no encontrado" });
		}
		// Valided Creator of proyect && user.id
		if (isProyect.creador.toString() !== uid) {
			return res.status(401).json({ msg: "No autorizado" });
		}

		const isTask = await Tarea.findById(id);
		if (!isTask) {
			return res.status(401).json({ msg: "No existe esa tarea" });
		}

		const payload = { nombre, estado };

		const tarea = await Tarea.findByIdAndUpdate(id, payload, {
			new: true,
		})
			.populate("creador", "nombre email")
			.populate("proyecto", "nombre");

		res.json({ tarea });
	} catch (e) {
		console.error(e);
		res.status(401).json({ msg: "Hable con el administrador" });
	}
};

const deleteTask = async (
	{ params: { id }, query: { proyecto }, usuario: { id: uid } },
	res
) => {
	try {
		// Valided User
		const isUser = await Usuario.findById(uid);
		if (!isUser) {
			return res.status(401).json({ msg: "El usuario no existe" });
		}
		// Valided Proyect
		const isProyect = await Proyecto.findById(proyecto);
		if (!isProyect) {
			return res.status(401).json({ msg: "El proyecto no existe" });
		}
		// Valided Task
		const isTask = await Tarea.findById(id);
		if (!isTask) {
			return res.status(401).json({ msg: "No existe esa tarea" });
		}

		// Remove Proyect
		await Tarea.findByIdAndRemove(id);

		res.json({ msg: "Tarea eliminada" });
	} catch (e) {
		console.error(e);
		res.status(401).json({ msg: "Hable con el administrador" });
	}
};

module.exports = {
	createTask,
	getTasks,
	getTasksById,
	updateTaks,
	deleteTask,
};
