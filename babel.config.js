module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            // Put the router plugin here…
            require.resolve('expo-router/babel'),

            // …and make sure Reanimated stays LAST if you use it
            'react-native-reanimated/plugin',
        ],
    };
};
