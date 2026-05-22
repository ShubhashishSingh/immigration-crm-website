const express = require("express");
const router = express.Router();
const Eligibility = require("../models/Eligibility");

router.post("/create", async (req, res) => {
  try {
    const eligibility = await Eligibility.create({
      fullName: req.body.fullName,
      phone: req.body.phone,
      age: req.body.age,
      education: req.body.education,
      experience: req.body.experience,
      purpose: req.body.purpose,
      country: req.body.country
    });

    res.status(201).json({
      success: true,
      message: "Eligibility Submitted Successfully",
      eligibility
    });

  } catch (error) {
    console.log("Eligibility Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;