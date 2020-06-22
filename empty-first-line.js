
// https://eslint.org/docs/developer-guide/working-with-rules
// https://github.com/eslint/eslint/blob/master/lib/rules/eol-last.js
module.exports = {
    meta: {
        type: 'layout',

        docs: {
            description: 'require or disallow newline at the begining of files',
            category: 'Stylistic Issues',
            recommended: false,
        },

        fixable: 'whitespace',

        schema: [{
            // TODO: handle never option
            enum: [ 'always', 'never' ],
        }],
    },

    create(context) {
        const sourceCode = context.getSourceCode();
        const firstLine = sourceCode.lines[0];
        return {
            Program(node) {
                if (firstLine.trim()) {
                    context.report({
                        node,
                        message: 'Newline required at begining of file but not found.',
                        fix(fixer) {
                            return fixer.insertTextAfterRange([ 0, 0 ], '\n');
                        },
                    });
                }
            },
        };
    },
};
