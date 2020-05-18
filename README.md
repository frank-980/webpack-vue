# Webpack

## postcss-loader
```
在webpack.config.js配置文件里加入module配置
module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader','postcss-loader']
      },
    ]
  },
另外在webpack.config.js同级目录下创建postcss.config.js
以备按需加载postcss的插件，后续只需修改该文件即可，无需修改webpack.config.js
```

### autoprefixer
```
npm run serve
```

### postcss-px-to-viewport
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
