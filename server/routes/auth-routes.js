import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });
  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const id = user.dataValues.id;
  const username = user.dataValues.username;
  const secretKey = process.env.JWT_SECRET || "";

  const token = jwt.sign({ email, id, username }, secretKey, {
    expiresIn: "8h",
  });
  return res.json({ token });
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });

    const token = jwt.sign({ id: newUser.id, username }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const router = Router();

// POST /login - Login a user
router.post("/login", login);
router.post("/signup", signup);

export default router;
