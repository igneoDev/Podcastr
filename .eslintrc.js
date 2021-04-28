module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // We will use TypeScript's types for component props instead
    'react/prop-types': 'off',

    // No need to import React when using Next.js
    'react/react-in-jsx-scope': 'off',

    // This rule is not compatible with Next.js's <Link /> components
    'jsx-a11y/anchor-is-valid': 'off',

    // This rule solve the problem with extensions in imported files
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    // Disallow semi-colons
    semi: ['error', 'never'],

    // Add spaces before { and after }
    'react/jsx-curly-spacing': [2, { when: 'always' }],

    // Why would you want unused vars?
    '@typescript-eslint/no-unused-vars': ['error'],

    // Solve JSX not allowed in files with extension '.tsx'
    'react/jsx-filename-extension': 'off',

    'jsx-a11y/control-has-associated-label': 'off',

    // Solve Prefer default export.
    'import/prefer-default-export': 'off',

    // Allow spread propostas
    'react/jsx-props-no-spreading': 'off',

    // I suggest this setting for requiring return types on functions only where useful
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],
  },
}
