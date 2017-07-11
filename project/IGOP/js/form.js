/**
 * @description: 表单js
 * @author: chenshaoting (16/07/28)
 * @update:
 */

$(function(){
/*下拉选择绑定数据在input中--- start*/
    $(".dropdown li").click(function(){
        var tag_text = $(this).text();
        $(this).parents('.div_radius').find(".tag_has").val(tag_text);
        $parent = $(this).parents(".div_radius");
        hideDrop($parent);
    });
    $(".tag_has,.downbig").on("click", function(){
        var $parent = $(this).parents(".div_radius");
            $downbig = $parent.find(".downbig");
            $li = $parent.find(".dropdown li");
        if($downbig.hasClass("down")){
            hideDrop($('.div_radius'));
            showDrop($parent);
        }else{
            hideDrop($parent);
        }
        $("html").on('click', function(e){
            var $target = $(e.target);
            if($target.is(".tag_has") || $target.is(".dropdown li") || $target.is(".downbig")){
                return false;
            }else{
                hideDrop($parent);
            }
        });
    });
    //下拉框 展开
    function showDrop(elm){
        var $dropdown = elm.find(".dropdown"),
            $downbig = elm.find(".downbig");
        $dropdown.slideDown(200);
        $downbig.removeClass("down");
       // $downbig.removeClass("down").addClass("up");
    }
    //下拉框 收起
    function hideDrop(elm){
        var $dropdown = elm.find(".dropdown"),
            $downbig = elm.find(".downbig");
        $dropdown.slideUp(200);
        $downbig.addClass("down");
        //$downbig.removeClass("up").addClass("down");
    }
});



/*给用div写的框加个鼠标样式--- start*/
$(function () {
    $("div.mg-form-control").mouseover(function(){
        $(this).css("border","1px solid #6cb92b")
    });
    $("div.mg-form-control").mouseout(function(){
        $(this).css("border","1px solid #d1d3d2")
    });
});
/*给用div写的框加个鼠标样式--- end*/


/*“是永久”前面的按钮--- start*/
$(".addradio img").on("click",function (){
    var src = $(this).attr("src");
    var a = src=="../img/quan_focus.png"?"../img/quan.png":"../img/quan_focus.png";
    $(this).attr("src",a);
});
/*“是永久”前面的按钮--- end*/

/*单选按钮图片形式的*/
$(".imgClick").click(function(){
    $(this).attr("src","../img/quan_focus.png").parents("label").siblings().find("div.opts .imgClick").attr("src","../img/quan.png");
});


//查看历史流程展开收起
$(".mg-line .mg-cont").click(function(){
    var cont = $(this).parents(".mg-line");
    if(cont.next().is(":visible")) {
        cont.next().slideUp(300);
        $(this).html("查看流程历史");
    }else{
        cont.next().slideDown(300);
        $(this).html("收起");
    }
})