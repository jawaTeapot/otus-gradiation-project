module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    rules: {
        'no-console': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }]
    },
    extends: ['@nuxtjs/eslint-config-typescript', '@nuxt/eslint-config']
}
