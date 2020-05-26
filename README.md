# Webpack Plugins


## html-webpack-plugin
简介：自动添加.html文件 并自动写入相应依赖

```
npm i html-webpack-plugin -D
```

webpack.config.js新增以下配置

```
const HtmlWebpackPlugin=require('html-webpack-plugin');
plugins:[
    new HtmlWebpackPlugin({
      filename: 'index.html', //生成的文件名
      template:'src/index.html' //生成的文件模板，根据模板添加依赖
    }),
  ],
```

## clean-webpack-plugin

简介：打包时删除并重新生成文件

```
npm i html-webpack-plugin -D
```

webpack.config.js新增以下配置

```
const { CleanWebpackPlugin }=require('clean-webpack-plugin')
plugins:[   
    new CleanWebpackPlugin(),
  ],
```

# Webpack Loader

## babel-loader
简介：主要用于将 ECMAScript 2015+（ES6） 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

使用npm安装以下包
@babel/core是babel的核心库，最终将ES6语法转换成低级JS语法
@babel/polyfill 补充浏览器没有实现的语法
@babel/preset-env 根据开发者的配置，按需加载插件，比如node、浏览器等
```
npm i babel-loader @babel/core @babel/preset-env -D
npm i @babel/polyfill -S 
```
添加webpack.config.js的配置选项
```
entry:['babel-polyfill','./src/main.js'] /* 入口文件模块路径前，加上babel-polyfill */
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
          //@babel/preset-env默认配置
          presets:[["@babel/preset-env",{
            //只有我们项目中用到的浏览器没有实现的语法特性，在打包的时候，才会帮我们在出口文件中实现，而不是把所有的浏览器没有实现的语法特性都帮我们在出口文件中实现
            useBuiltIns:'usage' 
          }]]
        }
      },
```

## vue-loader
使用npm安装以下包
```
npm i vue-loader vue-template-compiler -D //生产环境
npm i vue -S //线上环境
```
添加webpack.config.js的配置选项
```
const { VueLoaderPlugin } = require('vue-loader');
module:{
    rules:[
      {
        test:/\.vue$/,
        use:'vue-loader',
      }
    ]
  },
  plugins:[
    new VueLoaderPlugin()
  ],
```
找到webpack中的入口文件，打开并创建vue实例
```
//index.js
import Vue from 'vue'
import App from './App.vue'  
//创建实例，把 App.vue 中的内容渲染到 index.html 中
new Vue({
  render: h => h(App)
}).$mount('#app')
```

```
//App.vue
<template>
    <p>123</p>
</template>

//index.html
<body>
  <div id="app">
  </div>
</body>
```

## vue-router

1.安装npm包

```
npm i vue-router -S
```

2.在入口文件index.js中引用router，并添加router到vue实例中

```
/*index.js*/
import router from "./router/routes.js"
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

3.在根组件添加中<router-view>标签输出router的内容

```
/*App.js*/
<template>
    <div>
        <router-view></router-view>
    </div>
</template>
```

4.在src目录下创建router文件夹，新建文件routes.js

```
/*routes.js*/
import Vue from 'vue'
import VueRouter from 'vue-router';
//引用helloworld组件
import HelloWorld from '../compiler/helloworld.vue'
Vue.use(VueRouter);
const routes=[
    {
        path:"/",
        name:"HelloWorld",
        component: HelloWorld
    }
]
//export给webpack入口文件调用
export default new VueRouter({routes})
```

5.编写组件helloworld

```
/*helloworld.vue*/
<template>
  <div>
    <h1>THIS IS A component</h1>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
}
</script>
```


## postcss-loader

安装npm包

```
npm i postcss-loader -D
```

在webpack.config.js添加配置项

```
module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader','postcss-loader']
      },
    ]
  },
```
另外在webpack.config.js同级目录下创建postcss.config.js
以备按需加载postcss的插件，后续只需修改该文件即可，无需修改webpack.config.js

### autoprefixer

简介：添加浏览器厂商前缀
安装npm包

```
npm i autoprefixer --save
```

添加postcss配置项

```
//postcss.config.js
module.exports = {
  plugins: {
    'autoprefixer':{},   
  }
  //或者数组的形式
  //plugins: [
  //  require("autoprefixer)   
  //]
};
```

### postcss-px-to-viewport

简介：px单位转成vw单位
安装npm包

```
npm i postcss-px-to-viewport --save
```

添加postcss配置项

```
//postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      // viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 2, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false // 允许在媒体查询中转换`px`
    },
  }
};
```

### postcss-import

简介：允许import方式引入css文件 //@import "index.css" 
安装npm包

```
npm i postcss-import --save
```

添加postcss的配置项

```
//postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
  }
};
```

//babel-preset-env参考https://www.cnblogs.com/chyingp/archive/2018/06/05/9137849.html