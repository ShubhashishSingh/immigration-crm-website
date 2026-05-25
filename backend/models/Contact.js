const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
        maxlength: 30
    },

    email: {
        type: String,
        required: true,
        maxlength: 50
    },

    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },

    message: {
        type: String,
        required: true,
        maxlength: 500
    },

    status: {
        type: String,
        enum: ["New", "Contacted", "Approved", "Rejected"],
        default: "New"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema);