const asyncHandler = require("express-async-handler");
const Client = require("../models/Client");
const generateToken = require("../utils/generateToken");

const registerClient = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email and password are required");
  }

  const exists = await Client.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("Client already exists");
  }

  const client = await Client.create({ name, email, password });
  if (client) {
    res.status(201).json({
      _id: client._id,
      name: client.name,
      email: client.email,
      token: generateToken(client._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid client data");
  }
});

const loginClient = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const client = await Client.findOne({ email });
  if (client && (await client.matchPassword(password))) {
    res.json({
      _id: client._id,
      name: client.name,
      email: client.email,
      token: generateToken(client._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { registerClient, loginClient };
