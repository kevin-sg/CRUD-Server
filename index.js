const connectDB = require("./database/db");
const express = require("express");
const cors = require("cors");

// Create server
const app = express();

const whiteList = [
	"https://optimistic-lovelace-63878f.netlify.app",
	"http://localhost:3000",
];

// Hability conextion
app.use(cors({ origin: whiteList }));

// Hability files JSON
app.use(express.json());

// Connect MongoDB
connectDB();

// Import Routes
app.use("/api/auth", require("./routers/auth"));
app.use("/api/usuarios", require("./routers/usuarios"));
app.use("/api/proyectos", require("./routers/proyectos"));
app.use("/api/tareas", require("./routers/tareas"));

// Port server App
const PORT = process.env.PORT || 4000;

// Start App
app.listen(PORT, () => {
	console.log(`Server on PORT: http://localhost:${PORT}`);
});
