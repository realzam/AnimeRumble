import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		AGUA: z.string().min(1),
		FUEGO: z.string().min(1),
		PASS_KEY: z.string().min(1),
	},
	runtimeEnv: {
		AGUA: process.env.AGUA,
		FUEGO: process.env.FUEGO,
		PASS_KEY: process.env.PASS_KEY,
	},
});
