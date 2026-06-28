const addLeadToSheet = require("../googleSheets");
const Application = require("../models/Application");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../cloudinary");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "immigration-cv",
        resource_type: "raw",
        allowed_formats: ["pdf", "doc", "docx"]
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

            console.log("Google Sheet Updated Successfully");

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