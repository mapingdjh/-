const moment = require('moment');
const version = moment().format('YYYYMMDD');
const dist = "./dist";

module.exports = {
  path: {
    src: {
      html: './src/**/**.html',
      css: './src/**/**.scss',
      js: './src/**/**.js',
      image: './src/img/**/**',
      iconfont: './src/scss/font/*.+(eot|svg|ttf|woff)',
      tpl: 'src/tpl/**/*.html' // artTemplate模板文件                            
    },
    dist: {
      html: dist + '/www',
      css:  dist + '/css',
      js:   dist + '/js',
      image:  dist + '/img',
      iconfont: dist + '/css',
      tpl: 'dist/tpl' // artTemplate模板文件  
    }
  },

  // 清空目录
  clean:{
	  src: dist
  },
  
  // 版本号
  rev:{
	revJson: dist + "/rev/**/*.json",
	src: "*.html",//root index.html
	css: dist + "/rev/css",
	js:  dist + "/rev/js",
	image:  dist + "/rev/img",
  },
  
  version: version,
  baseURL: {
    prod: '',
    test: ''
  },
  
  // 服务器配置 
  devServer: {
    root: dist,
    port: 9000,
    ip: '127.0.0.1',
    livereload: true,
    /* 代理配置 */
    proxy: {
      '/gateway/json': {
        target: '',
        changeOrigin:true
      }
    }
  }
}
