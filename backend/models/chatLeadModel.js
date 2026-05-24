const mongoose = require("mongoose");

const chatLeadSchema = new mongoose.Schema({
    name: String,
    destination: String,
    phone: String,
    visaType: String,
    email: String,
    paidService: String,
    experience: String,
    education: String,
    languageScore: String,
    budget: String
}, {
    timestamps: true
});

module.exports = mongoose.model("ChatLead", chatLeadSchema);