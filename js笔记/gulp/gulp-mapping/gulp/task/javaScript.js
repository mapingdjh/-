const gulp = require('gulp');
const connect = require('gulp-connect');
const plumber = require('gulp-plumber');
const path = require('../config').path;
const rename = require('gulp-rename');               // 重命名

gulp.task('js', () => {

  return gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(rename({dirname: ''}))      // 加上rename可以在生成文件目录中去掉源文件所在目录
    .pipe(connect.reload())
    .pipe(gulp.dest(path.dist.js))

})

gulp.task('js_build', () => {

  return gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(rename({dirname: ''}))      // 加上rename可以在生成文件目录中去掉源文件所在目录
    .pipe(connect.reload())
    .pipe(gulp.dest(path.dist.js))

})