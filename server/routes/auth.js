const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model defined

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body; // Include email

    try {
        const newUser = new User({ username, email, password }); // Ensure email is saved
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login route (example)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Logic to validate username and password
    // Example:
    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', username: user.username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;