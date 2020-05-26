const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const { CleanWebpackPlugin }=require('clean-webpack-plugin')
const webpack=require('webpack')
const { VueLoaderPlugin } = require('vue-loader');
module.exports={
  mode:'development',
  devtool:'cheap-module-eval-source-map',
  entry:{
    main:'./src/index.js'
  },
  devServer:{
    publicPath: "/",
    contentBase:'./dist',
    open:true,
    hot:true,
    hotOnly:true,
  },
  module:{
    rules:[
      {
        test:/\.(jpg|png|gif)$/,
        use:{
          loader:'url-loader',
          options:{
            name:'[name]_[hash].[ext]',
            outputPath:"images/",
            limit:5 
          }
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
          presets:[["@babel/preset-env",{
            useBuiltIns:'usage'
          }]]
        }
      },
      {
        test:/\.vue$/,
        use:'vue-loader',
      }
    ]
  },
  
  plugins:[
    new HtmlWebpackPlugin({
      //filename: 'test.html',
      template:'src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ],
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  }
}
