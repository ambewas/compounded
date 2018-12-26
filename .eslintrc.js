module.exports = {
	"extends": [
		"@studiohyperdrive/eslint-config",
		"@studiohyperdrive/eslint-config/lib/es6.js",
    "plugin:react/recommended",
    'prettier',
    'prettier/flowtype',
    'prettier/react',
  ],
  plugins: ['prettier'],

	"parserOptions": {
		"sourceType": "module", // override the default. Within react apps, all scripts are modules.
	},
	"parser": "babel-eslint",
	"rules": {
		"react/prop-types": 1,
		"react/no-array-index-key": 1,
		"react/no-danger": 1,
		"react/no-did-mount-set-state": 1,
		"react/no-did-update-set-state": 1,
		"react/no-multi-comp": 1,
		"react/no-redundant-should-component-update": 1,
		"react/no-unused-prop-types": 1,
		"react/no-will-update-set-state": 1,
		"react/prefer-es6-class": 1,
		"react/void-dom-elements-no-children": 1,
		"react/jsx-closing-bracket-location": 1,
		"react/jsx-closing-tag-location": 1,
		"react/jsx-curly-spacing": 1,
		"react/jsx-equals-spacing": 1,
		"react/jsx-pascal-case": 1,
		"react/jsx-uses-react": 1,
		"react/jsx-uses-vars": 1,
		"react/jsx-wrap-multilines": 1,
    "no-console": ["error", { allow: ["log"] }],
    'prettier/prettier': 'error',
	}
}
