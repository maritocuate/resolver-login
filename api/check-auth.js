const { Clerk } = require("@clerk/clerk-sdk-node");
const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

module.exports = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const session = await clerk.verifyToken(token);
    res.json({ userId: session.userId });
  } catch (error) {
    res.status(401).json({ error: "No autenticado" });
  }
};
