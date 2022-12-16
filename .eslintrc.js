module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },
  extends: ['standard-with-typescript', 'prettier'],
  ignorePatterns: ['dist/**/*'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
}
