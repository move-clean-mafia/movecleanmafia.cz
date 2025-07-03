import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

/**
 * @typedef {import('eslint').Linter.Config} ESLintConfig
 */

/**
 * Define ESLint configuration with TypeScript support
 * @param {ESLintConfig[]} config - ESLint flat config array
 * @returns {ESLintConfig[]}
 */
const defineConfig = (config) => config;

export default defineConfig([
  js.configs.recommended,
  {
    name: 'Client config',
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
      prettier,
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': 'error',
    },
  },
  prettierConfig,
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.output/**',
      '.nitro/**',
      '.tanstack/**',
      'coverage/**',
      '*.min.js',
      'pnpm-lock.yaml',
      'public/**',
      '.next/**',
    ],
  },
]);
