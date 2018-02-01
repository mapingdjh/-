/** 写字板相关功能处理 */
(function(window,document,$){
	var Editor = function(options){
		this.options = Object.assign({}, Editor.DefaultSettings, options )
	    this.init();
	}

	// 默认值
	Editor.DefaultSettings = {
		 isEraser: false,    			       // 是否是橡皮擦模式
		 size: 5,                              // 橡皮粗细(半径是5)
		 brushSize: 5,                         // 画笔size（半径是5）
		 grainUrl: '../img/brush-big-1.png',   // 笔刷纹理 
		 snap: [],                             // 保存会画之前的快照，用于撤销
		 redoSnap: [],                         // 撤销后的快照从snap移动到redoSnap，用于恢复撤销
		 /*最大最小线宽  */
		 lineMax: 40,
		 lineMin: 5,
		 // 线的粗细，笔锋效果
		 linePressure: 2,
		 smoothness: 90,
		 callback: function(){},
	}
    
    // 初始化
	Editor.prototype.init = function(){
		this.undo    = document.querySelector(".btn-groups .wx-btn-undo");              // 撤销按钮
        this.redo    = document.querySelector(".btn-groups .wx-btn-redo");              // 恢复撤销
        this.clear   = document.querySelector(".btn-groups .wx-btn-clear");             // 清空
        this.canvas  = document.getElementById("cvs");                                  // canvas对象
        this.eraser  = document.querySelector(".tool-eraser");                          // 橡皮擦
        this.canvas.width = window.innerWidth || document.documentElement.clientWidth;
        // 获取设备高度
        var height = window.innerHeight || document.documentElement.innerHeight;
        this.canvas.height = height * 0.4587;
		this.context = this.canvas.getContext("2d"); 
		this.img = document.getElementById('pen2');
		this.img1 = document.getElementById('pen22');
        if( this.context ){

			this.upof = {};
			this.radius = 0;
			this.has = [];
			this.pointArr = [];    // 记录手指划线点
			this.p =0;
    		this.l = 20;

        	this.initEvent();
        } 
	}
    
    // 设置是书写状态还是橡皮擦状态
	Editor.prototype.setEraserStatus = function( status ){
		this.options.isEraser = status;
	}

	// 设置橡皮或笔刷粗细
	Editor.prototype.setSize = function( size ){
		if(this.options.isEraser ) {
			this.options.size = Math.ceil(size / 2);
		}else{
			this.options.brushSize = Math.ceil(size/2);
		}
	}

	// 设置笔刷纹理
	Editor.prototype.setGrain = function( url ){
		this.options.grainUrl = url;
	}
    
    // 保存canvas快照，用于撤销或者恢复撤销
	Editor.prototype.copyImage = function( storeArray ){
		var imgData =this.context.getImageData(0,0,this.canvas.width,this.canvas.height);
        //手指刚触摸到屏幕时，保存一个canval快照并加入数组
        storeArray.push(imgData);
        if(storeArray == this.options.snap && storeArray.length > 0){
            this.undo.className = 'wx-btn-undo active'
        }
		if(storeArray == this.options.redoSnap && storeArray.length > 0){
            this.redo.className = 'wx-btn-redo active'
        }
        if(storeArray.length){
        	this.clear.className = 'wx-btn-clear active'
        }
	}
    
    // 橡皮擦
	Editor.prototype.resetEraser = function( x,y,touch ){
        // source-over 默认,相交部分由后绘制图形的填充(颜色,渐变,纹理)覆盖,全部浏览器通过
        this.context.globalCompositeOperation = "destination-out";
        this.context.beginPath();
        this.context.arc(x, y, this.options.size, 0, Math.PI * 2);
        this.context.strokeStyle = "rgba(250,250,250,0)";
        this.context.fill();
        this.context.globalCompositeOperation = "source-over"
	}

	// 清空
	Editor.prototype.clearup = function(){
       
        //清除画布，左上角为起点
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.options.isEraser = false;
                    
        // 清空快照
        this.snap = [];
        this.redoSnap = [];

        // 按钮默认置灰
        this.undo.className = 'wx-btn-undo'
        this.redo.className = 'wx-btn-redo'
        this.clear.className = 'wx-btn-clear'
	}
    
    // 初始化事件   
	Editor.prototype.initEvent = function(){
		var self = this;
		this.canvas.addEventListener("touchstart",self.start = function(event){ 
			event.preventDefault();

	        var touchs = event.targetTouches[0];
	        // 获得相对于canvas左上角触摸点坐标：
	        var canvas_x = touchs.clientX - self.getPosition(self.canvas).left,
				 canvas_y = touchs.clientY - self.getPosition(self.canvas).top;
			self.has = [];
			self.upof = {x:  canvas_x, y: canvas_y};	
			self.pointArr.unshift({x1:canvas_x,y1:canvas_y}); 
	        if(self.options.isEraser){
	            // 橡皮擦
	            //手指刚触摸到屏幕时，保存一个canval快照并加入数组
	            self.copyImage(self.options.snap)
	            //self.resetEraser(canvas_x,canvas_y,touchs)
	        }else{
	             // 控制粗细
			//     self.context.lineWidth= Math.ceil(self.options.brushSize/2);
	            // 控制阴影
			    self.context.shadowColor = 'rgba(50, 50, 50, .1)';
				self.context.shadowOffsetX = 2;
				self.context.shadowOffsetY = 5;
				self.context.shadowBlur = 5;
	            // 控制画笔图案
	            var img = new Image();
	            img.src = self.options.grainUrl;
	            img.onload = function(){
		            // 创建图案
		            var ptrn = self.context.createPattern(img,'repeat');
		            self.context.fillStyle = ptrn;
	       		}
				self.copyImage(self.options.snap)
	         }  
            
	        self.canvas.addEventListener("touchmove",self.touchMove = function(event){
		        event.preventDefault();
				var touchs = event.targetTouches[0];
			    // 获得相对于canvas左上角触摸点坐标
			    var canvas_x = touchs.clientX - self.getPosition(self.canvas).left,
	             	canvas_y = touchs.clientY - self.getPosition(self.canvas).top;
			    if(self.options.isEraser){
			        self.resetEraser(canvas_x,canvas_y,touchs)
			    }else{
					 
					 // 第二个点	
					var of = {x:  canvas_x, y: canvas_y};
					// 按下时第一个点
					var up = self.upof;
					// 划线的半径
					var ur = self.radius;
					// 保存不同时间段2个点间的距离
					self.has.unshift({time:new Date().getTime() ,dis:self.distance(up,of)});
					var dis = 0;
					var time = 0;
					for (var n = 0; n < self.has.length-1; n++) {
						dis += self.has[n].dis;
						time += self.has[n].time-self.has[n+1].time;
						if (dis>self.options.smoothness)
							break;
					}
					var or = Math.min(time/dis*self.options.linePressure+self.options.brushSize , self.options.lineMax) / 2;
					self.radius = or;
					self.upof = of;
					// if (self.has.length<=4)
					// 	return;
					var len = Math.round(self.has[0].dis/2)+1;
					for (var i = 0; i < len; i++) {
						// up： 第一个点坐标  of： 第二个点坐标
						var x = up.x + (of.x-up.x)/len*i;
						var y = up.y + (of.y-up.y)/len*i;
						var r = ur + (or-ur)/len*i;
						//console.log("r=============================",r)
						var r_r = r*2;

						x = x-self.l/2;
						y = y - self.l/2;
						self.pointArr.unshift({x:x,y:y}); 
						self.context.beginPath();
						// self.context.arc(x,y,r,0,2*Math.PI);
						// self.context.fill();
						self.context.drawImage(self.img,x,y,self.l,self.l);
						self.l = self.l - 0.2;
						if( self.l < 10) self.l = 10;
						// console.log(l);
						self.p++;
					}
			    }
		    },false);  
                    
        },false);  


        //手指离开后，注销移动事件  
        this.canvas.addEventListener("touchend",function(event){  
			//event.preventDefault();
			self.l = 20;
			if(self.pointArr.length >100){
				for(var j = 0; j <60 ;j++){
				   // arr[j].x = arr[j].x - 2;
				   // arr[j].y = arr[j].y - 1;
				   self.pointArr[j].x = self.pointArr[j].x-self.l/4;
				   self.pointArr[j].y = self.pointArr[j].y - self.l/4;          
				   self.context.drawImage(self.img,self.pointArr[j].x,self.pointArr[j].y,self.l,self.l);
	   
				   self.l = self.l - 0.3;
				   if( self.l < 5) self.l = 5;
			   }
			   self.l = 20;
			   self.pointArr = [];       
		   }
			if (self.pointArr.length==1) {
				// 只是点击一下，没有滑动，画一个点	
				// self.context.beginPath();
				// self.context.arc(self.pointArr[0].x1,self.pointArr[0].y1,self.options.brushSize,0,2*Math.PI);
				// self.context.fill();	
				self.context.drawImage(self.img,self.pointArr[0].x1 - self.l/2,self.pointArr[0].y1 - self.l/2,self.l,self.l);		
			}
			self.pointArr = [];
        	self.canvas.removeEventListener("touchmove",self.touchMove,false);  
        },false);  

        
        // 清空
	    this.clear.onclick = function(){
	    	self.options.isEraser = false;
	    	// 参数this代表按钮对象
	    	if(self.preventDisabedBtn(this)){
	    		// 背景、画笔、橡皮都取消选中状态
	    		$(".edit-tool ").removeClass("active fadeInUp");
	    		document.querySelector(".dialog-confirm").style.display = "block";
	    	}
	    }

        // 撤销
        this.undo.onclick = function(){
        	if(self.preventDisabedBtn(this)){
        		//撤销前保存一个canval快照并加入数组redoSnap中，用于恢复撤销
		        self.copyImage(self.options.redoSnap)
		        // 获取快照列表中最后一个快照，
		        var oldCanvas = self.options.snap.pop();
		        self.context.putImageData(oldCanvas,0,0);
		        if(self.options.snap.length <= 0){
		            self.undo.className = 'wx-btn-undo'
		        }
        	}
	    }
       

        // 恢复撤销
        this.redo.onclick = function(){
        	if(self.preventDisabedBtn(this)){
        		//恢复撤销前，保存一个canval快照并加入数组用于撤销
		        self.copyImage( self.options.snap )    
		        // 获取快照列表中最后一个快照，
		        var newCanvas = self.options.redoSnap.pop();
		        if(self.options.redoSnap.length <= 0){
		            self.redo.className = 'wx-btn-redo'
		        }
		        self.context.putImageData(newCanvas,0,0);
        	}
	    }
	}

	// 控制置灰的按钮不可点击
    Editor.prototype.preventDisabedBtn = function(btnObj){
	    if(btnObj.className.indexOf('active') < 0 ){
	    	return false;
	    }else{
	    	return true;
	    }
    }
	// 获取元素绝对位置-从当前元素一直查询到最顶层offsetparent: 相对offsetParent的offsetLeft
    Editor.prototype.getPosition = function( node ){
    	var left = node.offsetLeft; //获取元素相对于其父元素的left值var left
        var top = node.offsetTop;
            current = node.offsetParent; // 取得元素的offsetParent
            // 一直循环直到根元素
            while(current != null) {　　
                left += current.offsetLeft;　　
                top += current.offsetTop;　　
                current = current.offsetParent;　　
            }
            return {
                "left": left,
                "top": top
            };
	}
	
	// 计算2点之间线的长度(三角形的斜边)
	Editor.prototype.distance = function (a,b)	{
		var x = b.x-a.x , y = b.y-a.y;
		return Math.sqrt(x*x+y*y);
	}

	window.Editor = Editor;
})(window,document,$)