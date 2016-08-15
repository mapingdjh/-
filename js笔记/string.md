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