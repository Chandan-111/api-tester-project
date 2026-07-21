const express = require('express');
const router = express.Router();
const os = require('os');
const supabase = require('../config/supabase');

router.get('/health', async (req, res) => {
    try {
        const { error } = await supabase.from('users').select('id').limit(1);
        const dbStatus = error ? 'disconnected' : 'connected';
        
        res.json({
            success: true,
            message: 'System health retrieved',
            data: {
                server: 'online',
                database: dbStatus,
                uptime: process.uptime()
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Health check failed', errors: [err.message] });
    }
});

router.get('/time', (req, res) => {
    res.json({ success: true, message: 'Time retrieved', data: { time: new Date().toISOString() } });
});

router.get('/version', (req, res) => {
    res.json({ success: true, message: 'Version retrieved', data: { version: '1.0.0', environment: process.env.NODE_ENV || 'development' } });
});

router.get('/headers', (req, res) => {
    res.json({ success: true, message: 'Headers retrieved', data: req.headers });
});

router.get('/ip', (req, res) => {
    res.json({ success: true, message: 'IP retrieved', data: { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress } });
});

router.all('/echo', (req, res) => {
    res.json({
        success: true,
        message: 'Echo successful',
        data: {
            method: req.method,
            body: req.body,
            query: req.query,
            headers: req.headers
        }
    });
});

router.get('/delay/:ms', (req, res) => {
    const ms = parseInt(req.params.ms) || 1000;
    setTimeout(() => {
        res.json({ success: true, message: `Delayed by ${ms}ms`, data: {} });
    }, ms);
});

router.get('/random', (req, res) => {
    res.json({ success: true, message: 'Random number', data: { number: Math.floor(Math.random() * 1000000) } });
});

router.post('/webhook-test', (req, res) => {
    res.json({ success: true, message: 'Webhook received', data: req.body });
});

module.exports = router;
