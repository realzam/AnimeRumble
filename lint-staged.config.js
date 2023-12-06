module.exports = {
  // Type check TypeScript files
  "apps/www/**/*.(ts|tsx)": () => "npx tsc --noEmit",

  // Lint then format TypeScript and JavaScript files
  "apps/www/**/*.(ts|tsx|js)": (filenames) => [
    `npx eslint --fix -c apps/www/.eslintrc.json ${filenames.join(" ")}`,
    `npx prettier --write  --config apps/www/.prettierrc${filenames.join(" ")}`,
  ],
};
