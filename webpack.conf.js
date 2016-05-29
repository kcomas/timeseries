
const resolve = requre('path').resolve;

module.exports = {

    entry: resolve(__dirname, './src/index.js'),
    output: {
        path: resolve(__dirname, './dist'),
        filename: 'timeseries.bundle.js'
    },
    module: {
        loaders: [
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
