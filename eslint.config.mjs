export default [
    {
        files: ['src/**/*.js'],
        ignores: ['**/*.config.js'],
        rules: {
            semi: 'error',
            'prefer-const': 'error',
            'no-unused-vars': 'error',
            'no-var': 'error',
            'no-console': 'error',
        },
    },
];
