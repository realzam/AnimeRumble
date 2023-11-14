import './src/env.mjs';

/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.googleusercontent.com',
			},

			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'utfs.io',
			},
		],
	},
	async redirects() {
		return [
			{
				source: '/admin/dashboard',
				destination: '/admin/dashboard/quizzes',
				permanent: true,
			},
			{
				source: '/admin/quizz',
				destination: '/admin/dashboard/quizzes',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
