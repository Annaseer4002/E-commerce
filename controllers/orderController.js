const Order = require('../models/orderModels');

// Get all orders for a user
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const userId = req.user.id;

    const newOrder = new Order({ userId, items, total });
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create order', error });
  }
};

module.exports = { getOrders, createOrder };