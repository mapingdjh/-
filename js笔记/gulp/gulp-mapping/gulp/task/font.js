const gulp = require('gulp');
const path = require('../config').path;
const connect = require('gulp-connect');
const rename = require('gulp-rename');               // 重命名

gulp.task('iconfont', () => {
  return gulp.src(path.src.iconfont)
    .pipe(rename({dirname: ''}))      // 加上rename可以在生成文件目录中去掉源文件所在目录
    .pipe(gulp.dest(path.dist.css))
    .pipe(connect.reload());
})
