const express = require('express');
const path = require('path');
const router = express.Router();
const auth = require('../middleware/auth');

// Serve dashboard and public pages
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Protected routes
router.get('/dashboard', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

router.get('/docs', (req, res) => { // Docs can be public
    res.sendFile(path.join(__dirname, '../views/docs.html'));
});

router.get('/database', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/database.html'));
});

router.get('/status', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/status.html'));
});

router.get('/activity', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/activity.html'));
});

// Generic resource views
const resources = ['users', 'products', 'orders', 'employees', 'books', 'students', 'tasks'];
resources.forEach(resource => {
    router.get(`/${resource}-view`, auth, (req, res) => {
        // Here we could serve a generic resource template, or dynamically pass resource name
        // Since we are using Vanilla JS, we can serve the same HTML and infer from URL or pass a query
        res.sendFile(path.join(__dirname, '../views/resource.html'));
    });
});

// Endpoint for activity stream (Server-Sent Events)
router.get('/activity-stream', auth, (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // Send current recent activity immediately
    res.write(`data: ${JSON.stringify(global.serverStats.recentActivity)}\n\n`);
    
    // Poll for updates every 2 seconds
    const interval = setInterval(() => {
        res.write(`data: ${JSON.stringify(global.serverStats.recentActivity)}\n\n`);
    }, 2000);
    
    req.on('close', () => clearInterval(interval));
});

// Server stats endpoint for dashboard
router.get('/api/stats', auth, (req, res) => {
    res.json({
        success: true,
        data: {
            requestCount: global.serverStats.requestCount,
            startTime: global.serverStats.startTime,
            uptime: process.uptime()
        }
    });
});

module.exports = router;
