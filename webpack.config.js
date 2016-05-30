
const resolve = require('path').resolve;

module.exports = {

    entry: resolve(__dirname, './src/index.js'),
    output: {
        path: resolve(__dirname, './dist'),
        filename: 'timeseries.bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.css', 'styl']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
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
