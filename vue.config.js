// vue.config.js
const ansiRegex = require('ansi-regex')

// const fs = require('fs')
const path = require('path')

module.exports = 
{
   transpileDependencies: ['@ibsheet/loader', ansiRegex],
    // VUE Build 경로 설정
    outputDir: path.resolve(
      __dirname,
      process.env.VUE_APP_PHYSICAL_PATH ? process.env.VUE_APP_PHYSICAL_PATH : "C:/SEOWON/HEC/DES/workspace/able-base-boot-starter/src/main/resources/static"
      // ""
    ),
   //  transpileDependencies: [],
   devServer: {
      overlay: true,
      disableHostCheck: true,
      proxy: {
        '/sendApi':{
          "target": process.env.VUE_APP_SERVER_IP ? `${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}`  : 'http://localhost:8080',
          //"target": 'http://localhost:8080',
          "pathRewrite":{'^/sendApi':''},
          "changeOrigin":true,
          "secure":false
        }
      },
      port: process.env.VUE_APP_PORT || 80
    },
    configureWebpack: {
      resolve: {
        alias: {
          "@": path.join(__dirname, 'src'),
          "@public": path.join(__dirname, 'public'),
          "@assets": path.join(__dirname, 'src', 'assets'),
          "@plugin": path.join(__dirname, 'src', 'plugin'),
          "@component": path.join(__dirname, 'src', 'component'),
          "@modal": path.join(__dirname, 'src', 'modal'),
          "@material": path.join(__dirname, 'src', 'pages', 'quality', 'materialMngt'),
        }
      }
    },
    lintOnSave: false,
    publicPath: '/'
}



