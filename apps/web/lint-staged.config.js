module.exports = {
	// Type check TypeScript files
	'**/*.(ts|tsx)': () => 'pnpm typecheck',

	// Lint then format TypeScript and JavaScript files
	'**/*.(ts|tsx|js)': (filenames) => [
		`npx eslint --fix ${filenames.join(' ')}`,
		`npx prettier --write ${filenames.join(' ')}`,
	],
};
