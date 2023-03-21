/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,

  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
  },

  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],

  globals: {
    process: true,
  },

  plugins: ['vue', '@typescript-eslint'],

  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-useless-constructor': 'off',
    'linebreak-style': ['error', 'unix'],
    'object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: 'expression', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block' },
      { blankLine: 'always', prev: 'block', next: '*' },
      { blankLine: 'any', prev: 'cjs-import', next: 'cjs-import' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      { blankLine: 'always', prev: '*', next: 'export' },
      { blankLine: 'always', prev: 'export', next: '*' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'try', next: '*' },
    ],
    '@typescript-eslint/padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'type' },
      { blankLine: 'always', prev: 'type', next: '*' },
    ],

    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
      },
    ],

    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', { ignores: [] }],
    'vue/v-on-event-hyphenation': ['error', 'always', { ignore: ['update:modelValue'] }],
    'vue/padding-line-between-blocks': ['warn', 'always'],

    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],

    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
}
