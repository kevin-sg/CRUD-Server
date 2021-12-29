const { Schema, model } = require("mongoose");

const TareaSchema = Schema({
	nombre: {
		type: String,
		trim: true,
		required: true,
	},
	estado: {
		type: Boolean,
		default: false,
	},
	creado: {
		type: Date,
		default: Date.now(),
	},
	creador: {
		type: Schema.Types.ObjectId,
		ref: "Usuario",
	},
	proyecto: {
		type: Schema.Types.ObjectId,
		ref: "Proyecto",
	},
});

TareaSchema.methods.toJSON = function () {
	const { __v, _id, ...tarea } = this.toObject();

	tarea.uid = _id;

	return tarea;
};

module.exports = model("Tarea", TareaSchema);
