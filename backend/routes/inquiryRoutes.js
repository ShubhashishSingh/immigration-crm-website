const express = require("express");
const router = express.Router();

const Inquiry = require("../models/Inquiry");
const addLeadToSheet = require("../googleSheets");

router.post("/create", async (req, res) => {
    try {
        const inquiry = await Inquiry.create({
            fullName: req.body.fullName,
            phone: req.body.phone,
            email: req.body.email,
            service: req.body.service
        });

        await addLeadToSheet({
            type: "Inquiry",
            name: inquiry.fullName,
            phone: inquiry.phone,
            email: inquiry.email,
            service: inquiry.service
        });

        return res.status(201).json({
            success: true,
            message: "Inquiry Submitted Successfully",
            inquiry
        });

    } catch (error) {
        console.log("Inquiry Error:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;