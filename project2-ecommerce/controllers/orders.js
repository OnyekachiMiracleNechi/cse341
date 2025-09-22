const Order = require('../models/orders');

// GET all orders (no limits, all returned)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product');

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      totalOrders: orders.length,
      data: orders,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET single order by ID
const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product');
    if (!order)
      return res.status(404).json({ success: false, error: 'Order not found' });

    res.status(200).json({
      success: true,
      message: 'Order retrieved successfully',
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Invalid order ID format',
      details: err.message,
    });
  }
};

// CREATE new order
const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Error creating order',
      details: err.message,
    });
  }
};

// UPDATE order
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('products.product');

    if (!order)
      return res.status(404).json({ success: false, error: 'Order not found' });

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Error updating order',
      details: err.message,
    });
  }
};

// DELETE order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order)
      return res.status(404).json({ success: false, error: 'Order not found' });

    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Error deleting order',
      details: err.message,
    });
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
