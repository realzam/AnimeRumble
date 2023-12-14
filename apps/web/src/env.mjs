import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		AGUA: z.string().min(1),
		FUEGO: z.string().min(1),
		PASS_KEY: z.string().min(1),

		NEXTAUTH_URL: z.string().min(1),
		NEXTAUTH_SECRET: z.string().min(1),
		GOOGLE_CLIENT_ID: z.string().min(1),
		GOOGLE_CLIENT_SECRET: z.string().min(1),

		UPLOADTHING_SECRET: z.string().min(1),
		UPLOADTHING_APP_ID: z.string().min(1),

		DATABASE_HOST: z.string().min(1),
		DATABASE_USERNAME: z.string().min(1),
		DATABASE_PASSWORD: z.string().min(1),
		OPENAI_API_KEY: z.string().min(1),

		SECRET_JWT_SOCKET: z.string().min(1),
	},
	client: {
		//  NEXT_SOCKET_URL: z.string().min(1),
	},

	// For Next.js >= 13.4.4, you only need to destructure client variables:
	// experimental__runtimeEnv: {
	//   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
	// }
});
