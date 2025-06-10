const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());

const orderRoutes = require('./routes/orders'); // Import order routes



const app = express();

// Middleware
app.use(express.json());


// Routes
app.use('/api/orders', orderRoutes); // Use the orders route

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });




