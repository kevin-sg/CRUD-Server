const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
	nombre: {
		type: String,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		trim: true,
		required: true,
	},
	registro: {
		type: Date,
		default: Date.now(),
	},
});

UsuarioSchema.methods.toJSON = function () {
	const { __v, _id, password, ...usuario } = this.toObject();

	usuario.uid = _id;

	return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
