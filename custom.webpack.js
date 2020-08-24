module.exports = {
  externals: {
    sqlite3: "commonjs sqlite3",
    knex: "commonjs knex",
  },
  module: {
    rules: [
      {
        test: /\.js,.jsx,.ts,.tsx/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
    ],
  },
};
