
/**
 * JSON无限折叠菜单
 * @constructor {AccordionMenu}
 * @param {options} 对象
 */
function AccordionMenu(options) {
    this.config = {
        containerCls        : '.wrap-menu',                // 外层容器
        menuArrs            :  '',                         //  JSON传进来的数据
        type                :  'click',                    // 默认为click 也可以mouseover
    };
    this.init(options);
}
/** 原型对象中添加方法*/
AccordionMenu.prototype = {
    constructor: AccordionMenu,
    init: function(options){
        this.options = $.extend({},this.config,options || {});
        var self = this;
        // 渲染html结构
        $(self.options.containerCls).each(function(index,item){
            // 生成html
            self.createDom(item);
            self.initEvent();
        })
    },

    /**
     * @description 遍历json对象最顶层对象
     * @params {dom obj} container 最外层容器对象
     * */
    createDom: function(container){
        var self = this;
        var ulhtml = $("<ul></ul>");
        $(self.options.menuArrs).each(function(index,item){
            console.log(item);
            var lihtml = $('<li><h2>'+item.name+'</h2></li>');
            if(item.submenu && item.submenu.length > 0){
                // 遍历子对象：submenu为直接子菜单，不包含更深一层菜单
                self.createSubMenu(item.submenu,lihtml);
            }
            ulhtml.append(lihtml);
        });
        $(container).append(ulhtml);
        // 处理菜单缩进
        self.setIndent(ulhtml);
    },

    /**
     * @description 遍历json对象中的所有subnemu子对象，创建子菜单
     * @params {array} submenu 子菜单对象（二级子菜单）
     * @params {obj}   上层li对象
     * */
    createSubMenu: function(submenu,lihtml){
        var self = this,
            subUl = $('<ul></ul>'),
            callee = arguments.callee,// 需要缓存起来，否则函数内部arguments.callee就不表示createSubMenu了
            subLi;
        $(submenu).each(function(index,item){
            var url = item.url || 'javascript: void(0)';
            subLi = $('<li><a href="'+url+'">'+item.name+'</a></li>');
            // 当前子菜单中还嵌套子菜单
            if(item.submenu && item.submenu.length > 0){
                $(subLi).find('a').prepend('<img src="images/blank.gif" alt=""/>');
                // 不能这样写，否则返回的each()中的函数
                //arguments.callee(item.submenu,subLi);
                callee(item.submenu,subLi);
            }
            $(subUl).append(subLi);
        });
        // console.log(subUl.html());
        $(lihtml).append(subUl);
    },
    /**
     * @description: 处理文字缩进
     * @
     * */
    setIndent: function(ulList){
        ulList.find("ul:not('ul:eq(0)')").hide();
        var initIndent = 2,    // 初始化缩进值，单位em
            lev = 1;           // 用来标识ulList中每个ul的前缀，例如第一个ul： lev-1，代表一级菜单下ul
        while(ulList.find("ul").length){
            initIndent += 2;
            var $subUl = ulList.children().children("ul");  // 查找ulList下每个li子元素中的ul子元素
            // 将找到的ul元素添加class，以lev-形式，且将ul的子元素添加text-indent样式，该样式每层循环后递增
            $subUl.addClass("lev"+lev).children("li").css("text-indent", initIndent+"em");
            ulList = ulList.children().children("ul");
            lev++;
        }
    },

    initEvent: function(){
       var self = this;
       $("h2,a",self.containerCls).click(function(e){
         // 单击的是超链接： 阻止默认行为
         if($(e.target).is("a")){
             var $img = $("img",this);
             e.preventDefault();
         }
         // 判断当前菜单下是否存在子菜单
         var subUl = $(this).siblings();
         if(subUl){
             subUl.slideToggle('normal');
             $img && $img.toggleClass('unfold');
             // 同级其他菜单关闭
             $(this).parent("li").siblings().find("ul").hide("normal")
                 .end().find('img.unfold').removeClass('unfold');
         }

       });
    }

};