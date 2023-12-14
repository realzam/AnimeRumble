module.exports = {
	// Type check TypeScript files
	'**/*.ts': () => 'pnpm typecheck',

	// Lint then format TypeScript and JavaScript files
	'**/*.ts': (filenames) => [
		`npx eslint --fix ${filenames.join(' ')}`,
		`npx prettier --write ${filenames.join(' ')}`,
	],
};
