import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const {
    OPENAI_API_KEY
} = process.env;

const envSchema = z.object({
    PORT: z.string().default('3000'),
    OPENAI_API_KEY: z.string().min(1, OPENAI_API_KEY),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export const env = envSchema.parse(process.env);
