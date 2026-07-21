module.exports = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent') || 'Unknown';
    
    // Log to console
    console.log(`[${timestamp}] ${method} ${url} - ${ip} - ${userAgent}`);
    
    // Store in global stats for activity feed
    if (!global.serverStats.recentActivity) {
        global.serverStats.recentActivity = [];
    }
    
    if (url !== '/activity-stream' && !url.includes('.css') && !url.includes('.js')) {
        global.serverStats.requestCount++;
        global.serverStats.recentActivity.unshift({
            timestamp,
            method,
            endpoint: url,
            ip,
            userAgent,
            clientName: detectClient(userAgent)
        });
        
        // Keep only last 100 requests
        if (global.serverStats.recentActivity.length > 100) {
            global.serverStats.recentActivity.pop();
        }
    }

    next();
};

function detectClient(userAgent) {
    userAgent = userAgent.toLowerCase();
    if (userAgent.includes('postman')) return 'Postman';
    if (userAgent.includes('powerautomate') || userAgent.includes('logicapps')) return 'Power Automate';
    if (userAgent.includes('axios')) return 'Axios';
    if (userAgent.includes('python-requests')) return 'Python Requests';
    if (userAgent.includes('curl')) return 'cURL';
    if (userAgent.includes('node-fetch')) return 'Fetch';
    if (userAgent.includes('mozilla') || userAgent.includes('chrome') || userAgent.includes('safari')) return 'Browser';
    return 'Unknown Client';
}
