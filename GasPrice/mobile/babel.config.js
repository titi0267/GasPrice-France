module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          cwd: 'babelrc',
          extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
          alias: {
            '@/*': './src'
          }
        }
      ],
      "module:react-native-dotenv",
    ]
  };
};