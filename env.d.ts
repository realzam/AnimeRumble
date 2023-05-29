/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
	interface ProcessEnv {
		MONGO_URL: string;
		JWT_SECRET_SEED: string;
		GOOGLE_CLIENT_ID: string;
		GOOGLE_CLIENT_SECRET: string;
		GOOGLE_REDIRECT_URI: string;
		GOOGLE_REFRESH_TOKEN: string;
	}
}

declare global {
	declare module '@mui/material/Paper' {
		interface PaperPropsVariantOverrides {
			darken: true;
		}
	}
	declare module '@mui/material/styles' {
		interface TypeBackground {
			darker: string;
			appBar: string;
		}
	}
}
