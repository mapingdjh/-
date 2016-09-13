// 模块引入
var gulp = require('gulp'),                        // gulp基础文件
    sass = require('gulp-sass')                    // sass编译
	minifycss = require('gulp-minify-css'),        // 压缩css
	rename = require('gulp-rename'),               // 重命名
	autoprefixer = require('gulp-autoprefixer'),   //添加css前缀
	browserSync = require('browser-sync'),         // 自动刷新页面
	runSequence = require('run-sequence'),         // 顺序执行代码
	jshint = require('gulp-jshint'),               // js代码检查    
	uglify = require('gulp-uglify'),               // js代码压缩
	concat = require('gulp-concat'),               // 文件合并
	imagemin = require('gulp-imagemin'),           // 图片压缩
	spritesmith = require('gulp.spritesmith'),     // 生成css精灵图
	cache = require('gulp-cache'),                 // cache减少重复压缩图片
	pngquant = require('imagemin-pngquant'),
	clean = require('gulp-clean'),                 // 清除文件目录
	del = require("del"),
	plumber = require('gulp-plumber');             // 阻止 gulp 插件发生错误导致进程退出
		
/**源文件路径以及输出文件路径设置*/	
var output =  './dist'  // 输出路径根目录
var src = {
	html  : 'src/**/*.html',
	style : [
	  'src/static/**/*.scss',
	  'src/**/*.scss'
	],
	script: [
	  'src/lib/*.js',
	  'src/js/*.js'
	],
	img   : 'src/img/**/*',
	icon  : 'src/icon/**/*',                               // css精灵路径
	font  :'src/common/sass/font/*.+(eot|svg|ttf|woff)',   // 不要生成无用的font目录和_iconfont.sass文件
};

var dist = {
	html  : output + '/www/',
	style : output + '/css/',
	script: output + '/js/',
	img   : output + '/img/',
	font  : output + '/css/',
};	
	
// html
gulp.task('html', function() {
  return gulp.src(src.html)
             .pipe(plumber())
			 // 加上rename可以在生成文件目录中去掉源文件所在目录
             .pipe(rename({dirname: ''}))      
             .pipe(gulp.dest(dist.html));
});

/* 样式 */
gulp.task("styles",function(){
	return gulp.src(src.style)                           // 源文件路径
	           .pipe(plumber({
				errorHandler: function(err) {
				  console.log(err);
				  this.emit('end');
				}
			  }))
	           .pipe(sass({ style: 'expanded'}))        // 编译sass
			   // 生成css前缀
			   .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))  
			   .pipe(rename({dirname: ''}))			
			   .pipe(gulp.dest(dist.style))  // 生成未压缩的css文件
			   .pipe(rename({ suffix: '.min' }))        // 重命名压缩的文件(注释掉可以不压缩css)
			   .pipe(minifycss())                       // 压缩css(注释掉可以不压缩css)
			   .pipe(gulp.dest(dist.style)); // 生成路径,注意--gulp.dest()在压缩前先执行一次生成未压缩的css文件，否则只有一个css压缩文件
			   
});

// 脚本
gulp.task("scripts",function(){
	return gulp.src(src.script)
               //.pipe(concat("main.js"))                 // 把所有js文件合并到一个叫"main.js文件中"
			   .pipe(plumber({
				errorHandler: function(err) {
				  console.log(err);
				  this.emit('end');
				}
			  }))
               .pipe(rename({dirname: ''}))
			   .pipe(gulp.dest(dist.script))
               .pipe(rename({ suffix: '.min' }))        // 重命名压缩的文件 (注释掉可以不压缩js)
               .pipe(uglify())                          // 压缩文件(注释掉可以不压缩js)
               .pipe(gulp.dest(dist.script));
               		   
});

// 图片
gulp.task('images', function(){
  //return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
  return gulp.src(src.img)
   .pipe(imagemin())                      // 图片压缩时间比较长，使用gulp-cache减少重复压缩
   .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
   .pipe(plumber({
		errorHandler: function(err) {
			console.log(err);
			this.emit('end');
		}
	}))
   .pipe(rename({dirname: ''}))
   .pipe(gulp.dest(dist.img));
   
});

// css精灵图
gulp.task('sprite', function () {
  var spriteData = gulp.src('src/icon/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('dist/'));
});

// 字体
gulp.task('fonts', function() {
  return gulp.src(src.font)
        .pipe(plumber({
			errorHandler: function(err) {
				console.log(err);
				this.emit('end');
			}
		}))
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(dist.font))
});

// 清理-clean: dist目录中文件
gulp.task("clean",function(){
	return gulp.src([output],{read:false})
	           .pipe(clean());
});

// 清理 del()NPM提供的插件
//gulp.task("clean",function(cb){          // 用一个回调函数（cb）确保在退出前完成任务。
	//del(["dist/css","dist/scripts","dist/img"],cb);
//});


/* 监听 .watch方法路径不要用 './xx' 
 * 用'./xx' 开头作为当前路径开始，会导致无法监测到新增文件，所以直接省略掉 './' 即可。
 * './img/*' === 'img/*'
 */
gulp.task("watch",function(){
  gulp.watch(src.html, ['html']);	
  gulp.watch(src.style, ['styles']);   // 这里[styles]指的是gulp.task("styles",function(){})中任务名称
  gulp.watch(src.script, ['scripts']);
  gulp.watch(src.img, ['images']);
  gulp.watch(src.font, ['fonts']);
});

// 自动刷新页面
gulp.task("browserSync",function(){
	browserSync({
	  server: { baseDir: ["dist","src"]},    // 需要知道根目录
	  files: [                               // 若少了这行，则找不到路径 
      "dist" + '/**'      
    ]
	})
});

// 顺序执行
gulp.task('build', function (callback) {
 runSequence('clean:dist',
    ["html",'styles', 'scripts', 'images','fonts'],
    callback
)
})

// 默人任务
gulp.task('default', ['clean'],function (callback) {
  runSequence(
	"html",
	'styles',
	"scripts",
	"images", 
	"browserSync",
	"fonts",
	'watch',
	callback
  )
});