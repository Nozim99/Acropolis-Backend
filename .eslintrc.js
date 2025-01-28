module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    env: {
        node: true,
        es2022: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
        'no-console': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
    },
};