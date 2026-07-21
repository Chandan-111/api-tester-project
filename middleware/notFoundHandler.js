module.exports = (req, res, next) => {
    if (req.url.startsWith('/api/') || req.method !== 'GET') {
        res.status(404).json({
            success: false,
            message: 'Endpoint not found',
            errors: []
        });
    } else {
        res.status(404).send('<h1>404 - Page Not Found</h1>');
    }
};
