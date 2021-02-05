const path = require('path') 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: {
        app: path.resolve(__dirname,'src/index.js'),                        
    },    
    output: {
        path: path.resolve(__dirname, 'dist'),        
        filename: 'js/[name].[hash].js',
        publicPath: 'http://localhost:3001/',
        chunkFilename: 'js/[id].[chunkhash].js'         
    }, 
    optimization: {
        minimizer: [new TerserJSPlugin(), 
        new OptimizeCSSAssetsPlugin()
    ]
    },
    module:{
        rules: [
            {
				test: /\.css$/,
				use: [ 
                    {
                        loader: MiniCssExtractPlugin.loader
                    },                    					
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
                    loader: 'url-loader',                
                    /* Usamos la configuración del loader */
                    options: {
                        limit : 1000,  
                        /* asignar el peso máximo que un archivo 
                        puede tener para ser transformado en base64 */
                        name: '[hash].[ext]',
                        outputPath: 'assets'                  
                    }
                }
            },                
        ]
    },
    plugins: [        
        /* Acá van todos los plugins que necesitemos.
        Se guardan como un arreglos */        
        /* Importamos webpack y luego llamamos HotModuleReplacementPlugin */
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html') ,
            // filename: path.resolve(__dirname, 'dist', 'index.html')
        }),
        new webpack.DllReferencePlugin({
            manifest: require('./modules-manifest.json')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css'
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'dist/js/*.dll.js'),
            outputPath: 'js',
            publicPath: 'http://localhost:3001/js', 
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/app.*'],
        })
    ],      
}