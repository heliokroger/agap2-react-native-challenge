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
          '@assets': './src/assets',
          '@api': './src/api',
          '@components': './src/components',
          '@constants': './src/constants',
          '@helpers': './src/helpers',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};
