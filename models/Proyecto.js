const { Schema, model } = require("mongoose");

const ProyectoSchema = Schema({
	nombre: {
		type: String,
		trim: true,
		required: true,
	},
	creado: {
		type: Date,
		default: Date.now(),
	},
	creador: {
		type: Schema.Types.ObjectId,
		ref: "Usuario",
		required: true,
	},
});

ProyectoSchema.methods.toJSON = function () {
	const { __v, _id, ...proyecto } = this.toObject();

	proyecto.uid = _id;

	return proyecto;
};

module.exports = model("Proyecto", ProyectoSchema);
