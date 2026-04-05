import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register and login functions for user authentication
export const register = (req, res) => {
  const { email, password, nickname } = req.body;
  if (!nickname)
    return res.status(400).json({ message: "Nickname is required" });

  const hashed = bcrypt.hashSync(password, 10);
  const sql = "INSERT INTO users (email, nickname, password) VALUES (?, ?, ?)";
  db.query(sql, [email, nickname, hashed], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User created" });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email=?";
  db.query(sql, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json({ message: "User not found" });

    const valid = bcrypt.compareSync(password, data[0].password);
    if (!valid) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, nickname: data[0].nickname });
  });
};
