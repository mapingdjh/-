/** 
 * cancas图片合成
 * 注意： canvas绘制图片是异步的，每张图会绘制的事件不一样
 * 绘制顺序： 1、默认背景 2、选中背景 3、绘制写字区域canvas转成的图片， 4: logo 灯笼 二维码
 */

(function(window,document,$){
	var Compose = function(options){
		this.options = Object.assign({}, Editor.DefaultSettings, options )
	    this.init();
	}

	// 默认值
	Compose.DefaultSettings = {
	    callback: function(){},
	}
    
    // 初始化
	Compose.prototype.init = function(){
        this.canvas  = document.getElementById("cvs-compose");    // canvas对象
        //this.canvas.width = window.innerWidth || document.documentElement.clientWidth;
        //this.canvas.height = window.innerHeight || document.documentElement.clientHeight;
        this.context = this.canvas.getContext("2d"); 
        this.radio = this.getPixelRatio();
		this.canvas.width = 375*this.radio;
        this.canvas.height = 667*this.radio;
        if( this.context ){
        	
        	
        	// 绘制默认背景
        	//this.drawDefaultBg();
        	// 绘制选中背景
        	//this.drawpageBg();
        	// 绘制写字区域canvas转成的图片
        	//this.drawBrushBg();
        	// 绘制页面顶部logo
        	//this.drawLogo()
        	// 绘制页面顶部灯笼
        	//this.drawLantern()
        	// 绘制页面右下角二维码
        	//this.drawEwm();
        	
        	// canvas绘制图片是异步的，每张图会绘制的时间不一样，
        	// 所以需要进行递归处理：当前图片绘制成功后再绘制下一张
        	// 绘制默认背景
        	this.drawImageAsyn(0)
        	
        } 
	}
    
    // 方法用来获取设备的 pixel ratio,解决高清屏幕下绘制图片模糊问题
	Compose.prototype.getPixelRatio = function(){
		var backingStore = this.context.backingStorePixelRatio ||  
            this.context.webkitBackingStorePixelRatio ||  
            this.context.mozBackingStorePixelRatio ||  
            this.context.msBackingStorePixelRatio ||  
            this.context.oBackingStorePixelRatio ||  
            this.context.backingStorePixelRatio || 1;  
      
        return (window.devicePixelRatio || 1) / backingStore;  
	}
    
    // 异步执行绘图：
    Compose.prototype.drawImageAsyn = function(i){
    	switch(i) {
    		case 0:
	    		// 绘制默认背景
	    		this.drawDefaultBg(++i);
	    		break;
	    	case 1:
	    	    //绘制选中背景
        		this.drawpageBg(++i);
	    		break;
	    	case 2:
	    	    // 绘制写字区域canvas转成的图片
        	    this.drawBrushBg(++i);
	    		break;
	    	case 3:
	    	    // 绘制页面顶部logo
        	    this.drawLogo(++i)
	    		break;
	    	case 4:
	    	    // 绘制页面顶部灯笼
        	    this.drawLantern(++i)
	    		break;	
	    	case 5:
	    	    // 绘制页面右下角二维码
        	    this.drawEwm(++i);
	    		break;
	    	default:
	    	   // 以上图片都绘制完成后，生成一个静态图片
	    	   if(typeof this.options.callback == "function"){
	    	   	   this.options.callback.call(this,this.canvas,this.radio);	
	    	   }
	    	   			
    	}
    }

    // 绘制图片
	Compose.prototype.drawImage = function(imgUrl, x,y,width,height,index){
		var self = this;
		var img = new Image();
		img.src = imgUrl;
		img.onload = function(){
			self.context.drawImage(img,x,y,width,height);
			img = null;
			self.drawImageAsyn(index);
		}
	}

	// 绘制默认背景
	Compose.prototype.drawDefaultBg = function(index){
		var imgUrl = this.options.brushParams.defaultBg;
		var width =  this.canvas.width,
		    height = this.canvas.height;
		this.drawImage(imgUrl,0,0,width,height,index);
	}

	// 绘制选中背景
	Compose.prototype.drawpageBg = function(index){
		var imgUrl = this.options.brushParams.pageBg;
		var width =  this.canvas.width,
		    height = this.canvas.height;
		this.drawImage(imgUrl,0,0,width,height,index);
	}

	// 绘制canvas转为手写板的图片
	Compose.prototype.drawBrushBg = function(index){
		var imgUrl = this.options.imageCanvas.url,
		    width  = this.options.imageCanvas.width * this.radio,
		    height = this.options.imageCanvas.height * this.radio;
		this.drawImage(imgUrl,0,100*this.radio,375*this.radio,305*this.radio,index);
	}

	// 绘制logo
	Compose.prototype.drawLogo = function(index){
		var imgUrl = this.options.brushParams.logo.url,
		    width  = this.options.brushParams.logo.width,
		    height = this.options.brushParams.logo.height,
		    left   = this.options.brushParams.logo.left,
		    top    = this.options.brushParams.logo.top;
		this.drawImage(imgUrl,15*this.radio,9*this.radio,69 * this.radio,20 * this.radio,index);
	}

	// 绘制灯笼
	Compose.prototype.drawLantern = function(index){
		var imgUrl = this.options.brushParams.lantern.url,
		    width  = this.options.brushParams.lantern.width,
		 	height = this.options.brushParams.lantern.height,
		 	left   = this.options.brushParams.lantern.left,
		 	top    = this.options.brushParams.lantern.top;
		this.drawImage(imgUrl,5*this.radio,31*this.radio,367.5 * this.radio,184 * this.radio,index);
	}

	// 绘制二维码
	Compose.prototype.drawEwm = function(index){
		var imgUrl = this.options.brushParams.ewm.url,
	        width  = this.options.brushParams.ewm.width,
		 	height = this.options.brushParams.ewm.height,
		 	left   = this.options.brushParams.ewm.left,
		 	top    = this.options.brushParams.ewm.top;
		this.drawImage(imgUrl,275*this.radio,570*this.radio,80 * this.radio,80 * this.radio);
	}
	



	window.Compose = Compose;
})(window,document,$)