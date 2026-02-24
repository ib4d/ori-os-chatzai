import { z } from 'zod';

export const EnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: z.string().url(),
    PORT: z.string().transform(Number).default('4000'),
    JWT_SECRET: z.string().min(32),
    REDIS_URL: z.string().url().optional(),

    // Storage
    MINIO_ENDPOINT: z.string().optional(),
    MINIO_ROOT_USER: z.string().optional(),
    MINIO_ROOT_PASSWORD: z.string().optional(),

    // Search
    MEILISEARCH_HOST: z.string().optional(),
    MEILISEARCH_KEY: z.string().optional(),

    // Billing
    STRIPE_SECRET_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),

    // Observability
    SENTRY_DSN: z.string().url().optional(),
});

export type Env = z.infer<typeof EnvSchema>;

export const validateEnv = (config: Record<string, unknown>) => {
    const result = EnvSchema.safeParse(config);

    if (!result.success) {
        console.error('❌ Invalid environment variables:', result.error.flatten().fieldErrors);
        throw new Error('Invalid environment variables');
    }

    return result.data;
};
