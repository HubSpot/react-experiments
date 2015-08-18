module.exports = {
  entry: './index.js',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
    ]
  },
  output: {
    filename: 'dist/react-experiments.js',
    libraryTarget: 'umd'
  },
  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ]
}
