const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 */
router.get('/', productsController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by ID
 */
router.get('/:id', productsController.getSingleProduct);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 */
router.post('/', productsController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 */
router.put('/:id', productsController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 */
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
