const express = require('express');
const router = express.Router();

const errors = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    409: 'Conflict',
    422: 'Unprocessable Entity',
    429: 'Too Many Requests',
    500: 'Internal Server Error'
};

Object.keys(errors).forEach(code => {
    router.all(`/${code}`, (req, res) => {
        res.status(parseInt(code)).json({
            success: false,
            message: errors[code],
            errors: [`Simulated ${code} error`]
        });
    });
});

module.exports = router;
