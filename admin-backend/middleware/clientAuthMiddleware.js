const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Client = require("../models/Client");

const protectClient = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.client = await Client.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, client token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized as client, no token");
  }
});

module.exports = { protectClient };
