const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../../eslint.config.js');

module.exports = [
	...baseConfig,
	...nx.configs['flat/angular'],
	...nx.configs['flat/angular-template'],
	{
		files: ['**/*.ts'],
		rules: {
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'slsUi',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'sls-ui',
					style: 'kebab-case',
				},
			],
		},
	},
	{
		files: ['**/*.ts'],
		plugins: {
			'@angular-eslint': require('@angular-eslint/eslint-plugin'),
		},
		rules: {
			'@angular-eslint/no-input-rename': 'warn',
		},
	},
	{
		files: ['**/*.html'],
		// Override or add rules here
		rules: {},
	},
];
