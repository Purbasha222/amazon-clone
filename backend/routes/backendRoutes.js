const express = require("express");
const router = express.Router();
const user = require("../models/backendSchema.js");

// For creating account

router.post("/", async (req, res) => {
  try {
    const { userName, userEmail, password } = req.body;
    const existingUser = await user.findOne({ userName, userEmail, password });
    if (existingUser) {
      res.status(404).json({ message: "Account already exists" });
      return;
    }
    const userData = await user.create({
      userName,
      userEmail,
      password,
    });
    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// For logging in account

router.post("/login", async (req, res) => {
  const { userName, userEmail, password } = req.body;
  const foundUser = await user.findOne({ userName, userEmail, password });
  if (foundUser) {
    res.json({ userName: foundUser.userName });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
