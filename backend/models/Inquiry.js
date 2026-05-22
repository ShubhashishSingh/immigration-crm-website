const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
        maxlength: 30,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },

    email: {
        type: String,
        maxlength: 50,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },

    service: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Inquiry", inquirySchema);