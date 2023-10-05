import './src/env.mjs';

/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/dashboard',
				destination: '/dashboard/quizzes',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
