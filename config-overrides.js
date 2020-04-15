const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            "@font-size-base": "12px",
            "@label-color" : "#848484",
            "@input-color" : "#525254",
        }
    })
);
