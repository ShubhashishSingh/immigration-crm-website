const addLeadToSheet = require("../googleSheets");
const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");

router.post("/create", async (req, res) => {

    try {

        const contact = new Contact(req.body);

        await contact.save();

        res.status(201).json({
            success: true,
            message: "Message Sent Successfully",
            contact
        });
        await addLeadToSheet({
            type: "Contact",
            name: contact.fullName,
            phone: contact.phone,
            email: contact.email,
            message: contact.message
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

module.exports = router;