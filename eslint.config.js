import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import nextPlugin from '@next/eslint-plugin-next';

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
      '@next/next': nextPlugin,
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
      // Next.js specific rules - verified working rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-unwanted-polyfillio': 'error',
      '@next/next/no-page-custom-font': 'error',
      '@next/next/no-css-tags': 'error',
      '@next/next/no-head-element': 'error',
      '@next/next/no-title-in-document-head': 'error',
      '@next/next/no-typos': 'error',
      '@next/next/no-duplicate-head': 'error',
      '@next/next/no-before-interactive-script-outside-document': 'error',
      '@next/next/no-script-component-in-head': 'error',
      '@next/next/no-styled-jsx-in-document': 'error',
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
