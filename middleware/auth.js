module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        if (req.accepts('html')) {
            res.redirect('/login');
        } else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized',
                errors: []
            });
        }
    }
};
