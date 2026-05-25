const express = require("express");
const router = express.Router();

const Inquiry = require("../models/Inquiry");
const Application = require("../models/Application");
const Contact = require("../models/Contact");
const Eligibility = require("../models/Eligibility");
const ChatLead = require("../models/chatLeadModel");

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "true-move-admin-token";

function verifyAdmin(req, res, next) {
  const token = req.headers.authorization;

  if (token === `Bearer ${ADMIN_TOKEN}`) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized access"
    });
  }
}

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      message: "Login successful",
      token: ADMIN_TOKEN
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid username or password"
  });
});

router.get("/leads", verifyAdmin, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    const applications = await Application.find().sort({ createdAt: -1 });
    const contacts = await Contact.find().sort({ createdAt: -1 });
    const eligibilities = await Eligibility.find().sort({ createdAt: -1 });
    const chatLeads = await ChatLead.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      inquiries,
      applications,
      contacts,
      eligibilities,
      chatLeads
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.delete("/delete/:type/:id", verifyAdmin, async (req, res) => {
  try {
    const { type, id } = req.params;

    let Model;

    if (type === "inquiries") Model = Inquiry;
    else if (type === "applications") Model = Application;
    else if (type === "contacts") Model = Contact;
    else if (type === "eligibilities") Model = Eligibility;
    else if (type === "chatLeads") Model = ChatLead;
    else {
      return res.status(400).json({
        success: false,
        message: "Invalid lead type"
      });
    }

    await Model.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Lead deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;