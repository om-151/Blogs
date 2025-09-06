const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");
const slugify = require("slugify");

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, content, tags, published } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Title and content are required");
  }

  // Generate slug
  let slug = slugify(title, { lower: true, strict: true });
  const exists = await Blog.findOne({ slug });
  if (exists) slug = `${slug}-${Date.now()}`;

  // Handle image from multer
  const featuredImage = req.file ? `/uploads/${req.file.filename}` : "";

  const blog = await Blog.create({
    title,
    slug,
    description,
    content,
    tags: tags ? JSON.parse(tags) : [],
    featuredImage,
    published: published ?? true,
    author: req.user._id,
  });

  res.status(201).json(blog);
});

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()
    .populate("author", "name email")
    .sort({ createdAt: -1 });
  res.json(blogs);
});

const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate(
    "author",
    "name email"
  );
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  res.json(blog);
});

const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  const { title, description, content, tags, published } = req.body;

  if (title) {
    blog.title = title;
    blog.slug = slugify(title, { lower: true, strict: true });
  }
  if (description !== undefined) blog.description = description;
  if (content !== undefined) blog.content = content;
  if (tags !== undefined) blog.tags = JSON.parse(tags);
  if (req.file) blog.featuredImage = `/uploads/${req.file.filename}`;
  if (published !== undefined) blog.published = published;

  const updated = await blog.save();
  res.json(updated);
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog removed successfully" });
});

module.exports = { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
