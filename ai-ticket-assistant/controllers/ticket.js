import { inngest } from "../inngest/client.js";
import Ticket from "../models/ticket.js";
import mongoose from "mongoose";

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const newTicket = await Ticket.create({
      title,
      description,
      createdBy: new mongoose.Types.ObjectId(req.user._id), // ✅ ensure ObjectId
    });

    await inngest.send({
      name: "ticket/created",
      data: {
        ticketId: newTicket._id.toString(),
        title,
        description,
        createdBy: req.user._id.toString(),
      },
    });

    return res.status(201).json({
      message: "Ticket created and processing started",
      ticket: newTicket,
    });
  } catch (error) {
    console.error("❌ Error creating ticket:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTickets = async (req, res) => {
  try {
    const user = req.user;
    let tickets = [];

    if (user.role !== "user") {
      // Admins / managers → see all tickets
      tickets = await Ticket.find({})
        .populate("assignedTo", ["email", "_id"])
        .populate("createdBy", ["email", "_id"])
        .sort({ createdAt: -1 });
    } else {
      // Regular users → only their own tickets
      const creatorId = new mongoose.Types.ObjectId(String(user._id));

      tickets = await Ticket.find({ createdBy: creatorId })
        .select("title description status createdAt createdBy")
        .sort({ createdAt: -1 });
    }

    return res.status(200).json(tickets);
  } catch (error) {
    console.error("❌ Error fetching tickets:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTicket = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ticket ID" });
    }

    // ✅ make sure we await
    const ticket = await Ticket.findById(id)
      .populate("assignedTo", "email")
      .lean(); // converts to plain JS object

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // ✅ send safe JSON
    res.status(200).json({ ticket });
  } catch (err) {
    console.error("❌ Error fetching ticket:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
