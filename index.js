const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const orderRoutes = require('./routes/orders'); // Import order routes
const sign = require('jsonwebtoken/sign');
const { handleCreateProduct, handleFindAllProducts, handleUpdateProduct } = require('./controllers/productControllers');
const { SignUp, login } = require('./controllers/AuthControllers'); // Corrected import
const { authenticateUser } = require('./middleware/auth');
const { getOrders, createOrder } = require('./controllers/orderController');




const app = express();

// Middleware
app.use(express.json());


// Routes
app.use('/api/orders', orderRoutes); // Use the orders route

app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API!');
});

const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });




app.post('/sign-up', SignUp);

app.post ('/login', login)


app.post('/create-product', handleCreateProduct)

app.get('/all-products', handleFindAllProducts)

app.post('/update-product', handleUpdateProduct)


app.get('/allUser-orders', authenticateUser, getOrders)

app.post('/create-orders', authenticateUser, createOrder)



