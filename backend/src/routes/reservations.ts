import express from "express";
import { requireAdmin } from "../middleware/admin.js";
import Reservation from "../models/Reservation.js";
import { sendReservationEmail } from "../utils/mailer.js";

const router = express.Router();

// Create a reservation
router.post("/", async (req, res) => {
  const { name, email, phone, date, time, guests, specialRequests } = req.body ?? {};
  const bookingTime = new Date(`${date}T${time}:00+05:30`);
  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.length > 120 ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof phone !== "string" ||
    !/^[+\d ()-]{7,25}$/.test(phone) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !/^(09|1[0-9]|20):00$/.test(time) ||
    !Number.isInteger(guests) ||
    guests < 1 ||
    guests > 12 ||
    !Number.isFinite(bookingTime.getTime()) ||
    bookingTime <= new Date() ||
    (specialRequests !== undefined &&
      (typeof specialRequests !== "string" || specialRequests.length > 2000))
  ) {
    return res
      .status(400)
      .json({
        message:
          "Please provide valid guest details and a future booking time.",
      });
  }
  try {
    const newReservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      guests,
      specialRequests,
    });
    const savedReservation = await newReservation.save();

    // Send pending email asynchronously
    sendReservationEmail(email, name, date, time, "pending").catch(
      console.error,
    );

    res
      .status(201)
      .json({ id: savedReservation._id, status: savedReservation.status });
  } catch (error) {
    res.status(400).json({ message: "Error creating reservation" });
  }
});

// Get all reservations (Admin only - placeholder)
router.get("/", requireAdmin, async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations" });
  }
});

// Update reservation status
router.patch("/:id/status", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body ?? {};
    const { id } = req.params;

    if (!["pending", "confirmed", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Send status update email asynchronously
    sendReservationEmail(
      updatedReservation.email,
      updatedReservation.name,
      updatedReservation.date.toString(),
      updatedReservation.time,
      status as "confirmed" | "rejected",
    ).catch(console.error);

    res.json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: "Error updating reservation status" });
  }
});

export default router;
