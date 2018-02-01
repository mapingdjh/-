/**
 * @description: tab切换js
 * @author: chenshaoting (16/08/02)
 * @update:
 */


$(function(){
    /*tab切换*/
    $('.tabs').click(function() {
        if(!$(this).hasClass('.tab-item-current')) {//在$('.tab_item')如果没有找到.current
            $('.tabs.tab-item-current').removeClass('tab-item-current');//把有current的class先去掉
            $(this).addClass('tab-item-current');//在给当前元素加上current
            $('.panel').hide().filter($(this).attr('attr')).show();//给有panel的全部隐藏，过滤掉含有attr的class
        }
    })
});