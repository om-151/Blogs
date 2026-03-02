const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");
const { protect, admin } = require("../middleware/authMiddleware");

// public
router.post("/", createContact);

// admin
router.get("/", protect, admin, getContacts);
router.delete("/:id", protect, admin, deleteContact);

module.exports = router;
