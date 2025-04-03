require("dotenv").config();
const express = require("express");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors()); // Permite peticiones desde tu extensión
app.use(express.json());

// Ruta protegida para verificar autenticación
app.get("/api/check-auth", ClerkExpressRequireAuth(), (req, res) => {
  res.json({
    authenticated: true,
    userId: req.auth.userId,
    email: req.auth.user?.emailAddresses[0]?.emailAddress,
  });
});

// Ruta pública para la página de inicio
app.get("/", (req, res) => {
  res.send("Servidor de autenticación funcionando ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
