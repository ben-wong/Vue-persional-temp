const presets = [
  ['@babel/env',
    {
      'useBuiltIns': 'usage',
      'corejs': 3
    }
  ]
];

module.exports = {
  presets,
  plugins: [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
};
