const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.route("/")
  .get(getBlogs)
  .post(protect, admin, upload.single("featuredImage"), createBlog);

router.route("/:id")
  .get(getBlogById)
  .put(protect, admin, upload.single("featuredImage"), updateBlog)
  .delete(protect, admin, deleteBlog);

module.exports = router;
