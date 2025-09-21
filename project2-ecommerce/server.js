require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(cors());

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the E-Commerce API 🚀');
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected via Mongoose');

    mongoose.connection.once('open', async () => {
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('📦 Collections in this DB:', collections.map(c => c.name));
    });

    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  });
