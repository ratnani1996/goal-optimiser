import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env.js';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AI Goal Coach API',
            version: '1.0.0',
            description: 'API for AI-assisted SMART goal refinement',
        },
        servers: [
            {
                url: `http://localhost:${env.PORT}`,
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/features/goals/*.js'], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
