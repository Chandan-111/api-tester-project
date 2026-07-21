// We can use a simple validation function depending on the resource
module.exports = (rules) => {
    return (req, res, next) => {
        const errors = [];
        for (const [field, type] of Object.entries(rules)) {
            if (!req.body[field]) {
                errors.push(`${field} is required`);
            } else if (typeof req.body[field] !== type) {
                errors.push(`${field} must be of type ${type}`);
            }
        }
        
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }
        next();
    };
};
