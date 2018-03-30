const tmodjs  = require('gulp-tmod');
const gulp    = require('gulp');
const connect = require('gulp-connect');
const config  = require("../config").path; 
gulp.task('tmod', function(){
	return  gulp.src(config.src.tpl)
			.pipe(tmodjs({
				type: 'default',
				templateBase: 'src/tpl'
			}))
			.pipe(connect.reload())
			.pipe(gulp.dest(config.dist.tpl));
});