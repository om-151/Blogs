const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// register new user (open to everyone; role can be specified but defaults to "user")
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email and password are required");
  }

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // only an authenticated admin may create another admin
  let assignedRole = "user";
  if (role === "admin") {
    // try to read token from header and verify
    const token = req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;
    if (token) {
      try {
        const decoded = require("jsonwebtoken").verify(token, process.env.JWT_SECRET);
        if (decoded.role === "admin") {
          assignedRole = "admin";
        }
      } catch (err) {
        // ignore, keep default role
      }
    }
  }

  const user = await User.create({
    name,
    email,
    password,
    role: assignedRole,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { loginUser, registerUser };
