module.exports = {
  'env': {
    'browser': true, 'es2021': true
  }, 'plugins': [ 'cypress', '@stylistic/js' ], 'extends': 'plugin:cypress/recommended', 'overrides': [ {
    'env': {
      'node': true
    }, 'files': [ '.eslintrc.{js,cjs}' ], 'parserOptions': {
      'sourceType': 'script'
    }
  } ], 'parserOptions': {
    'ecmaVersion': 'latest', 'sourceType': 'module'
  }, 'rules': {
    // Eslint
    'camelcase': [ 'error', { properties: 'never' } ],
    'no-unused-vars': 'error',

    // Cypress rules
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/unsafe-to-chain-command': 'error',
    'cypress/no-force': 'warn',
    'cypress/no-async-tests': 'error',
    'cypress/no-pause': 'error',

    // Stylistic rules
    '@stylistic/js/indent': [ 'error', 2, { 'SwitchCase': 1 } ],
    '@stylistic/js/no-trailing-spaces': 'error',
    '@stylistic/js/no-multi-spaces': 'error',
    '@stylistic/js/no-whitespace-before-property': 'error',
    '@stylistic/js/object-curly-spacing': [ 'error', 'always' ],
    '@stylistic/js/array-bracket-spacing': [ 'error', 'always', { 'objectsInArrays': false, 'arraysInArrays': false } ],
    '@stylistic/js/arrow-spacing': 'error',
    '@stylistic/js/block-spacing': 'error',
    '@stylistic/js/comma-spacing': [ 'error', { 'before': false, 'after': true } ],
    '@stylistic/js/semi-spacing': 'error',
    '@stylistic/js/rest-spread-spacing': [ 'error', 'never' ],
    '@stylistic/js/spaced-comment': [ 'error', 'always' ],
    '@stylistic/js/template-curly-spacing': [ 'error', 'always' ],
    '@stylistic/js/no-extra-semi': 'error',
    '@stylistic/js/dot-location': [ 'error', 'property' ],
    '@stylistic/js/no-mixed-operators': 'error',
    '@stylistic/js/space-unary-ops': 'error'
  }
};