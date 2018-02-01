/** 处理垂直滑块 */
(function(window){
    var Slider = function(element,options){
        this.element = element;
    	this.options = Object.assign({}, Slider.DefaultSettings, options )
    	this.init();
    }

    // 默认值
    Slider.DefaultSettings = {
        type: 'pen',         // 操作滑块类型 type: pen:画笔   eraser: 橡皮擦  
    	size: 10,            // 画笔默认大小
        startSize: 1,        // 刻度的开始值，默认从0开始         
    	isSlider: false,     // 鼠标是否按下
    	max: 40,             // 设置滑块最大值
        callback: function(){}
    }

    // 初始化
    Slider.prototype.init = function(){
         this.sliderOuter  = document.querySelector(this.element+' .slider-outer');   // 滑块外层
         this.sliderInner  = document.querySelector(this.element+' .slider-inner');   // 滑块内层
         this.sliderWrapper  = document.querySelector(this.element+' .slider-inner-wrapper');   // 滑块内层浮层。盖住滑块
         this.prev         = document.querySelector(this.element+' .prev');           // 实时显示画笔大小 
         this.sliderOuter_top = this.getPosition(this.sliderOuter).top; // 外层滑块相对于页面的偏移量
         this.sliderPrev   = document.querySelector(this.element+' .slider-prev'); // 跟随滑块移动的圆，用于直观展示画笔大小

         // 设置默认位置和笔触大小: 
         //var size = parseInt((sliderInner_top / (self.sliderOuter.offsetHeight - self.sliderInner.offsetHeight)) * self.options.max);
         // 根据上一行公式，右画笔大小判断滑块位置
         // 当前尺寸下滑块位置
         this.startTop = parseInt(this.options.startSize * (this.sliderOuter.offsetHeight - this.sliderInner.offsetHeight) / (this.options.max-this.options.startSize) )
         var currentTop = parseInt(this.options.size * (this.sliderOuter.offsetHeight - this.sliderInner.offsetHeight) / (this.options.max-this.options.startSize))
         // 设置起始位置和size
         this.setDefaultPosition(currentTop-this.startTop,this.options.size);
    	 this.initEvent();
    }

    Slider.prototype.setDefaultPosition = function(top,size){
        this.sliderWrapper.style.top = this.sliderInner.style.top = top + "px";
        this.prev.innerHTML = size;
        this.sliderPrev.style.top =top + "px";
        // 左侧圆的缩放比例
        this.sliderPrev.style.width = size +'px';
        this.sliderPrev.style.height = size +'px';
    }

    // 初始化事件
    Slider.prototype.initEvent = function(){
    	var self = this;
    	 this.sliderOuter.addEventListener("touchstart", function(e) {
            e.preventDefault();
            self.isSlider = true;
         });
     
         //拖动
        this.sliderWrapper.addEventListener("touchmove", self.move = function(e) {
            e.preventDefault();
            var x = e.targetTouches[0].pageY || e.targetTouches[0].clientY; //鼠标横坐标
            var sliderInner_top = x - self.sliderOuter_top - self.sliderInner.offsetHeight/2; //小方块相对于父元素（长线条）的top
           
            if(sliderInner_top >= self.sliderOuter.offsetHeight - self.sliderInner.offsetHeight) {
                sliderInner_top = self.sliderOuter.offsetHeight - self.sliderInner.offsetHeight;
            }
            if(sliderInner_top <= 0) {
                sliderInner_top = 0;
            }
            // 获取当前滑动的值：top值，这个值也作为左侧圆的宽度
            //  self.options.max-self.options.startSize:加入从12开始，则刻度相当于0-28，再加上12滑块区间就是12-40
            var size = parseInt((sliderInner_top / (self.sliderOuter.offsetHeight - self.sliderInner.offsetHeight)) * (self.options.max-self.options.startSize));
            // 修正滑块值
            size += self.options.startSize;
            self.setDefaultPosition(sliderInner_top,size);
        });

        //鼠标松开
        this.sliderWrapper.addEventListener("touchend", function(e) {
            self.isSlider = false;
            self.sliderInner.removeEventListener('touchmove',self.move,false);
            if(typeof self.options.callback === 'function'){
                var size = parseInt(self.prev.innerHTML)
                 self.options.callback.call(self, size);
            }
        });
    }

    // 获取元素绝对位置: 相对offsetParent的offsetLeft
    Slider.prototype.getPosition = function( node ){
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
    window.Slider = Slider;
})(window)