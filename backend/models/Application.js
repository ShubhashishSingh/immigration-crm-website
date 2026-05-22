const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    fullName: { type: String, required: true, maxlength: 30, trim: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },
    nationality: { type: String, required: true, maxlength: 30 },
    purpose: { type: String, required: true },
    education: { type: String, required: true },
    experience: { type: String },
    cv: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("Application", applicationSchema);