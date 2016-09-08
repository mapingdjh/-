# JS获取url参数值
## 方法一
    function getQueryStringArgs(propertyName){
		// 获取查询字符串并去掉开头的问号
		var qs = (location.search.length > 0)?location.search.slice(1) : "";
		    // 保存数据对象
		    args  = {}, 
		    // 保存掉以&分隔的每一项  
		    items = qs.length ? qs.split("&") : [],
		    // 保存以=分隔的每一项
		    item  = null,
		    // 即将保存到args中的key和value
		    name  = null,
		    value = null;
		    for(var i=0,len=items.length; i<len; i++){
			    item  = items[i].split("=");
			    name  = decodeURIComponent(item[0]);
			    value = decodeURIComponent(item[1]);
			    name.length && (args[name] = value);
		}
		return args[propertyName];
	}

    测试：
       console.log(getQueryStringArgs("username"));

## 方法二
    function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.slice(1).match(reg); 
		if (r != null){
			return unescape(r[2]); 
		}else{
			return null;
		} 
		 
	} 
    
    测试：
	    console.log(getQueryString("username"));