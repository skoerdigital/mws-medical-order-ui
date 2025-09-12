module.exports = {
	importOrderParserPlugins: ['typescript', 'decorators-legacy'],
	plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
	importOrder: [
		'^@angular/.*$',
		'^(?!@angular)(?!@sls-ui/)[a-z].*$',
		'^@sls-ui/.*$',
		'^(\\.|\\.\\./)',
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	singleQuote: true,
	useTabs: true,
	bracketSpacing: true,
};
