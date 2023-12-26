module.exports = {
	// Lint then format TypeScript and JavaScript files
	'**/*.(ts|tsx|js)': (filenames) => [
		`npx eslint --fix ${filenames.join(' ')}`,
		`npx prettier --write ${filenames.join(' ')}`,
	],
};
