const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    otp: { type: String },
    otpExpires: { type: Date },
    password: { type: String, required: true }
});

// Adding a virtual field for full name
userSchema.virtual('name').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model('User', userSchema);
module.exports = User;
