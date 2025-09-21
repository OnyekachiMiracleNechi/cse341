const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: ' Contacts and Temples API',
    description: 'API documentation for contacts and temples routes',
  },
  "host": "localhost:3000",
"schemes": ["http"]

};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/temples.js', './routes/contacts.js']; // adjust if your temple routes are in another file

swaggerAutogen(outputFile, endpointsFiles, doc);
