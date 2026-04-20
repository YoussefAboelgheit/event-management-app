import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  const user = await User.create(req.body);
  user.password = undefined; // Hide passenger on return
  res.status(201).json(user);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // 1. Create short-lived Access Token (e.g., 15 minutes)
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || "supersecret",
    { expiresIn: "15m" }
  );

  // 2. Create long-lived Refresh Token (e.g., 7 days)
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET || "supersecret_refresh",
    { expiresIn: "7d" }
  );

  // 3. Send Refresh Token in a secure HTTP-Only cookie
  res.cookie("jwt", refreshToken, {
    httpOnly: true, // practically prevents XSS
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // 4. Send Access Token and User info in JSON response
  res.json({
    user: { _id: user._id, name: user.name, email: user.email },
    accessToken,
  });
};

// --- NEW REFRESH TOKEN API ---
export const refreshUserToken = async (req, res) => {
  const refreshToken = req.cookies.jwt;
  
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found, please log in" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "supersecret_refresh");
    
    // Generate a new Access Token
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

import { blacklistedTokens } from "../middlewares/authMW.js";

// --- NEW LOGOUT API ---
export const logoutUser = (req, res) => {
  // Extract the token supplied by the user
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const token = authHeader.split(" ")[1];

  // 1. Prevent logging out again if already logged out
  if (blacklistedTokens.has(token)) {
    return res.status(400).json({ message: "You are already logged out." });
  }

  // 2. Destroy the Access Token (Add to Server Blacklist)
  blacklistedTokens.add(token);

  // 3. Destroy the Refresh Token (Clear the browser cookie)
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  
  res.json({ message: "Logged out successfully. All tokens destroyed." });
};

export const updateUser = async (req, res) => {
  if (req.params.id !== req.user.userId) {
    return res.status(403).json({ message: "You are not authorized to update this account" });
  }

  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Assign new fields
  Object.assign(user, req.body);
  
  // Force version increment
  user.increment();
  
  await user.save();
  res.json(user);
};

export const deleteUser = async (req, res) => {
  if (req.params.id !== req.user.userId) {
    return res.status(403).json({ message: "You are not authorized to delete this account" });
  }

  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ message: "User deleted successfully" });
};
