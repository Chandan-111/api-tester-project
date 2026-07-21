const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Hardcoded credentials as requested
    if (username === 'Chandan' && password === 'Gotilla') {
        req.session.user = { username: 'Chandan' };
        res.json({ success: true, message: 'Logged in successfully', data: {} });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials', errors: [] });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: 'Logged out successfully', data: {} });
});

router.get('/profile', (req, res) => {
    if (req.session && req.session.user) {
        res.json({ success: true, message: 'Profile fetched', data: req.session.user });
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized', errors: [] });
    }
});

module.exports = router;
