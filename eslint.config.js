const nx = require('@nx/eslint-plugin');
const path = require('path');

module.exports = [
	...nx.configs['flat/base'],
	...nx.configs['flat/typescript'],
	...nx.configs['flat/javascript'],
	{
		ignores: [
			'**/dist',
			'**/documentation',
			'**/eslint-rules',
			'**/jest.config.ts',
		],
	},
	{
		rules: {
			'no-console': ['error', { allow: ['warn', 'error'] }],
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		ignores: ['**/*.spec.ts'],
		rules: {
			'@typescript-eslint/explicit-function-return-type': [
				'error',
				{
					allowConciseArrowFunctionExpressionsStartingWithVoid: false,
					allowDirectConstAssertionInArrowFunctions: true,
					allowedNames: [],
					allowExpressions: true,
					allowFunctionsWithoutTypeParameters: false,
					allowHigherOrderFunctions: true,
					allowIIFEs: false,
					allowTypedFunctionExpressions: true,
				},
			],
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		rules: {
			curly: ['error', 'all'],
		},
	},
	{
		plugins: {
			'custom-rules': {
				rules: {
					'no-logic-in-subscribe': require(
						path.join(__dirname, 'eslint-rules', 'no-logic-in-subscribe'),
					),
				},
			},
		},
		rules: {
			'custom-rules/no-logic-in-subscribe': 'error',
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		rules: {
			'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
		},
	},
	{
		plugins: {
			'unused-imports': require('eslint-plugin-unused-imports'),
		},
		rules: {
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		rules: {
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
					depConstraints: [
						{
							sourceTag: 'shared',
							onlyDependOnLibsWithTags: ['shared'],
						},
						{
							sourceTag: 'mws-medical-order-ui-app',
							onlyDependOnLibsWithTags: ['shared', 'mws-medical-order-lib'],
						},
						{
							sourceTag: 'mws-medical-order-lib',
							onlyDependOnLibsWithTags: ['shared', 'mws-medical-order-lib'],
						},
					],
				},
			],
		},
	},
	{
		files: ['**/*.json'],
		rules: {
			'@nx/dependency-checks': [
				'error',
				{ ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'] },
			],
		},
		languageOptions: { parser: require('jsonc-eslint-parser') },
	},
	{
		files: ['**/*.json'],
		rules: {
			'@nx/dependency-checks': [
				'error',
				{ ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'] },
			],
		},
		languageOptions: { parser: require('jsonc-eslint-parser') },
	},
	{
		files: ['**/*.json'],
		rules: {
			'@nx/dependency-checks': [
				'error',
				{ ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'] },
			],
		},
		languageOptions: { parser: require('jsonc-eslint-parser') },
	},
	{
		files: ['**/*.json'],
		rules: {
			'@nx/dependency-checks': [
				'error',
				{ ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'] },
			],
		},
		languageOptions: { parser: require('jsonc-eslint-parser') },
	},
	{
		files: ['**/*.json'],
		rules: {
			'@nx/dependency-checks': [
				'error',
				{ ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'] },
			],
		},
		languageOptions: { parser: require('jsonc-eslint-parser') },
	},
];
