module.exports = {
  extends: [
    '@open-wc/eslint-config'
  ].map(require.resolve),
  plugins: ['lit'],
  rules: {
    'import/no-unresolved': 'off',
    'class-methods-use-this': 'off',
    'lit/no-duplicate-template-bindings': 'error',
    'lit/no-legacy-template-syntax': 'error',
    'lit/no-template-bind': 'error',
    'lit/no-template-map': 'off',
    'lit/no-useless-template-literals': 'error',
    'lit/attribute-value-entities': 'error',
    'lit/binding-positions': 'error',
    'lit/no-property-change-update': 'error',
    'lit/no-invalid-html': 'error',
  }
};
