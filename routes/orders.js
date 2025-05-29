const express = require('express');
const router = express.Router();
const { getOrders, createOrder } = require('../controllers/orderController');
const { authenticateUser } = require('../middleware/auth'); // Middleware for authentication

// GET /api/orders - Get all orders for the logged-in user
router.get('/', authenticateUser, getOrders);

// POST /api/orders - Create a new order
router.post('/', authenticateUser, createOrder);

module.exports = router;