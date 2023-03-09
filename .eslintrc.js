module.exports = {
	extends: [
		'next/core-web-vitals',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'prettier',
	],
	plugins: ['@typescript-eslint'],
	rules: {
		'import/named': 'off',
		'eol-last': ['error', 'always'],
		'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
		'import/order': [
			'error',
			{
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				distinctGroup: false,
				'newlines-between': 'always',
				pathGroups: [
					{
						pattern: 'react',
						group: 'builtin',
						position: 'before',
					},
					{
						pattern: 'next/**',
						group: 'builtin',
						position: 'before',
					},
					{
						pattern: '@/**',
						group: 'internal',
						position: 'before',
					},
				],
				pathGroupsExcludedImportTypes: ['react', 'next'],
			},
		],
	},
};
