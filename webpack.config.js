const path = require('path')

module.exports = {
	mode: 'development',
	entry: ['./src/main.js'],
	output: {
    		path: path.join(__dirname,'dist'),
    		filename: 'bundle.js',
  	},
  	devtool: 'eval-source-map',
	module: {
		rules: [
		{
			test: /\.vue$/,
			use: 'vue-loader'
		},
        {
            test:/.js$/,
            exclude: path.join(__dirname, 'node_modules'),
            use: 'babel-loader'
        }]
	},
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [

    ]
}