const router = require("express").Router();

const { autenticarUsers, getAuth } = require("../controllers/auth.controller");
const { verifyJWT } = require("../middlewares/auth");

// api/auth

router.get("/", verifyJWT, getAuth);

router.post("/", autenticarUsers);

module.exports = router;
