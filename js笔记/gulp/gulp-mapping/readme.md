# gulp构建说明 #
## 任务功能列表 ##
* gulp版本3.9.1
* 支持css、js、image、iconfont、html、ejs相关任务
* 所有任务拆分
* web服务：gulp-connect + http-proxy-middleware（gulp-connect不能自动打开浏览器）
* 支持为静态资源添加版本号，包括css中的url资源
* 区分开发环境(gulp dev)和生产环境(gulp build)
* 转发解决跨域问题
* 支持artTemplate预编译加载

## 运行 ##
	cnpm install
    gulp dev 开发环境
    gulp build 生产环境

## 版本号 ##
### 1、css文件中url添加版本号 ##
css文件中会自动添加（ gulp-make-css-url-version-extend ），支持在线图片地址(http://XXX.png)
### 2、css和js以及img文件添加版本号 ##
    系统中通过version变量，css和img同理
	<script src="<%= baseURL %>/h5/public/basic.js?v=<%= version %>"></script>
### 3、现网和测试环境接口地址切换 ##
    系统中通过baseURL变量来控制
	<script src="<%= baseURL %>/h5/public/basic.js?v=<%= version %>"></script>

## artTemplate预编译加载(gulp-tmod) ##
### 1、按文件与目录组织模板
	template('tpl/home/main', data)
### 2、模板支持引入子模板
	{{include '../public/header'}}
### 3、使用方法（运行测试页面查看）
    cnpm install
    npm run dev
    http://localhost:9000/www/artTemplateTest.html
    代码存放到src/tpl文件夹中
### 4、注意点
   * 使用系统生成的dist/tpl/template.js
   * 系统生成的template.js和官方提供的template.js不能同时混合使用，只能选其一
### 5、artTemplate预编译学习网址
   * [官网api](https://github.com/aui/tmodjs#%E7%BC%96%E8%AF%91%E6%A8%A1%E6%9D%BF)
   * [使用示例](https://github.com/calledT/gulp-tmod-demo)