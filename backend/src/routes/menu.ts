import express from "express";
import { requireAdmin } from "../middleware/admin.js";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ isAvailable: true });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu items" });
  }
});

// Get featured menu items
router.get("/featured", async (req, res) => {
  try {
    const featuredItems = await MenuItem.find({
      isFeatured: true,
      isAvailable: true,
    });
    res.json(featuredItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching featured items" });
  }
});

// Add a new menu item (Admin only - placeholder)
router.post("/", requireAdmin, async (req, res) => {
  const { name, description, price, category, image, isFeatured } = req.body;
  try {
    const newItem = new MenuItem({
      name,
      description,
      price,
      category,
      image,
      isFeatured,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: "Error creating menu item" });
  }
});

export default router;
