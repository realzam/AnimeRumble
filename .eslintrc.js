module.exports = {
	extends: [
		'next/core-web-vitals',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'prettier',
	],
	plugins: ['@typescript-eslint'],
	rules: {
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
		],
		// '@typescript-eslint/consistent-type-imports': [
		// 	'error',
		// 	{ prefer: 'type-imports', fixStyle: 'inline-type-imports' },
		// ],
		// 'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
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
