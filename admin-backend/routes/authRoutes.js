const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/authController");

// public endpoints
router.post("/login", loginUser);
router.post("/register", registerUser); // allows creating users/admins

module.exports = router;
