// server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser middleware

// Routes
app.use('/api/auth', authRoutes);

// Example of a protected route
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
