const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'cse341 project',
    description: 'BYUI Course API'
  },
  host: 'wmezadev-cs341-blog.onrender.com',
  schemes: ['https']
  /* host: 'localhost:8080',
  schemes: ['http'] */
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.ts'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
