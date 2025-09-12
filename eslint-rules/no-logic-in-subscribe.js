module.exports = {
	meta: {
		type: 'suggestion',
		docs: {
			description:
				'Do not place logic inside the subscribe function callback. Move the logic to operators like tap().',
			category: 'Best Practices',
			recommended: false,
		},
		messages: {
			noLogicInSubscribe:
				'Avoid placing logic inside the subscribe callback. Move the logic to operators like tap().',
		},
		schema: [], // no configuration options
	},
	create(context) {
		// Helper function to check if the call is to the subscribe method
		function isSubscribeCall(node) {
			return (
				node &&
				node.type === 'CallExpression' &&
				node.callee &&
				node.callee.type === 'MemberExpression' &&
				!node.callee.computed &&
				node.callee.property &&
				node.callee.property.type === 'Identifier' &&
				node.callee.property.name === 'subscribe'
			);
		}

		return {
			CallExpression(node) {
				if (isSubscribeCall(node)) {
					// Get the first argument passed to subscribe
					const firstArg = node.arguments[0];

					// Check if it is a function (arrow or function expression)
					if (
						firstArg &&
						(firstArg.type === 'FunctionExpression' ||
							firstArg.type === 'ArrowFunctionExpression')
					) {
						// If the function body is a block (i.e., surrounded by braces)
						if (firstArg.body.type === 'BlockStatement') {
							// If there is more than one statement in the block, we consider it "logic"
							if (firstArg.body.body.length > 1) {
								context.report({
									node: firstArg,
									messageId: 'noLogicInSubscribe',
								});
							} else if (firstArg.body.body.length === 1) {
								// If there is one statement, check if it is a simple function call
								const stmt = firstArg.body.body[0];
								if (
									!(
										stmt.type === 'ExpressionStatement' &&
										stmt.expression.type === 'CallExpression' &&
										stmt.expression.callee.type === 'Identifier'
									)
								) {
									context.report({
										node: firstArg,
										messageId: 'noLogicInSubscribe',
									});
								}
							}
						} else {
							// For functions with a concise body (single expression)
							if (
								!(
									firstArg.body.type === 'CallExpression' &&
									firstArg.body.callee.type === 'Identifier'
								)
							) {
								context.report({
									node: firstArg,
									messageId: 'noLogicInSubscribe',
								});
							}
						}
					}
				}
			},
		};
	},
};
