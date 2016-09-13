var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),                // html 压缩
    sass = require('gulp-ruby-sass'),                 // sass编译
    autoprefixer = require('gulp-autoprefixer'),      // css前缀补全
    minifyCss = require('gulp-minify-css'), 		  // css压缩
    concat = require('gulp-concat'),                  // 合并文件
	rename = require('gulp-rename'),                  // 重命名
    cache = require('gulp-cache'),                    // 处理图片缓存
    imagemin = require('gulp-imagemin'),              // 图片压缩
    webpack = require('gulp-webpack'),                // webpack CommonJS
    uglify = require('gulp-uglify'),                  // 压缩混淆js
    del = require('del'),                             // 删除文件
    rev = require('gulp-rev'),                        // 文件求MD5
    revCollector = require('gulp-rev-collector'),     // MD5路径替换
    del = require('del'),                             // 删除文件
	browserSync = require('browser-sync').create(),   // 自动刷新页面
	reload = browserSync.reload;


/** 路径配置 */	
var options = {
        enterPath: {
            img: ['src/img/*'],
            css: ['src/common/**/*.scss','src/**/sass/*.scss'],
            html: ['src/**/*.html'],
            js: ['src/js/*.js'],
			font: 'src/**/font/*.+(eot|svg|ttf|woff)',  
            commonjs: ['src/commonjs/*.js'],
            webpack: {
                index: 'src/commonjs/index.js'
            }
        },

        outPath: {
            img: 'dist/img/',
            css: 'dist/css/',
            html: 'dist/www',
            js: 'dist/js/',
			font: 'dist/css'
        },

        html: {
            removeComments: true,                //清除HTML注释
            collapseWhitespace: true,            //压缩HTML
            collapseBooleanAttributes: true,     //省略布尔属性的值
            removeEmptyAttributes: true,         //删除所有空格作属性值
            removeScriptTypeAttributes: true,    //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
            minifyJS: true, //压缩页面JS
            minifyCSS: true //压缩页面CSS
        }
    }
	
//删除文件
function clean(cb) {
    return del(['dist'], cb);
}

// 图片
function img() {
    return gulp.src(options.enterPath.img)
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
        .pipe(reload({stream: true}));
}

// 样式
function css() {
    return sass(options.enterPath.css, {
            sourcemap: true
        })
        .on('error', sass.logError)
        .pipe(autoprefixer({
				browsers: [ 'last 2 versions',    //css前缀自动补全
							'> 5%',
							'ie >= 7',
							'Firefox >= 20',
							'last 3 Safari versions'
							
				],               
				cascade: true,  //是否美化属性值 默认：true 像这样：
			                    //-webkit-transform: rotate(45deg);
			                            //transform: rotate(45deg);
			    remove:false    //是否去掉不必要的前缀 默认：true
		})) 
		.pipe(rename({dirname: ''}))
		.pipe(gulp.dest(options.outPath.css))    // 生成未压缩的css文件
		.pipe(rename({ suffix: '.min' }))        // 重命名压缩的文件
        .pipe(minifyCss())                       // 压缩混淆css
        .pipe(gulp.dest(options.outPath.css))    // 输出压缩css文件
        .pipe(reload({stream: true}));
}

// js
function scripts() {
    return gulp.src(options.enterPath.js)
        //.pipe(concat('lib.js'))
		.pipe(rename({dirname: ''}))
		.pipe(gulp.dest(options.outPath.js))
        .pipe(rename({ suffix: '.min' }))         // 重命名压缩的文件 (注释掉可以不压缩js) 
        .pipe(uglify())
        .pipe(gulp.dest(options.outPath.js))
        .pipe(reload({stream: true}));
}

// commonjs
function commonjs() {
    return gulp.src(options.enterPath.commonjs)
        .pipe(webpack({
            entry: options.enterPath.webpack,
            output: {
                filename: '[name].js',
            },
        }))
        .pipe(uglify())
        .pipe(gulp.dest(options.outPath.js))
        .pipe(reload({stream: true}));
}

// html
function html() {
    return gulp.src(options.enterPath.html)
        .pipe(htmlmin(options))
        .pipe(revCollector())
        .pipe(gulp.dest(options.outPath.html))
        .pipe(reload({stream: true}));
}

// 字体
function font(){
	 return gulp.src(options.enterPath.font)
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(options.outPath.font));
}

// 静态服务器
function server(){    // 函数名不能命名为browserSync，否则会报错
	return	browserSync.init({
				 server: { baseDir: ["dist","src"]},    // 需要知道根目录
				 files: [                               // 若少了这行，则找不到路径 
				  "dist" + '/**'  
                ]
			});
}

// 监听文件
function watch() {
    gulp.watch(options.enterPath.img, img);   // 路径名+函数名
    gulp.watch(options.enterPath.css, css);
    gulp.watch(options.enterPath.js, scripts);
    gulp.watch(options.enterPath.commonjs, commonjs);
    gulp.watch(options.enterPath.html, html);
}

// 发布任务
gulp.task('build', gulp.series(
    clean,
    gulp.parallel(css, img, scripts, html)
));

// 默认执行任务
gulp.task('default', gulp.series(
    clean,
	gulp.parallel(font,css, img, scripts, html),         // series：串行，parallel: 任务并行，所有任务都是函数名
    gulp.parallel(server, watch)
));
