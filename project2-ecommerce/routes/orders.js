const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - customerName
 *         - email
 *         - products
 *         - totalAmount
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated order ID
 *         customerName:
 *           type: string
 *           description: Name of the customer
 *         email:
 *           type: string
 *           description: Customer email
 *         products:
 *           type: array
 *           description: List of products in the order
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product ID (references Product collection)
 *               quantity:
 *                 type: number
 *                 description: Quantity ordered
 *         totalAmount:
 *           type: number
 *           description: Total amount of the order
 *         status:
 *           type: string
 *           enum: [pending, paid, shipped, delivered, cancelled]
 *           description: Order status
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: 6510f1c4123abc456d789ef2
 *         customerName: John Doe
 *         email: john@example.com
 *         products:
 *           - product: 6510f1c4123abc456d789ef1
 *             quantity: 2
 *           - product: 6510f1c4123abc456d789ef3
 *             quantity: 1
 *         totalAmount: 75.50
 *         status: pending
 *         createdAt: 2025-09-22T12:10:00.000Z
 *         updatedAt: 2025-09-22T12:10:00.000Z
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/', ordersController.getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */
router.get('/:id', ordersController.getSingleOrder);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error
 */
router.post('/', ordersController.createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated
 *       400:
 *         description: Invalid ID or data
 *       404:
 *         description: Order not found
 */
router.put('/:id', ordersController.updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted
 *       404:
 *         description: Order not found
 */
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
