const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Use the cors middleware to enable CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'https://heliverse-project.netlify.app']
};

app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
