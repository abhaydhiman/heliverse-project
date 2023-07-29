const mongoose = require('mongoose');
const User = require('./models/User');

const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;

// Function to insert mock data into the desired collection
const insertMockData = async () => {
  try {
    await mongoose.connect(MONGODB_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const mockData = require('../heliverse_mock_data.json');

    await User.insertMany(mockData);

    console.log('Mock data inserted successfully.');
  } catch (error) {
    console.error('Error inserting mock data:', error);
  } finally {
    mongoose.connection.close();
  }
};

insertMockData();
