require('dotenv').config();
const express = require('express');
const mongodb = require('./data/connect');        // Contacts DB
const mongodbTemple = require('./data/connectTemple'); // Temple DB
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

// Helper function to initialize DBs using Promises
const initDatabases = async () => {
  try {
    await new Promise((resolve, reject) => {
      mongodb.initDb((err) => (err ? reject(err) : resolve()));
    });
    console.log('✅ Contacts DB connected');

    await new Promise((resolve, reject) => {
      mongodbTemple.initDb((err) => (err ? reject(err) : resolve()));
    });
    console.log('✅ Temple DB connected');

    // Start server only after both DBs are connected
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to initialize databases:', err);
    process.exit(1); // Exit if DB connection fails
  }
};

// Initialize
initDatabases();
