const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Client = require("../models/Client");
const {
  registerClient,
  loginClient,
} = require("../controllers/clientAuthController");
const { protect, admin } = require("../middleware/authMiddleware");

// public auth endpoints
router.post("/register", registerClient);
router.post("/login", loginClient);

// admin management of clients
router.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const clients = await Client.find().select("-password").sort({ createdAt: -1 });
    res.json(clients);
  })
);

router.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id);
    if (!client) {
      res.status(404);
      throw new Error("Client not found");
    }
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client removed" });
  })
);

module.exports = router;
