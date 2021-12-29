const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
	const err = validationResult(req);

	if (!err.isEmpty()) {
		const error = err.array().map((el) => ({ msg: el["msg"] }));
		return res.json({ error });
	}

	next();
};

module.exports = { validarCampos };
