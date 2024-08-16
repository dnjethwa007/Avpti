const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    otp: { type: String },          // Field to store OTP
    otpExpires: { type: Date },     // Field to store OTP expiration time
    password: { type: String, required: false }
});

// Adding a virtual field for full name
userSchema.virtual('name').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model('User', userSchema);
module.exports = User;
