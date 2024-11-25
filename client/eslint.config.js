module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    
    plugins: [
      'react',
      'react-hooks',
    ],
    rules: {
      'react-hooks/rules-of-hooks': 'error', // Ensures correct usage of hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    },
    
        languageOptions: {
            globals: {
                Promise: "off"
            }
        }
    ,
    
        rules: {
            "no-unused-vars": "warn"
        }
    
  };
  