const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-Commerce API',
    description: 'API documentation for Users, Products, and Orders',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/users.js',
  './routes/products.js',
  './routes/orders.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc)
 
