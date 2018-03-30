const gulp = require('gulp');
const sass = require('gulp-sass');
const minCss = require('gulp-clean-css');             // 压缩css
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');
const path = require('../config').path;
const rename = require('gulp-rename');                          // 重命名
const cssver = require('gulp-make-css-url-version-extend');     // css文件中url添加版本号

gulp.task('css', () => {

  return gulp.src(path.src.css)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 20 version', 'chrome 4'],
      cascade: false
    }))
    .pipe(rename({dirname: ''}))      // 加上rename可以在生成文件目录中去掉源文件所在目录
    .pipe(cssver())                   //给css文件里引用文件加版本号（文件MD5）
    .pipe(gulp.dest(path.dist.css))
    .pipe(connect.reload())

})

gulp.task('css_build', () => {

  return gulp.src(path.src.css)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 20 version','chrome 4'],
      cascade: false
    }))
    .pipe(rename({dirname: ''}))      // 加上rename可以在生成文件目录中去掉源文件所在目录
    .pipe(cssver())                   //给css文件里引用文件加版本号（文件MD5）
    .pipe(minCss())                   // 压缩css
    .pipe(gulp.dest(path.dist.css))
    .pipe(connect.reload())
})