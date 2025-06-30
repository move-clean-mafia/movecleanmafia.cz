module.exports = {
  '*': 'prettier -uw --cache',
  '*.{ts,tsx}': [
    'eslint --cache --fix --ext .ts,.tsx .',
    () => 'tsc --noEmit --pretty',
  ],
};
