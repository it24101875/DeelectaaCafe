import express from "express";
import { requireAdmin } from "../middleware/admin.js";
import BlogPost from "../models/BlogPost.js";

const router = express.Router();

// Get all blog posts
router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ publishedAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog posts" });
  }
});

// Get a single blog post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog post" });
  }
});

// Create a blog post (Admin placeholder)
router.post("/", requireAdmin, async (req, res) => {
  const { title, excerpt, content, image, category, tags } = req.body;
  try {
    const newPost = new BlogPost({
      title,
      excerpt,
      content,
      image,
      category,
      tags,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: "Error creating blog post" });
  }
});

export default router;
