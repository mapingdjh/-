/**
 * @description: 弹框js
 * @author: chenshaoting (16/08/01)
 * @update:
 */


/*弹框出现和隐藏--- start*/
$(function(){
    var role;
    //大弹框1
    $(".bigdialog").click(function(){
        role = $(this).attr("role");
        bigdialog("我是大弹框1",role);//todo标题值
    });

    //大弹框2
    $(".bigdialog1").click(function(){
        role = $(this).attr("role");
        bigdialog("我是大弹框2",role);//todo标题值
    });

    //小弹框  恭喜您！操作成功
    $(".smalldialog01").click(function(){
        role = $(this).attr("role");
        smalldialog("恭喜您！操作成功",role);//todo标题值
    });

    //小弹框 对不起！操作失败
    $(".smalldialog02").click(function(){
        role = $(this).attr("role");
        smalldialog("对不起！操作失败",role);//todo标题值
    });
    //小弹框 对不起！操作失败
    $(".smalldialogbtn").click(function(){
        role = $(this).attr("role");
        smalldialogbtn("只有一个按钮的弹框",role);//todo标题值
    });
    $("body").on('click', '.mg-dialog_close',function(){
        $(".mg-overlay").remove();
        $('.mg-dialog').remove();
    });
    //大弹框模板
    function bigdialog(title,role){
        var str = $(".test[role='" + role +"']").html();
        var html ='<div class="mg-overlay"></div>'+
            '<div class="mg-dialog mg-show">'+
            '<div class="mg-dialog-header">'+
            '<div class="mg-dialog-title">'+title+'</div>'+//todo标题值
            '<div class="mg-dialog_close" title="关闭"></div>'+
            '</div>'+
            '<div class="mg-dialog-content mg-dialog-con">'+

            str +   //todo内容值

            '</div>'+
            '<div class="mg-dialog-footer">'+
            '<button class="mg-dialog-btn off">取消</button>'+
            '<button class="mg-dialog-btn determine">确认</button>'+
            '</div>'+
            '</div> ';
        $("body").append(html);
        $(".mg-overlay").show();
        $('.mg-dialog').show();
    }
    //小弹框模板
    function smalldialog(title,role){
        var str = $(".test[role='" + role +"']").html();
        var html ='<div class="mg-overlay"></div>'+
            '<div class="mg-dialog mg-show mg-prompt">'+
            '<div class="mg-dialog-header">'+
            '<div class="mg-dialog-title">'+title+'</div>'+//todo标题值
            '<div class="mg-dialog_close" title="关闭"></div>'+
            '</div>'+
            '<div class="mg-dialog-content mg-dialog-con">'+

                    str+  //todo内容值

            '</div>'+
            '<div class="mg-dialog-footer">'+
            '<button class="mg-dialog-btn off">取消</button>'+
            '<button class="mg-dialog-btn determine">确认</button>'+
            '</div>'+
            '</div>';
        $("body").append(html);
        $(".mg-overlay").show();
        $('.mg-dialog').show();
    }



//小弹框只有一个按钮的模板
    function smalldialogbtn(title,role){
        var str = $(".test[role='" + role +"']").html();
        var html ='<div class="mg-overlay"></div>'+
            '<div class="mg-dialog mg-show mg-prompt">'+
            '<div class="mg-dialog-header">'+
            '<div class="mg-dialog-title">'+title+'</div>'+//todo标题值
            '<div class="mg-dialog_close" title="关闭"></div>'+
            '</div>'+
            '<div class="mg-dialog-content mg-dialog-con">'+

            str+  //todo内容值

            '</div>'+
            '<div class="mg-dialog-footer mg-dialog-footer-btn">'+
            //'<button class="mg-dialog-btn off">取消</button>'+
            '<button class="mg-dialog-btn determine">确认</button>'+
            '</div>'+
            '</div>';
        $("body").append(html);
        $(".mg-overlay").show();
        $('.mg-dialog').show();
    }
});



