module.exports = (req, res, next) => {
    const start = process.hrtime();
    
    res.on('finish', () => {
        const diff = process.hrtime(start);
        const time = diff[0] * 1e3 + diff[1] * 1e-6; // milliseconds
        
        // Update recent activity with status and time
        if (global.serverStats && global.serverStats.recentActivity && global.serverStats.recentActivity.length > 0) {
            // Find the activity item (usually the first one, but check by timestamp roughly)
            const activity = global.serverStats.recentActivity[0];
            if (activity && !activity.statusCode) {
                activity.statusCode = res.statusCode;
                activity.responseTime = time.toFixed(2) + 'ms';
                activity.requestSize = req.get('content-length') || '0';
                activity.responseSize = res.get('content-length') || '0';
            }
        }
    });

    next();
};
