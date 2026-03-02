const asyncHandler = require("express-async-handler");
const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

// create a comment on a blog (user must be authenticated)
const createComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const blogId = req.params.id;

  if (!text) {
    res.status(400);
    throw new Error("Comment text is required");
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  // check if client already commented on this blog
  const existing = await Comment.findOne({
    client: req.client._id,
    blog: blogId,
  });
  if (existing) {
    res.status(400);
    throw new Error("You can only post one comment per blog");
  }

  const comment = await Comment.create({
    client: req.client._id,
    blog: blogId,
    text,
  });

  res.status(201).json(comment);
});

// get comments for a particular blog (public)
const getCommentsByBlog = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ blog: req.params.id })
    .populate("client", "name email")
    .sort({ createdAt: -1 });
  res.json(comments);
});

// admin only: list all comments across blogs
const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find()
    .populate("client", "name email")
    .populate("blog", "title slug")
    .sort({ createdAt: -1 });
  res.json(comments);
});

// admin can delete any comment; owner can delete own comment
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  // use findByIdAndDelete instead of deprecated .remove()
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ message: "Comment removed" });
});

// update a comment (owner only, or admin)
const updateComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const commentId = req.params.id;

  if (!text) {
    res.status(400);
    throw new Error("Comment text is required");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  // allow update by comment owner or admin
  if (
    req.user?.role !== "admin" &&
    comment.client.toString() !== req.client?._id.toString()
  ) {
    res.status(403);
    throw new Error("Not authorized to edit this comment");
  }

  comment.text = text;
  const updated = await comment.save();
  res.json(updated);
});

module.exports = {
  createComment,
  getCommentsByBlog,
  getAllComments,
  deleteComment,
  updateComment,
};
