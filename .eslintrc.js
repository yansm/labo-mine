module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "standard"
  ],
  "parser": 'babel-eslint',
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module"
  },
  "rules": {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};