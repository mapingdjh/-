const gulp = require('gulp');
const clean = require('gulp-clean');
const runSequence = require('gulp-run-sequence');


gulp.task('dev', () => {
  runSequence('clean', 'tmod', 'html', 'js', 'css', 'image', 'iconfont', 'connect', 'watch');
})

gulp.task('build', () => {
  runSequence('clean', 'tmod', 'html_build', 'js_build', 'css_build', 'image_build', 'iconfont', 'connect', 'watch_build');
})