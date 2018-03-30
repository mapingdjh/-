const gulp = require('gulp');
const ejs = require('gulp-ejs');                   //  ejs模板
const plumber = require('gulp-plumber');           //  gulp出现错误时不中断gulp程序
const connect = require('gulp-connect');           //  提供静态服务器，与http-proxy-middleware结合使用
const config = require('../config');
const path = config.path;
const version = config.version;
const baseURL = config.baseURL;

gulp.task('html', () => {

  return gulp.src([path.src.html, "!"+path.src.tpl])
    .pipe(plumber())
    .pipe(ejs({
      version: version,
      baseURL: baseURL.test
    }))
    .pipe(gulp.dest(path.dist.html))
    .pipe(connect.reload())
})

gulp.task('html_build', () => {

  return gulp.src(path.src.html)
    .pipe(ejs({
      version: version,
      baseURL: baseURL.prod
    }))
    .pipe(gulp.dest(path.dist.html))
    .pipe(connect.reload())
})