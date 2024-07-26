// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true }, // Added required constraint
    lastName: { type: String, required: true }, // Added required constraint
    email: { type: String, required: true, unique: true },
    otp: { type: String },
    otpExpires: { type: Date },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;