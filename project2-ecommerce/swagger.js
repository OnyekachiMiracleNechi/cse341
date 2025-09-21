const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-Commerce API',
    description: 'API documentation for Users, Products, and Orders',
  },
  host: 'cse341-b1m1.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/users.js',
  './routes/products.js',
  './routes/orders.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('✅ Swagger documentation generated successfully for all routes!');
  })
  .catch((err) => {
    console.error('❌ Error generating Swagger docs:', err);
  });
