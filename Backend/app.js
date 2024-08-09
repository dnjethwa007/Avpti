require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Ensure User model is defined properly
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

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

// Secret key for JWT signing and encryption
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'No token found' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Basic Route for Testing
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post("/user/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Validation error: Email and password are required');
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`Login attempt failed: User with email ${email} not found`);
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Login attempt failed: Incorrect password');
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate a token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Send response with user data and token
        const { password: userPassword, ...userData } = user.toObject();
        console.log(`Login successful: User ${email} authenticated`);
        res.status(200).json({ user: userData, token });
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
            console.log(`Error: Email ${email} already exists`);
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

        console.log(`OTP sent successfully to ${email}`);
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Error sending OTP" });
    }
});

app.post("/user/verify-otp", async (req, res) => {
    const { firstName, lastName, email, otp, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !otp || !password || !confirmPassword) {
        console.log('Validation error: All fields are required');
        return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
        console.log('Validation error: Passwords do not match');
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`Error: User with email ${email} not found`);
            return res.status(404).json({ error: "User not found" });
        }

        if (user.otp !== otp || Date.now() > user.otpExpires) {
            console.log('Error: Invalid OTP or OTP expired');
            return res.status(400).json({ error: "Invalid OTP or OTP expired" });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.password = await bcrypt.hash(password, 10); // Hash the password
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        console.log(`User ${email} registered successfully`);
        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const crypto = require('crypto');

app.post('/user/send-reset-link', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a 6-digit OTP
        const otp = (crypto.randomInt(100000, 1000000)).toString(); // Generate a number between 100000 and 999999
        const otpExpires = Date.now() + 60 * 60 * 1000; // OTP expires in 1 hour

        // Save OTP and expiration time to the user
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // Send OTP to user's email
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}. It is valid for 1 hour.`
        });

        console.log(`Password reset OTP sent successfully to ${email}`);
        res.status(200).json({ message: 'Password reset OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Error sending OTP', details: error.message });
    }
});


app.post('/user/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if OTP matches and is not expired
        if (user.otp !== otp || Date.now() > user.otpExpires) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        // Hash the new password before saving
        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = undefined;        // Clear OTP
        user.otpExpires = undefined; // Clear OTP expiration
        await user.save();

        console.log(`Password reset successfully for ${email}`);
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Error resetting password', details: error.message });
    }
});




// Handle Logout
app.post("/user/logout", authenticateToken, (req, res) => {
    console.log('User logged out');
    res.status(200).json({ message: "Logged out successfully" });
});

// Fetch User Profile Route
app.get('/user/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude the password field
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update Profile Route
app.put('/user/profile', authenticateToken, async (req, res) => {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.firstName = firstName;
        user.lastName = lastName;

        await user.save();
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Change Password Route
app.put('/user/change-password', authenticateToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current and new passwords are required' });
    }

    if (currentPassword === newPassword) {
        return res.status(400).json({ error: 'New password must be different from the current password' });
    }

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        user.password = await bcrypt.hash(newPassword, 10); // Hash the new password
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));