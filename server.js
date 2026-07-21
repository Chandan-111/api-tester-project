const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const requestTimer = require('./middleware/requestTimer');
const notFoundHandler = require('./middleware/notFoundHandler');

const authRoutes = require('./routes/authRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const utilityRoutes = require('./routes/utilityRoutes');
const errorRoutes = require('./routes/errorRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Global Stats Store (in-memory for simple display)
global.serverStats = {
    startTime: Date.now(),
    requestCount: 0,
    recentActivity: []
};

// Middleware
app.use(helmet({ contentSecurityPolicy: false })); // Disabled CSP for easy inline scripts
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestTimer);
app.use(logger);

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecret_api_learning',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
// We don't expose views directory directly, we render them via viewRoutes

// Routes
app.use('/', viewRoutes);
app.use('/', authRoutes);
app.use('/', utilityRoutes);
app.use('/error', errorRoutes);
app.use('/', resourceRoutes); // Handles /users, /products, etc.

// 404 & Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
