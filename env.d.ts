/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
	interface ProcessEnv {
		MONGO_URL: string;
		JWT_SECRET_SEED: string;
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
