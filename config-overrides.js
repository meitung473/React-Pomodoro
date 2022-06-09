const path = require("path");

// 覆蓋 create-react-app webpack 的檔案
function resolve(dir) {
    return path.join(__dirname, ".", dir);
}

module.exports = function override(config) {
    config.resolve.alias = {
        ...config.resolve.alias,
        "@": resolve("src"),
        "@components": resolve("src/components"),
        "@routes": resolve("src/routes"),
        "@constants": resolve("src/constants"),
        "@redux": resolve("src/redux"),
        "@reducers": resolve("src/redux/reducers"),
        "@images": resolve("src/images"),
        "@pages": resolve("src/pages"),
        "@Hooks": resolve("src/Hooks"),
    };
    return config;
};
