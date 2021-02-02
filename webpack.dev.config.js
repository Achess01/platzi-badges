const path = require('path') 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        app: path.resolve(__dirname,'src/index.js'),                        
    },    
    output: {
        path: path.resolve(__dirname, 'dist'),        
        filename: 'js/[name].js',
        publicPath: 'http://localhost:9000/',
        chunkFilename: 'js/[id].[chunkhash].js'         
    },    
    module:{
        rules: [
            {
				test: /\.css$/,
				use: [ 
                    'style-loader',
                    'css-loader'
					]
			},
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
                use: {
                    loader: 'file-loader',                
                    /* Usamos la configuración del loader */
                    options: {
                        outputPath: 'assets/'  
                        /* asignar el peso máximo que un archivo 
                        puede tener para ser transformado en base64 */

                    }
                }
            },              
        ]
    },
    devServer:{
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        port: 9000,
        hot: true,
    },
    plugins: [        
        /* Acá van todos los plugins que necesitemos.
        Se guardan como un arreglos */
        new webpack.HotModuleReplacementPlugin(),
        /* Importamos webpack y luego llamamos HotModuleReplacementPlugin */
        new HtmlWebpackPlugin({             
            template: path.resolve(__dirname, 'public/index.html'),            
        }),     
    ],      
}