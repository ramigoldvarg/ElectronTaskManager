const path = require('path')

module.exports = env => {
	return {
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
            test:/\.js$/,
            exclude: path.join(__dirname, 'node_modules'),
            use: 'babel-loader'
		},
		{
			test: /\.(png|jpg|gif)$/,
			use: {
				loader: 'file-loader',
				options: {
					name (file) {
						console.log('[path][name].[ext] [file]',)
						if (env.NODE_ENV === 'development') {
							return '[path][name].[ext]'
						}

						return '[hash].[ext]'
					}
				}
			}
		}
	]
	},
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [

	]
}
}