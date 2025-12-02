const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const prettier = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const nPlugin = require('eslint-plugin-n');
const promisePlugin = require('eslint-plugin-promise');

module.exports = [
  {
    ignores: ['dist/**/*', 'node_modules/**/*', 'eslint.config.js', 'src/**/_template.ts'],
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  {
    files: ['src/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json',
      },
      globals: {
        // Node.js globals
        global: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        clearInterval: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        setTimeout: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  prettier,
];
