const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "production",
  entry: {},
  devServer: {
    static: dist,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        path.resolve(__dirname, "static"),
        {
          from: path.resolve(__dirname, "pkg"),
          globOptions: {
            dot: false,
            gitignore: false,
            ignore: ["**/README.md", "**/package.json"],
          },
        }
      ],
    }),

    new WasmPackPlugin({
      crateDirectory: __dirname,
      extraArgs: '--no-typescript --target web --features wasm_thread/es_modules',
    }),
  ],
  experiments: {
    asyncWebAssembly: true
  },
};
