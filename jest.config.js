module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "\\.css$": "jest-transform-css",
    },
    transformIgnorePatterns: [`/node_modules/`],
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy",
    },
};
