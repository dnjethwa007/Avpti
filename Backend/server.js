// server.js
require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require('./models/User'); // Ensure User model is defined properly
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Nodemailer setup
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic Route for Testing
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post("/user/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const { password: userPassword, ...userData } = user.toObject();
        res.status(200).json({ user: userData });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.post("/user/send-otp", async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'This email already exists' });
        }
        await User.findOneAndUpdate(
            { email },
            { otp, otpExpires: Date.now() + 10 * 60 * 1000 }, // OTP expires in 10 minutes
            { upsert: true }
        );

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}`
        });

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Error sending OTP" });
    }
});

app.post("/user/verify-otp", async (req, res) => {
    const { firstName, lastName, email, otp, password, confirmPassword } = req.body;

    // Check if all fields are provided
    if (!firstName || !lastName || !email || !otp || !password || !confirmPassword) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.otp !== otp || Date.now() > user.otpExpires) {
            return res.status(400).json({ error: "Invalid OTP or OTP expired" });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.password = await bcrypt.hash(password, 10); // Hash the password
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const handleLogout = async () => {
    try {
        const response = await fetch('/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Include cookies if using cookies for authentication
        });

        if (response.ok) {
            // Clear local storage or cookies
            localStorage.removeItem('token');
            // Optionally, redirect to login page
            window.location.href = '/login';
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));