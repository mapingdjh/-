# 字符串 #
## 一、统计字符串中每个字符出现的次数
### 1、1 
    /** 统计每个字符出现的次数*/ 
	var str = "hello world",
	    char,
        obj = {};
	for(var i=0,len=str.length; i<len; i+=1){
		char = str.charAt(i);
		/** 
		 * 遍历字符串每个字符最为对象的属性，用对象去访问
		 * 如果属性存在，则该属性值加1，
		 * 如果不存在则赋值1
		*/
       if(obj[char]){
       	obj[char] +=1;
       }else{
       	obj[char] = 1;
       }
	}
	console.log(obj);

    // 取出出现次数最多的字符和次数
    var maxNum = 0,
        maxKey ="";
    for(key in obj){
    	if(maxNum < obj[key]){
    		maxNum = obj[key]; 
    		maxKey = key;
    	}
    }
    console.log("字母："+maxKey+"　次数："+maxNum);

### 1.2 [match()方法实现](http://www.phpvar.com/archives/2936.html)
    function charCount(str) {
		// 用正则匹配将各个字符从字符串中替换掉，
        //直接用正则匹配的match().length获取每个字符出现的次数
		str = str.replace(/\s/ig, "");//去除空格
		var strArr = str.split("");
		var result = [],reg;
		for (var i = 0; i < strArr.length; i++) {
			if (str.indexOf(strArr[i]) != -1) {
				reg = new RegExp(strArr[i], "ig");
				counts=str.match(reg).length;
				result.push(strArr[i] + ": " + counts);
			}
		}
		return result;
	}
	var str="hello world"
	var result=charCount(str);
	console.log(result.sort());
	console.log(result)

## 二、将单词首字母转成大写
### 2.1 字符串首字母转为大写
    str.replace(/(\w)/,function(v){return v.toUpperCase()});
### 2.2 每个单词首字母转换为大写
    var str = "you can you up";
    function initialsToCapitals(str){
      var words = str.split(" ");    // 按照空格拆分为字符数组
      for(var i=0,len=words.length; i<len; i+=1){
       //words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
       words[i] = words[i][0].toUpperCase() + words[i].slice(1);
      }  
      return words.join(" ");  
    }
    console.log(initialsToCapitals(str));

   其中： words[i].charAt(0) === words[i][0]
         words[i]是一个字符串，可以通过下标来访问

### 2.3 每个单词首字母转换为大写(for+replace)
    var str = "you can you up";
	function initialsToCapitals(str){
		words = str.toLowerCase().split(" ");
	    for(var i=0,len=words.length; i<len; i+=1){
            // 每个单词首字母
	    	var char = words[i][0];  
	    	words[i] = words[i].replace(char,function(char){
	           return char.toUpperCase(); 
	    	});
	    }
	    return words.join(" ");
	}
	console.log(initialsToCapitals(str));
 
### 2.4 每个单词首字母转换为大写([正则+replace](http://www.w3school.com.cn/jsref/jsref_replace.asp))  
	var name = 'aaa bbb ccc';
	var uw=name.replace(/\b\w+\b/g, function(word){
      // word是与正则表达式匹配的字符
	  return word.substring(0,1).toUpperCase()+word.substring(1);}
	  );
	console.log(uw);
## 三、去空格
### 3.1、去除左空格
    String.prototype.ltrim = function(){
        return this.replace(/^\s+/,"");
    }
### 3.2、去右空格
    String.prototype.rtrim = function(){
       return this.replace(/\s+$/,"");
    }
### 3.3、去除前后空格
    String.prototype.rtrim = function(){
       return this.replace(/^\s+|\s+$/g,"");  //如果不加g只会去除前空格
    }
### 3.4、es5 trim()方法去除前后空格
    str.trim();

## 四、判断是否以某个字符串开头或者结尾
### 4.1、判断是否一某字符串开头
     String.prototype.startWith = function(){
        return this.indexOf(arguments[0]) == 0;
    }
    console.log(str.startWith("he"));

### 4.2、判断是否以某字符串结尾
    String.prototype.endWith = function(){
        var  word    = arguments[0],                   // 参数：子字符串
             len     = this.length - word.length;      // 原字符串长度减子字符串长度
        // 若len小于0，说明字串比原父字符串长度还长，不符合逻辑
        return (len>0 && this.lastIndexOf(word) == len);
    };
    console.log(str.endWith("world"));

## 五、replace(reg，function(match,pos，originText){}) 函数作为第二个参
>在这种情况下，**每个匹配都调用该函数**，它返回的字符串将替换文本使用。<br>
第一个参数表示匹配到的字符,<br>
第二个参数表示match在字符串中索引位置<br>
第三个参数表示原字符

### 5.1、字符转译
     var str = '<p class="greeting">hello</p>';
	function htmlEsscape(str){
	    return str.replace(/[<>&"]/g,function(match,pos,originalText){
	        switch (match){
	            case "<" :
	                   return "&lt;";
	            case ">" :
	                   return "&gt;";
	            case "&" :
	                   return "&amp;";
	            case "\"" :
	                   return "&quot;";
	        }
	    })
	}
	console.log(htmlEsscape(str));//&lt;p class=&quot;greeting&quot;&gt;hello&lt;/p&gt;

### 5.2、[replace()深入理解](http://blog.csdn.net/jcy1009015337/article/details/45220431)

	// define  
	(function (window) {  
	    function fn(str) {  
	        this.str = str;  
	    }  
	    fn.prototype.format = function () {  
	        var arg = ______;  // Array.prototyoe.call(arguments,0);
	        return this.str.replace(_______, function (a, b) {  // /{(\d+)}/g
				return arg[b] || '';  
	        });  
	    }  
	    window.fn = fn;  
	})(window);  

	// use  
	(function(){  
	    var t = new fn('<p><a href="{0}">{1}</a><span>{2}</span></p>');
	    console.log( t.format('http://www.alibaba.com', 'Alibaba', 'Welcome') );  
	})();

    函数功能： 使用formate()参数替换{0}，{1}，{2}；
    说明： return arg[b] || '';  中的b表示模式匹配在字符串中索引，这里由于模式匹配/{(\d+)}/g用()括起来了，这里b表示0,1,3，即第几个子串
    	