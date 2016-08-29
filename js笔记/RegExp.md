# 正则表达式 #
## 验证手机号码
    /^（\+86）?\s*1[34578]\d{9}$/

## 验证身份证号码
**规则：**身份证号前15位必须是数字，后三位包括2位数字+1位数字或者x/X，后三位最多只能出现1次，也可以没有；（后3位可有可无）

    /^\d{15}(\d\d[0-9xX])？$/

## 验证邮箱
    邮箱可能格式：
    正常情况下：maping6462@163.com,      maping6462@sina.com.cn
    特殊情况： zhangshna.Mr@163.com,     abc_Wang.dd@sian.com,
              abc_Wang.dd.cc@sian.com   123456@jb51.net 等带有特殊字符
    
	^([\w\-\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$
	
## 匹配汉字和双字节字符
        匹配中文字符的正则表达式： [\u4e00-\u9fa5]
        匹配双字节字符(包括汉字在内)：[^\x00-\xff]	
		
## 正则表达式-删除超链接
       /** 正则表达式-删除超链接 */
	    function delStrLink(str) {
	        var htmlreg = /(<\/?a[^>]*>)(?!.*\1)/ig; //删除超连接使用的正则
	        str = str.replace(htmlreg, "");
	        return str;
	    }
	    var str = '<div><span>123</span><a href="https://www.baidu.com"><button>单击我</button></a></div>';
	    console.log(delStrLink(str));

## JQery选择器中含有特殊字符
> JQuery中含有特殊字符如@、.、[ #（等会报错，解决方法是用\\转义<br>
> 如$("#admin@user") ==》 $("#admin\\\@user")即可

     // JQuery处理选择器中特殊字符 . # @ [ (等
     var pid = objs.pid.replace(/([@\.#(\[])/g,"\\$1");
		