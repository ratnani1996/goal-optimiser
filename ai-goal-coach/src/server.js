import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { swaggerSpec } from './config/swagger.js';
import swaggerUi from 'swagger-ui-express';
import { goalRoutes } from './features/goals/goal.routes.js';
import { z } from 'zod';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/goals', goalRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);

    if (err instanceof z.ZodError) {
        return res.status(400).json({
            success: false,
            error: 'Validation Error',
            details: err.errors
        });
    }

    res.status(500).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
});

// Start Server
// In ESM, we can check if the current file is the main entry point
if (process.argv[1] === new URL(import.meta.url).pathname || process.argv[1].endsWith('server.js')) {
    app.listen(env.PORT, () => {
        console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });
}

export default app;
