const addLeadToSheet = require("../googleSheets");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const Application = require("../models/Application");

/* STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

/* CREATE APPLICATION */
router.post("/create", upload.single("cv"), async (req, res) => {
    try {
        const application = new Application({
            fullName: req.body.fullName,
            dob: req.body.dob,
            gender: req.body.gender,
            email: req.body.email,
            phone: req.body.phone,
            nationality: req.body.nationality,
            purpose: req.body.purpose,
            education: req.body.education,
            experience: req.body.experience,
            cv: req.file ? req.file.path : ""
        });

        await application.save();

        try {
            await addLeadToSheet({
                type: "Application",
                name: application.fullName,
                phone: application.phone,
                email: application.email,
                service: application.purpose,
                country: application.nationality,
                message: application.experience,
                cv: application.cv
            });
        } catch (sheetError) {
            console.log("Google Sheet Error:", sheetError.message);
        }

        return res.status(201).json({
            success: true,
            message: "Application Submitted Successfully",
            application
        });

    } catch (error) {
        console.log("Application Error:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;