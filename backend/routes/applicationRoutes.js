const addLeadToSheet = require("../googleSheets");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Application = require("../models/Application");

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/create", upload.single("cv"), async (req, res) => {
    try {
        console.log("APPLICATION BODY:", req.body);
        console.log("APPLICATION FILE:", req.file);

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
            cv: req.file ? `uploads/${req.file.filename}` : ""
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

        res.status(201).json({
            success: true,
            message: "Application Submitted Successfully",
            application
        });

    } catch (error) {
        console.log("Application Error:", error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;