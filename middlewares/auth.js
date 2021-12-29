require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
	// Token in header
	try {
		const token = req.header("x-auth-token");
		if (!token) {
			return res.status(401).json({ msg: "No hay token en la petición" });
		}

		// Send a user at the request
		req.usuario = jwt.verify(token, process.env.SECRET_KEY);

		next();
	} catch (e) {
		console.error(e);
		res.status(401).json({ msg: "Token no válido" });
	}
};

module.exports = { verifyJWT };
