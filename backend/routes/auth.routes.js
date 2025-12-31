const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key for JWT (should be in .env)
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key'; 

// @route POST /api/auth/signup
// @desc Register a new user
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // 2. Create new user (password hashing is handled by the pre-save hook)
        user = new User({ username, email, password });
        await user.save();

        // 3. Generate JWT Payload
        const payload = { user: { id: user.id } };

        // 4. Sign and return the token
        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.json({ token, username: user.username });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during signup');
    }
});

const { HoldingsModel } = require('../models/HoldingsModel');
const { PositionsModel } = require('../models/PositionsModel');
const mongoose = require('mongoose');

// @route GET /api/auth/visitor-login
// @desc Direct login for guest visitors with fresh data
router.get('/visitor-login', async (req, res) => {
    const guestId = new mongoose.Types.ObjectId();
    const guestName = "Guest User " + Math.floor(Math.random() * 1000);
    
    // Populate some initial data for the visitor to make it look "different/active"
    try {
        await HoldingsModel.create({
            name: "RELIANCE",
            qty: 10,
            avg: 2100,
            price: 2112.4,
            net: "+0.59%",
            day: "+1.44%",
            user: guestId
        });
        await PositionsModel.create({
            product: "CNC",
            name: "RELIANCE",
            qty: 10,
            avg: 2100,
            price: 2112.4,
            net: "+0.59%",
            day: "+1.44%",
            isLoss: false,
            user: guestId
        });
    } catch (err) {
        console.error("Guest data population failed", err);
    }

    const payload = { user: { id: guestId } };
    jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: '2h' },
        (err, token) => {
            if (err) throw err;
            res.json({ token, username: guestName });
        }
    );
});


// @route POST /api/auth/login
// @desc Authenticate user and get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // --- DEFAULT LOGIN BYPASS ---
    if (email === 'amanahmad0406@gmail.com' && password === 'Aman@12345') {
        const payload = { user: { id: 'admin_default_id' } };
        return jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '24h' }, 
            (err, token) => {
                if (err) throw err;
                res.json({ token, username: 'Aman Ahmad' });
            }
        );
    }
    // ----------------------------------


    try {

        // 1. Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // 3. Generate JWT Payload
        const payload = { user: { id: user.id } };

        // 4. Sign and return the token
        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, username: user.username });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during login');
    }
});

module.exports = router;