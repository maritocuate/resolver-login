require("dotenv").config();
const express = require("express");
const { Clerk } = require("@clerk/clerk-sdk-node");
const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

const app = express();
const PORT = 3000;

// Middleware para parsear el token
app.use((req, res, next) => {
  req.headers.authorization =
    req.headers.authorization || `Bearer ${req.query.token}`;
  next();
});

// Simula los endpoints de Vercel
app.get("/", (req, res) => res.send("Server local working ✅"));
app.get("/api/check-auth", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const session = await clerk.verifyToken(token);
    res.json({ userId: session.userId });
  } catch (error) {
    res.status(401).json({ error: "No autenticado" });
  }
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
