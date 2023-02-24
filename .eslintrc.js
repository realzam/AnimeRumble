module.exports = {
	extends: [
		'next/core-web-vitals',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],

	plugins: ['@typescript-eslint'],
	rules: {
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
	},
};
