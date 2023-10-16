import swaggerJSDoc from 'swagger-jsdoc';
import { __dirname } from './utils.js';
export const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'ExpressO api documentation',
      description: 'This project is not about coffees or trains, it is about an E-commerce',
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

export const specs = swaggerJSDoc(swaggerOptions);
