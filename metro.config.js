const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {transformer: {
    getTransformOptions: async () => ({
        transform: {
            experimentalImportSupport: false,
            inlineRequires: true,
            nonInlinedRequires: [
                "@react-native-async-storage/async-storage",
                'React',
                'react',
                'react-native',
            ],
        },
    }),
}};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
