import jwt from "jsonwebtoken";

// In-memory blacklist for destroyed Access Tokens
export const blacklistedTokens = new Set();

export const authMW = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];

    // Check if token was explicitly destroyed via logout
    if (blacklistedTokens.has(token)) {
      return res.status(401).json({ message: "Token has been invalidated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecret");

    req.user = decoded; // { userId: ... }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
