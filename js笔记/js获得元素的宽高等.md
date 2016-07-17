# 原生JS
---
### 一、 获取计算后的样式
    var height = parseInt(window.getComputedStyle(newList,false).height);
> 说明： <br>
1、newList： dom对象 <br>
2、height: 需要获得的属性名<br>
3、window.getComputedStyle()获得的样式带有单位，**IE中不支持该方法**<br>
4、**计算结果仅是元素内容的宽高，不包括padding、margin、border**

### 二、 获取相对父元素的left、top(offsetLeft、offsetTop)
    var newList = document.querySelector(".news-lists");
    newList.offsetLeft;
    newList.offsetTop;

### 三、 获取元素的宽高   
	clientWidth = width + padding
	clientHeight = height + padding
	offsetWidth = width + padding + border
	offsetHeight = height + padding + border

# jQuery
---
### 一、 获取top、left
#### 1.1 获取绝对值： offset()
	var top  = $("div").offset().top 
	var left = $("div").offset().left
#### 1.2 获相对于父元素的位置： position(),子元素需要相对于父元素绝对定位
	 var top  = $("div").position().top
 	 var left = $("div").position().left
 >  *注意：var top  = $("div").css("top")也可获得相对父元素的位置，缺点是输出结果带有单位px，需要parseInt()进行转换*<br>
 >  好处：既能获得css中的样式，也能获得style样式
  
### 二、 [获取width、height](http://www.css88.com/jqapi-1.9/category/dimensions/)
#### 2.1 获取高度
* height(): 仅获取元素内容的高度，不包括border、margin、和padding
* innerHeight(): 获取元素内容和padding的高度，不包括border和margin
* outerHeight(boolean)：获取第一个元素的当前计算高度值,包括padding，border和选择性的margin
>说明：  outerHeight(boolean)默认值是false，表示当前高度不包含margin，当默认值为true时，高度包含margin

#### 2.2 获取width度
* width(): 仅获取元素内容的宽度，不包括border、margin、和padding
* innerWidth(): 获取元素内容和padding的宽度，不包括border和margin
* outerWidth()(boolean)：获取第一个元素的当前计算宽度值,包括padding，border和选择性的margin
>说明： outerWidth(boolean)默认值是false，表示当前宽度不包含margin，当默认值为true时，宽度包含margin