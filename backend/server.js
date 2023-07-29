const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const itemsRouter = require('./routes/items');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Use the cors middleware to enable CORS
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/items', itemsRouter);
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
