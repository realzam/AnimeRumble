import './src/env.mjs';

/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['lh3.googleusercontent.com', 'images.unsplash.com', 'utfs.io'],
	},
	async redirects() {
		return [
			{
				source: '/dashboard',
				destination: '/dashboard/quizzes',
				permanent: true,
			},
			{
				source: '/quizz',
				destination: '/dashboard/quizzes',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
