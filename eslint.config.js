import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import drizzlePlugin from 'eslint-plugin-drizzle';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import securityPlugin from 'eslint-plugin-security';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 1. Global Ignores (Must be the first object)
  {
    ignores: ['**/dist/**', '**/migrations/**', '**/node_modules/**'],
  },

  // 2. Base Configuration for all TS/JS files
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // 3. Frontend (React + DaisyUI/Tailwind context)
  {
    files: ['packages/client/**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },

  // 4. Backend (Express + Drizzle)
  {
    files: ['packages/server/**/*.ts'],
    plugins: {
      security: securityPlugin,
      drizzle: drizzlePlugin,
    },
    rules: {
      ...securityPlugin.configs.recommended.rules,
      ...drizzlePlugin.configs.recommended.rules,
      'no-console': 'off',
    },
  },
  {
    files: ['packages/server/src/routes/**/*.ts', 'packages/server/src/db/seed.ts'],
    rules: {
      'drizzle/enforce-delete-with-where': 'off',
    },
  },

  // 5. Prettier (Always last to override formatting)
  prettierConfig,
);
