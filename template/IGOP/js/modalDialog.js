/**
 * Created by chenshaoting on 16/10/20.
 */
+function ($){
    var ModalDialog = function(element,options){
        this.$element = $(element);
        this.options = $.extend({},ModalDialog.DEFAULTS,options);
        this.init();
    };

    /*模态弹出框默认属性*/
    ModalDialog.DEFAULTS = {
        'visible':true, //默认弹框是否打开
        'haveheader':true, //是否需要头部,默认true
        'closable':true, //头部关闭按钮是否显示,默认true
        'maskClosable':true, //是否允许点击蒙层关闭弹框,默认true
        'dragdrop': false //是否允许弹框拖拽
    };

    /*模态弹出框初始化*/
    ModalDialog.prototype.init = function() {
        /*生成最基本的DOM*/
        this.createDom();

        /*数据初始化*/
        this.data(this.options);

        /*事件初始化*/
        this.initEvent();
    };

    /*DOM化*/
   ModalDialog.prototype.createDom = function() {
        var html = '<div class="mg-modaldialog mg-dialog  mg-prompt">'+
                        '<div class=" mg-overlay"></div>'+
                        '<div class="mg-dialog mg-show">'+
                            '<div class="mg-dialog-content mg-dialog-con">'+
                                this.$element.html()+
                            '</div>'+
                            '<div class="mg-dialog-footer mg-dialog-footer-btn"></div>'+
                        '</div>'+
                    '</div>';
        this.$element.html(html);
    };
    /*数据初始化*/
    ModalDialog.prototype.data = function(options) {
        var footerhtml = '',
            $content = this.$element.find(".mg-dialog-content"),
            $footer = this.$element.find(".mg-dialog-footer");
        if(options.haveheader){
            var html = '<div class="md-dialog-header mg-dialog-header">'+
                            '<p class="md-title mg-dialog-title">'+options.title+'</p>';
            html += options.closable ? '<div class="mg-dialog_close md-close mg-dialog_close" title="关闭"></div>' : ''; //显示头部关闭按钮
            html += '</div>';
            $content.before(html); //显示头部
        }
        if(options.buttons){
          for(var i = 0, len = options.buttons.length; i < len; i+=1) {
                var obj = options.buttons[i];
                footerhtml += '<button class="md-btn  mg-dialog-btn off '+obj.class+' ">'+obj.label+'</button>';
            }
        }else{
            footerhtml = '<button class="md-btn mg-dialog-btn off">取消</button>'+
                         '<button class="md-btn md-btn-highlight mg-dialog-btn determine">确定</button>';

        $(".mg-dialog-footer-btn").append(footerhtml);
        }
        $footer.html(footerhtml); //显示底部按钮
        if(options.footerstyle === 'left'){ //设置底部按钮居左显示
            $footer.css('text-align','left');
        }else if(options.footerstyle === 'center'){ //设置底部按钮居中显示
            $footer.css('text-align','center');
        }
        $dialog=this.$element.find(".mg-dialog")
        options.width && $dialog.css('width',options.width); //设置弹框宽度
        /*options.height && $dialog.css('height',options.height); //设置弹框宽度
        $content.height($dialog.height()-($footer.height()+this.$element.find(".md-dialog-header").height()+2+30)); //设置内容部分的高度；//2：边框的高度；30：margin的上下间距
        */
        !options.visible && this.$element.find(".mg-modaldialog").parent().hide();
    };
    /*事件初始化*/
    ModalDialog.prototype.initEvent = function() {
        var self = this,
            $dialog = this.$element.find(".mg-modaldialog").parent();
        this.$element.on('click', '.md-close', function(){ //点击弹框头部关闭按钮
            $dialog.hide(); //隐藏弹框
            self.options.onClose.call(self);
        });
        this.$element.on('click', '.md-btn', function(){
            $dialog.hide();
            var $buttons = self.options.buttons;
            for(var i=0,len=$buttons.length;i<len;i+=1){
                var $obj = $buttons[i];
                if($(this).text()==$obj.label){
                    $obj.onClick.call(self);
                }
            }
        });
        this.$element.on('click', '.mg-overlay', function(){ //点击蒙层
            if(self.options.maskClosable){ //允许点击蒙层关闭弹框
                $dialog.hide();
                self.options.onClose.call(self);
            }
        });

        //是否允许弹框拖拽
        if(this.options.dragdrop) { 
            var z,x,y,lt,tp; //声明全局变量
            var $mddialog = this.$element.find(".mg-dialog"); //弹框对象
            $mddialog.on('mousedown', function(e){//鼠标按下
                e = e || window.event;
                x = parseInt(e.clientX),
                y = parseInt(e.clientY),
                lt = parseInt($(this).css('left')),
                tp = parseInt($(this).css('top')),
                z = true;
            });
            $mddialog.on('mousemove', function(e){//鼠标移动
                var e = e || window.event,
                    m = parseInt(e.clientX),
                    n = parseInt(e.clientY);
                    if(z){
                        var l = lt + (m - x),
                            t = tp + (n - y);
                        $mddialog.css({'left':l,'top':t}); //将移动后的坐标赋给相应的位移
                    }
            });
            $mddialog.on('mouseup', function(){ //鼠标松开
                z = false;
            });
        }

    };
    function Plugin(option){
        var args = Array.prototype.slice.call(arguments, 1);
        var returnValue = this;
        this.each(function(){
            var $this = $(this),
                data = $this.data('mg.modaldialog'),
                options = typeof option === 'object' && option;

            if(!data){
                $this.data('mg.modaldialog',(data = new ModalDialog(this,options)));
            }

            if(typeof option === 'string'){
                returnValue = data[option].apply(data, args) || returnValue;
            }
        });
        return returnValue;
    }

    var old = $.fn.modaldialog;

    $.fn.modaldialog = Plugin;
    $.fn.modaldialog.Constructor = ModalDialog;

    $.fn.modaldialog.noConflict = function(){
        $.fn.modaldialog = old;
        return this;
    }
}(jQuery);