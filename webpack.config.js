const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const { CleanWebpackPlugin }=require('clean-webpack-plugin')
const webpack=require('webpack')
module.exports={
  mode:'development',
  devtool:'cheap-module-eval-source-map',
  entry:{
    main:'./src/index.js'
  },
  devServer:{
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
            limit:20480
          }
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader','postcss-loader']
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
          presets:["@babel/preset-env"]
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  }
}
