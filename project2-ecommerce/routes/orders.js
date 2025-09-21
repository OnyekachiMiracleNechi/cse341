const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 */
router.get('/', ordersController.getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get a single order by ID
 */
router.get('/:id', ordersController.getSingleOrder);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 */
router.post('/', ordersController.createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order
 */
router.put('/:id', ordersController.updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 */
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
