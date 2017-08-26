+function ($){
    var ClipBoard = function(element,options){
        this.$element = $(element);
        this.options = $.extend({},ClipBoard.DEFAULTS,options);
        this.selectedText = '';  // 选中的文本
        this.init();
    };

    // 插件本身默认属性
    ClipBoard.DEFAULTS = {
        action: 'copy',                                                // 默认行为：copy复制功能
        defaultText: function (trigger) {
            return this.getAttributeValue('text', trigger);             // 从属性中复制
        },
        defaultTarget: function(trigger) {
            var selector = this.getAttributeValue('target', trigger);   // 从目标对象中复制,并获得目标对象
            var targetObj = null
            if (selector) {
                targetObj = document.querySelector(selector);
                if( !targetObj ){
                    throw new Error('Invalid "target" value, use a valid Element');
                }else{
                    return targetObj;
                }
            }
        },
        container: document.body,
    };


    ClipBoard.prototype.init = function() {
		if( !document.execCommand("copy")){
			this.$element.hide();
			return;
		}
        // 初始化数据
        this.initData(this.options);
        // 初始化事件
        this.initEvent(this.options);
    };
    
    /** 初始化数据*/
    ClipBoard.prototype.initData = function(options) {
        this.action    = (typeof options.action    === 'function') ? options.action    : this.options.action;
        this.target    = (typeof options.target    === 'function') ? options.target    : this.options.defaultTarget.call(this,this.$element);
        this.text      = (typeof options.text      === 'function') ? options.text      : this.options.defaultText.call(this,this.$element);
        this.container = (typeof options.container === 'object')   ? options.container : this.options.container;
    };
    

    
    /** @description：获取所单击按钮上的属性值：
        例如<button class="btn"  data-clipboard-target="#foo">复制</button>，获取#foo
        @params  { suffix } string 后缀：如data-clipboard-target，target就是后缀
        @params  { $element } Object 调用插件的节点对象
    */
    ClipBoard.prototype.getAttributeValue = function(suffix, $element) {
         var attribute = 'data-clipboard-' + suffix ;
        if (!$element.attr(attribute)) {
            return;
        }
        return $element.attr(attribute);
    };
    
    // 从属性中复制
    ClipBoard.prototype.selectFake = function() {
        var isRTL = document.documentElement.getAttribute('dir') == 'rtl';
        this.removeFake()
        this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;
        this.fakeElem = document.createElement('textarea');
        // Prevent zooming on iOS
        this.fakeElem.style.fontSize = '12pt';
        // Reset box model
        this.fakeElem.style.border = '0';
        this.fakeElem.style.padding = '0';
        this.fakeElem.style.margin = '0';
        // Move element out of screen horizontally
        this.fakeElem.style.position = 'absolute';
        this.fakeElem.style[ isRTL ? 'right' : 'left' ] = '-9999px';
        // Move element to the same position vertically
        var yPosition = window.pageYOffset || document.documentElement.scrollTop;
        this.fakeElem.style.top = yPosition + 'px';

        this.fakeElem.setAttribute('readonly', '');
        this.fakeElem.value = this.text;
        this.container.appendChild(this.fakeElem);
        this.selectedText = select(this.fakeElem);
        this.copyText();
    };

    // 从目标对象中复制
    ClipBoard.prototype.selectTarget = function() {
         this.selectedText = select(this.target);
         this.copyText();
    };
   
    // 复制逻辑
    ClipBoard.prototype.copyText = function() {
        var succeeded;
        try {
            succeeded = document.execCommand(this.action);
        }
        catch (err) {
            succeeded = false;
        }
    };

    // removeFake
    ClipBoard.prototype.removeFake = function() {
        if (this.fakeHandler) {
            this.container.removeEventListener('click', this.fakeHandlerCallback);
            this.fakeHandler = null;
            this.fakeHandlerCallback = null;
        }

        if (this.fakeElem) {
            this.container.removeChild(this.fakeElem);
            this.fakeElem = null;
        }
    };
    
    ClipBoard.prototype.initEvent = function() {
        var self = this;
        this.$element.click(function(){
            // 从文本中复制
            if (self.text) {
                self.selectFake();
            }
            // 从目标中复制
            else if (self.target) {
                self.selectTarget();
            }
        })
    }

    function Plugin(option){
        var args = Array.prototype.slice.call(arguments, 1);
        var returnValue = this;
        this.each(function(){
            var $this = $(this),
                data = $this.data('mg.clipboard'),
                options = typeof option === 'object' && option;
            if(!data){
                $this.data('mg.clipboard',(data = new ClipBoard(this,options)));
            }
            if(typeof option === 'string'){
                returnValue = data[option].apply(data, args) || returnValue;
            }
        });
        return returnValue;
    }

    var old = $.fn.clipboard;

    $.fn.clipboard = Plugin;
    $.fn.clipboard.Constructor = ClipBoard;

    $.fn.clipboard.noConflict = function(){
        $.fn.clipboard = old;
        return this;
    }
}(jQuery);