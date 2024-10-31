const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register route
router.post('/register', async (req, res) => {
       
    try {
        const { username, email, password } = req.body;

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);  

        const newUser = new User({ username, email, password:hash });
        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login route 
router.post('/login', async (req, res) => {
    // Logic to validate username and password
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username }).lean();

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const match = bcrypt.compareSync(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        res.status(200).json({ message: 'Login successful', username: user.username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;