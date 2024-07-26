const express = require('express');
const router = express.Router();
const { User } = require('../models/User'); // Adjust the path as needed

// Middleware to check if the user is logged in
const checkAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Middleware to check if the user is not logged in
const checkNotAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        res.redirect('/profile'); // Redirect to profile if already logged in
    } else {
        next();
    }
};

// Fetch user profile (requires authentication)
router.get('/profile', checkAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Sign up route (can be used for checking Not Authenticated)
router.post('/signup', checkNotAuthenticated, async (req, res) => {
    // Handle sign-up logic here
});

module.exports = { checkAuthenticated, checkNotAuthenticated, router };
