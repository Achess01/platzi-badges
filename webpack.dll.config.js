const path = require('path') 
const webpack = require('webpack')


module.exports = {
    entry: {
        /* Crea un módule llamado modules que contiene 
        todos los elementos del array */
        modules: [
            'react',
            'react-dom',
            'react-router-dom',            
        ]  
    },    
    output: {
        path: path.resolve(__dirname, 'dist'),        
        filename: 'js/[name].[hash].dll.js',
        library: '[name]'         
    },    
 
    plugins: [        
        new webpack.DllPlugin({
            name: '[name]',             
            path: path.join(__dirname, '[name]-manifest.json')
        })
    ],        
}