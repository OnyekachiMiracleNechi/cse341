require('dotenv').config();
const express = require('express');
const mongodb = require('./data/connect');
const contactsRoutes = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // replaces body-parser.json()

// Routes
app.use('/contacts', contactsRoutes);

// Default route (optional, for sanity check)
app.get('/', (req, res) => {
  res.send('Welcome to the Contacts API 🚀');
});

// Start server after DB connection
mongodb.initDb((err) => {
  if (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
  } else {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  }
});
