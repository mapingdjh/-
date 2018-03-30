/** 清空构建后的内容 */
const gulp = require('gulp');
const clean = require('gulp-clean');
const config = require('../config').clean;

gulp.task("clean", function(){
	return gulp.src(config.src)
		.pipe(clean());
})