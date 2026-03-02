const express = require("express");
const { getDashboardStats } = require("../controllers/dashboardController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/dashboard/stats  -> admin only
router.get("/stats", protect, admin, getDashboardStats);

module.exports = router;
