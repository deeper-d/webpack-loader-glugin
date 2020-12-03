const path = require('path')
const MyPlugin = require('./plugin/my_plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'none',
    plugins: [
        new MyPlugin({
            template: './dist/main'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    path.resolve('loader/css-loader')
                ]
            }
        ]
    },
}
