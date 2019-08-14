module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018
    },
    'rules': {
        "quotes": ["warn", "single"],
        "semi": ["warn", "never"],
        "block-spacing": "warn",
        "brace-style": ["warn", "1tbs", { "allowSingleLine": true }],
        "object-curly-spacing": ["warn", "always"],
        "eol-last": ["warn", "always"],
        "indent": ["warn", 4],
        "no-console": "warn",
        "no-debugger": "warn",
        "no-eval": "error",
        "no-trailing-spaces": ["warn", { "ignoreComments": true }],
        "no-unused-vars": "warn",
        "no-multiple-empty-lines": ["warn", { "max": 1 }],
    }
}