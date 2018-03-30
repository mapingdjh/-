const gulp = require('gulp'),
      connect = require('gulp-connect'),
      imagemin = require('gulp-imagemin'),
      cache = require('gulp-cache'),                 // cache减少重复压缩图片
      path = require('../config').path;

gulp.task('image', () => {
  return gulp.src(path.src.image)
    .pipe(gulp.dest(path.dist.image))
    .pipe(connect.reload())

})

gulp.task('image_build', () => {
  return gulp.src(path.src.image)
    .pipe(imagemin())                      // 图片压缩时间比较长，使用gulp-cache减少重复压缩
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(path.dist.image))
    .pipe(connect.reload())

})