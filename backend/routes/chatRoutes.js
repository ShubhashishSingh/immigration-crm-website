const express = require("express");
const router = express.Router();
const ChatLead = require("../models/chatlead");

router.post("/create", async (req, res) => {
  try {
    const lead = await ChatLead.create(req.body);

    res.status(201).json({
      success: true,
      message: "Chat lead saved successfully",
      lead
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;