const Product = require('../models/products');

// GET all products (no limits, all returned)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      totalProducts: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET single product by ID
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, error: 'Product not found' });

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Invalid product ID format',
      details: err.message,
    });
  }
};

// CREATE new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Error creating product',
      details: err.message,
    });
  }
};

// UPDATE product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product)
      return res.status(404).json({ success: false, error: 'Product not found' });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Error updating product',
      details: err.message,
    });
  }
};

// DELETE product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({ success: false, error: 'Product not found' });

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Error deleting product',
      details: err.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
