import express from "express";
const router = express.Router();
import User from "../models/User.js";

// POST /signup
router.post("/signup", async (req, res) => {
  const { name, phone, aadhaar, age, gender, password, hashedString } = req.body;

  if (!name || !phone || !aadhaar || !age || !gender || !password || !hashedString) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ aadhaar }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const newUser = new User({
      name,
      phone,
      aadhaar,
      age,
      gender,
      password,
      hashedString,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});

// GET all users (for testing)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

export default router;
