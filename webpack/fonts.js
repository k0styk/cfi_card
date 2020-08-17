//  Install this:
//  npm i -D file-loader
//
module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /fontA[\\\/].+\.(eot|svg|ttf|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name][hash:6].[ext]'
            }
          },
        },
      ],
    },
  };
};