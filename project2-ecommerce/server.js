require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// API Routes
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the E-Commerce API 🚀');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'ecommerce-api'
})
.then(async () => {
    console.log('✅ MongoDB connected via Mongoose');

    // Debug: list all collections in this database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📦 Collections in this DB:', collections.map(c => c.name));

    // Start server
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
      console.log(`📄 Swagger UI available at /api-docs`);
    });
})
.catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
});
