module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // `react-native-worklets/plugin` must be listed LAST.
    // Required for react-native-reanimated v4's worklet macros
    // (useSharedValue, useAnimatedStyle, withTiming, etc.).
    plugins: ["react-native-worklets/plugin"],
  };
};
