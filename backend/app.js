require('dotenv').config({ path: './.env' }); // Add explicit path
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./utils/errorHandler');

// Import Routes
const instituteRoutes = require('./routes/instituteRoutes');
const studentRoutes = require('./routes/studentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Initialize App
const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/institutes', instituteRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/payments', paymentRoutes);

// Error Handling
app.use(errorHandler);

// Unhandled Routes
app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: `Can't find ${req.originalUrl} on this server!`
    });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});