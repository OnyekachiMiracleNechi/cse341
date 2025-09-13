const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Temples API',
    description: 'API documentation for temple routes',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; // adjust if your temple routes are in another file

swaggerAutogen(outputFile, endpointsFiles, doc);
