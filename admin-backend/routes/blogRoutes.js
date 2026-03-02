const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeBlog,
} = require("../controllers/blogController");
const {
  createComment,
  getCommentsByBlog,
  getAllComments,
  deleteComment,
  updateComment,
} = require("../controllers/commentController");
const { protect, admin } = require("../middleware/authMiddleware");
const { protectClient } = require("../middleware/clientAuthMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.route("/")
  .get(getBlogs)
  .post(protect, admin, upload.single("featuredImage"), createBlog);

// admin can view all comments and delete any comment
router.route("/comments").get(protect, admin, getAllComments);
router.route("/comments/:id")
  .delete(protect, admin, deleteComment) // admin delete
  .put(protect, admin, updateComment); // admin edit any comment

// client can delete/edit their own comment
router.route("/client-comments/:id")
  .delete(protectClient, deleteComment) // client delete own
  .put(protectClient, updateComment); // client edit own

router.route("/:id")
  .get(getBlogById)
  .put(protect, admin, upload.single("featuredImage"), updateBlog)
  .delete(protect, admin, deleteBlog);

// comment endpoint for specific blog
router.route("/:id/comments")
  .get(getCommentsByBlog) // public
  .post(protectClient, createComment); // only authenticated clients can comment

// like toggle route
router.route("/:id/like").post(protectClient, likeBlog);

module.exports = router;
