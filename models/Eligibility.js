const mongoose = require("mongoose");

const eligibilitySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    maxLength: 30,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return /^[0-9]{10}$/.test(value);
      },
      message: "Phone number must be 10 digits"
    }
  },

  age: {
    type: Number,
    required: true
  },

  education: {
    type: String,
    required: true
  },

  experience: {
    type: String,
    required: true
  },

  purpose: {
    type: String,
    required: true
  },

  country: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["New", "Contacted", "Approved", "Rejected"],
    default: "New"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Eligibility", eligibilitySchema);