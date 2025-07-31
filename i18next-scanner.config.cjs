module.exports = {
  input: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    // Exclude node_modules and build directories
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/dist/**',
    '!**/build/**',
  ],
  output: './',
  options: {
    debug: true,
    removeUnusedKeys: false, // Changed to false to prevent automatic removal
    sort: true,
    func: {
      list: ['t', 'i18next.t', 'i18n.t'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      fallbackKey: function (ns, value) {
        return value;
      },
    },
    lngs: ['en', 'cs', 'ua'],
    ns: ['common'],
    defaultLng: 'en',
    defaultNs: 'common',
    defaultValue: '',
    resource: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
      savePath: 'locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false,
    keySeparator: '.', // Changed to '.' to preserve nested structure
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
};
