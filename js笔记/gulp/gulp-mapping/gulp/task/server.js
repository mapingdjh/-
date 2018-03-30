const gulp = require('gulp');
const connect = require('gulp-connect');
const proxy = require('http-proxy-middleware');        // 中间件

const serverConfig = require('../config').devServer;
const proxyConfig = serverConfig.proxy;

delete serverConfig.proxy;

let proxyArray;

if(proxyConfig) {
  proxyArray = Object.keys(proxyConfig).map(url => {
    const config = proxyConfig[url];
    return proxy(url, config);
  })
  serverConfig.middleware = (connect, opt) => {
    return [...proxyArray];
  }
}

gulp.task('connect', () => {
  connect.server(serverConfig);
})