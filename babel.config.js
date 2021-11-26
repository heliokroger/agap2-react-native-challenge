module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@api': './src/api',
          '@components': './src/components',
          '@helpers': './src/helpers',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};