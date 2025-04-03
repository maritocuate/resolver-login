require("dotenv").config();

const express = require("express");
const { Clerk } = require("@clerk/clerk-sdk-node");
const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors()); // Permite peticiones desde tu extensión
app.use(express.json());

// Ruta protegida para verificar autenticación
app.get("/api/check-auth", async (req, res) => {
  try {
    const session = await clerk.verifyToken(req.headers.authorization);
    res.json({ userId: session.userId });
  } catch (error) {
    res.status(401).json({ error: "No autenticado" });
  }
});

// Ruta pública para la página de inicio
app.get("/", (req, res) => {
  res.send("Server working");
});

module.exports = app;
