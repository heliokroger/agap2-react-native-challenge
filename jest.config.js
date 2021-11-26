module.exports = {
  preset: 'react-native',
  moduleDirectories: ['node_modules', 'src'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons|react-native-iphone-x-helper|react-native-linear-gradient)/)',
  ],
};
