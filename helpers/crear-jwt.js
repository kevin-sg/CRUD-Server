require("dotenv").config();
const jwt = require("jsonwebtoken");

const crearJWT = (id) => {
	return new Promise((res, rej) => {
		jwt.sign(
			{ id },
			process.env.SECRET_KEY,
			{ expiresIn: "4h" },
			(err, token) => {
				if (err) rej(err);

				res(token);
			}
		);
	});
};

module.exports = { crearJWT };
