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
 *         - userId
 *         - productIds
 *         - totalAmount
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the order
 *         userId:
 *           type: string
 *           description: The ID of the user who placed the order
 *         productIds:
 *           type: array
 *           items:
 *             type: string
 *           description: List of product IDs in the order
 *         totalAmount:
 *           type: number
 *           description: Total price of the order
 *         status:
 *           type: string
 *           description: Status of the order (e.g., pending, shipped, delivered)
 *       example:
 *         _id: 650f9a4c123abc789d456ef0
 *         userId: 650f9a4c123abc789d456ef1
 *         productIds: ["650f9a4c123abc789d456ef2", "650f9a4c123abc789d456ef3"]
 *         totalAmount: 99.99
 *         status: pending
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
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
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The order data
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
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
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
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Bad request
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
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
