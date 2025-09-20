require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const contactsRoutes = require('./routes/contacts');
const templesRoutes = require('./routes/temples');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes
app.use('/contacts', contactsRoutes);
app.use('/temples', templesRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API 🚀');
});

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: 'myDatabase',   // ← Ensure this matches your old database
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log('✅ MongoDB connected via Mongoose');

    // Debug: list all collections in this database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in this DB:', collections.map(c => c.name));

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  });
