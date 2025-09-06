// scripts/seedAdmin.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");

dotenv.config();
connectDB();

const createAdmin = async () => {
  try {
    const email = "admin@example.com";
    const exists = await User.findOne({ email });
    if (exists) {
      console.log("Admin already exists");
      process.exit(0);
    }
    const admin = new User({
      name: "Admin",
      email,
      password: bcrypt.hashSync("admin123", 10), // change default password!
      role: "admin",
    });
    await admin.save();
    console.log("Admin created:", email, "password: admin123");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
