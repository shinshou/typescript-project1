const path = require("path");
module.exports = {
  mode: "development",
  //エントリーポイントの設定。このプロジェクトがどこから起動されるか。
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js", //最終的に出力されるファイル名
    path: path.resolve(__dirname, "dist"), //出力先のフォルダ名。tsconfig.jsのoutDirと同じフォルダ名を指定する必要がある。
    publicPath: "/dist",
  },
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, "dist"),
        publicPath: "/dist",
      },
      {
        directory: __dirname,
        publicPath: "/",
      },
    ],
  },
  devtool: "eval",
  //エントリーポイントから取得したインポート情報をどのような処理を通すかの設定
  module: {
    //処理ルールの設定
    rules: [
      {
        test: /\.ts$/, //処理をするファイル名の指定。.ts拡張子のファイル全てに処理を適用。
        use: "ts-loader", //適用する処理を設定。
        exclude: /node_modules/, //処理から除外するファイルを指定。
      },
    ],
  },
  //インポートしたモジュールをどのように解決するかの指定
  resolve: {
    extensions: [".ts", ".js"],
  },
};
