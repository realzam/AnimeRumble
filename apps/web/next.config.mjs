import './src/env.mjs';

/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: false,
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
				source: '/dashboard',
				destination: '/dashboard/quizzes',
				permanent: true,
			},
			{
				source: '/create/quizz',
				destination: '/dashboard/quizzes',
				permanent: true,
			},
			{
				source: '/create',
				destination: '/dashboard/quizzes',
				permanent: true,
			},
			{
				source: '/play',
				destination: '/quiz',
				permanent: true,
			},
			{
				source: '/play/quiz',
				destination: '/quiz',
				permanent: true,
			},
			{
				source: '/auth',
				destination: '/auth/login',
				permanent: true,
			},
		];
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	transpilePackages: ['@madzadev/audio-player'],
};

export default nextConfig;
