const express = require('express');
const router = express.Router();
const templeController = require('../controllers/temples');

/**
 * @swagger
 * /temples:
 *   get:
 *     summary: Get all temples
 *     responses:
 *       200:
 *         description: A list of temples
 */
router.get('/', templeController.getAllTemples);

/**
 * @swagger
 * /temples/{id}:
 *   get:
 *     summary: Get a temple by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Temple details
 */
router.get('/:id', templeController.getTempleById);

/**
 * @swagger
 * /temples:
 *   post:
 *     summary: Create a new temple
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               dedicated:
 *                 type: string
 *               area:
 *                 type: string
 *     responses:
 *       201:
 *         description: Temple created
 */
router.post('/', templeController.createTemple);

/**
 * @swagger
 * /temples/{id}:
 *   put:
 *     summary: Update a temple
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
 *             type: object
 *     responses:
 *       204:
 *         description: Temple updated
 */
router.put('/:id', templeController.updateTemple);

/**
 * @swagger
 * /temples/{id}:
 *   delete:
 *     summary: Delete a temple
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Temple deleted
 */
router.delete('/:id', templeController.deleteTemple);

module.exports = router;
