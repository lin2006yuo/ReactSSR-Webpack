# 重零开始的React SSR + Webpack服务端渲染

## development
```bash
yarn
```
```bash
yarn run server:dev
```

### 初始化
```bash
yar init -y
```
### 安装依赖
```bash
# webpack
yarn add webpack webpack/cli html-webpack-plugin
# babel
yarn add @babel/core @babel/cli @babel/preset-env @babel/preset-react  babel-loader
# react
yarn add react react-dom
```
### 创建client、server目录
> 目录结构
```
- node_modules
- src
 - client
  - app.js
  - index.js
 - server
 - public
  - index.html
- package.json
```
### 创建react应用
```javascript
// index.js
import React from "react"
import { render } from "react-dom"
import App from "./app"

render(<App />, document.getElementById("app"))

// app.js
import React, { Component } from 'react'

class App extends Component {
  render() { 
    return ( 
      <div>My App</div>
     );
  }
}
export default App;

// index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id='app'></div>
</body>
</html>
```
### 配置webpack, 新建webpack.config.js
```javascript
const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: path.join(__dirname, "src/client/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, 'src/public/index.html')
    })
  ]
}

```
### 配置babel, 新建.babelrc
```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```  

### package.json添加script
```diff
{
  "name": "react-ssr-test",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
+  "scripts": {
+    "build": "webpack"
+  },
  "dependencies": {
    "@babel/cli": "^7.12.13",
    "@babel/core": "^7.12.13",
    "@babel/preset-env": "^7.12.13",
    "@babel/preset-react": "^7.12.13",
    "babel-loader": "^8.2.2",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "webpack": "^5.21.2",
    "webpack-cli": "^4.5.0"
  },
  "devDependencies": {
    "html-webpack-plugin": "^5.0.0"
  }
}

```  
### 开发环境配置
- 安装webpack-dev-server
```bash
yarn add webpack-dev-server -D
yarn add react-hot-loader
```
- 修改webpack.config.js
```diff
const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
+  mode: 'development',
  entry: path.join(__dirname, "src/client/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, "src/public/index.html")
    })
  ],
+  devServer: {
+    hot: true,
+    port: 8080
+  }
}

```
- 修改package.json
```diff
  "scripts": {
    "build": "webpack",
+    "dev": "webpack serve --open"
  },
```
- 修改.babelrc
```diff
  {
    "presets": ["@babel/preset-env", "@babel/preset-react"],
+    "plugins": ["react-hot-loader/babel"]
  }
```
- 修改app.js
```diff
  import React, { Component } from 'react'
+ import { hot } from "react-hot-loader/root"

  class App extends Component {
    render() { 
      return ( 
        <div>My App</div>
      );
    }
  }
- export default App;
+ export default hot(App);
```

根据上面的配置，搭建了一个简单的react + webpack应用，下面开始配置服务端渲染配置   

文档[ReactDOMServer](https://zh-hans.reactjs.org/docs/react-dom-server.html#gatsby-focus-wrapper)  


### 新增依赖
```
yarn add express
```

### 重命名webpack.config.js
```diff
- webpack.config.js
+ webpack.config.client.js
```
### 新增webpack.config.server.js
```javascript
const path = require("path")

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, "src/client/server_app.js"),
  output: {
    filename: "server_app.js",
    path: path.join(__dirname, "dist"),
    // 注意libraryTarget, 因为在server.js 是require('xxx)引用方式
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
}
```
### 修改package.json
```diff
  "scripts": {
-    "build": "webpack",
-    "dev": "webpack serve --open"
+    "client:build": "webpack --config webpack.config.client.js",
+    "client:dev": "webpack serve --open --config webpack.config.client.js",
+    "server:dev": "yarn run server:build && node src/server/index.js",
+    "server:build": "webpack --config webpack.config.server.js"
  },
```

### src/client 新增server_app.js 用于服务器读取
```javascript
import React from 'react'
import App from './app'

export default <App />
```

### 修改server/index.js文件
```javascript
const express = require('express')
const app = express()
const ReactDOMServer = require('react-dom/server')
const serverApp = require('../../dist/server_app').default

const appString = ReactDOMServer.renderToString(serverApp)

// 观察是否正确
console.log(appString)

const PORT = process.env.port || 3000
app.listen(PORT, () => console.log(`server started at ${PORT}`))
```

