const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "production",
  entry: {},
  devServer: {
    static: dist,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    },
    open: false,
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

    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080/',
      files: [
        '**/*.html',
        '**/*.wasm',
        '**/*.js',
      ],
    }),
  ],
  experiments: {
    asyncWebAssembly: true
  },
};
