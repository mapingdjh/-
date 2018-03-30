const gulp = require('gulp');
const path = require('../config').path;
const watch = require('gulp-watch');

// gulp.task('watch', () => {
//   watch(path.src.image, () => {
//     gulp.start('image');
//   })
//   watch(path.src.css, () => {
//     gulp.start('css');
//   })
//   watch(path.src.js, () => {
//     gulp.start('js');
//   })
//   watch(path.src.html, () => {
//     gulp.start('html');
//   })
//   watch(path.src.iconfont, () => {
//     gulp.start('iconfont');
//   })
// })



// gulp.task('watch_build', () => {
//   watch(path.src.image, () => {
//     gulp.start('image_build');
//   })
//   watch(path.src.css, () => {
//     gulp.start('css_build');
//   })
//   watch(path.src.js, () => {
//     gulp.start('js_build');
//   })
//   watch(path.src.html, () => {
//     gulp.start('html_build');
//   })
//   watch(path.src.iconfont, () => {
//     gulp.start('iconfont_build');
//   })
// })


// 第二种监听方法
gulp.task("watch",function(){
  gulp.watch(path.src.html, ['html']);	
  gulp.watch(path.src.css, ['css']);                 // 这里[styles]指的是gulp.task("styles",function(){})中任务名称
  gulp.watch(path.src.js, ['js']);
  gulp.watch(path.src.image, ['image']);
  gulp.watch(path.src.iconfont, ['iconfont']);
  gulp.watch(path.src.tpl, ['tmod']);                // 监听artTemplate文件
});


gulp.task("watch_build",function(){
  gulp.watch(path.src.html, ['html_build']);	
  gulp.watch(path.src.css, ['css_build']);           // 这里[styles]指的是gulp.task("styles",function(){})中任务名称
  gulp.watch(path.src.js, ['js_build']);
  gulp.watch(path.src.image, ['image_build']);
  gulp.watch(path.src.iconfont, ['iconfont']);
  gulp.watch(path.src.tpl, ['tmod']);                 // 监听artTemplate文件
});