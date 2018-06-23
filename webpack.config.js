const webpack = require('webpack');

module.exports = {
    entry: "./src/entry.js",
    output: {
        path: __dirname,
        filename: "./static/bundle.js",
        sourceMapFilename: "[file].map"
    },
    watch: true,
    devtool: "#source-map",
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.scss$/, loaders: ["style", "css", "sass"] },
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel',
              query: {
                presets: ['es2015']
              }
            }
          ]
    }
};
