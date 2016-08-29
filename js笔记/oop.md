# 面向对象
## 对象复制 	
	// 将所有对象s的属性复制给对象r
    var person = {
        name: "maping",
        age: 24,
        sex: "m"
    }
    var another = {name: "dingjiahua"};


    /**
     * 将所有 s 的属性复制给 r
     * @param r {Object}
     * @param s {Object}
     * @param is_overwrite {Boolean} 如指定为 false ，则不覆盖已有的值，其它值
     *   包括 undefined ，都表示 s 中的同名属性将覆盖 r 中的值
     */
    function mixs(r, s, is_overwrite) { 
        if (!s || !r) return r;
        for (var p in s) {
            if (is_overwrite || !(p in r)) {
                r[p] = s[p];
            }
        }
        return r;
    }
    console.log(mixs(another,person,true));

## 对象深浅拷贝
    var Chinese = {
        nation:'中国',
        province: {
        	name: "anhui",
        	personCount: 200000
        },
        mainCity: ["北京","上海","广州","深圳"]

    };

### 1、浅拷贝(如果对象中的属性使索引类型，会直接把地址赋值给子对象的属性，子对象和父对象属性公用该地址)

    function extendCopy(parent){
        var child= {};
        for(var key in parent){
            child[key] = parent[key];
        }      
        return child;
    }
    var Chinese = {
        nation:'中国'
    };

    Chinese.province = ["北京","上海","广州","深圳"];
    var doc = extendCopy(Chinese);
    console.log(doc.nation);
    doc.province.push("安徽");
    console.log(doc.province);
    console.log(doc);
    console.log(Chinese);

### 2、深拷贝

    var Chinese = {
        nation:'中国',
        province: {
        	name: "anhui",
        	personCount: 200000
        },
        mainCity: ["北京","上海","广州","深圳"]

    };

	function deepCopy(parent,child){
	  // 第一层遍历(parent属性使基本类型)，child为对象名
	  // 第二层遍历(parent属性使引用类型)，child为对象内部属性，该属性也是个对象
	  // 从	arguments.callee(parent[key],child[key]={});可以看出
	  // child[key]={}，child对象中的key也是个对象，且作为递归调用时的子对象；
	  var child = child || {};
	  for(var key in parent){
	  	if(typeof parent[key] === "object"){
      /** 复制对象需要完整性复制，原对象中的属性是数组(对象)，复制到新对象后还必须是数组(对象)*/

      // child对象中属性作为下次遍历的子对象  
      child[key] = (parent[key] instanceof Array) ? [] : {};  
    	arguments.callee(parent[key],child[key]);
	  	}else{
	  		child[key] = parent[key];
	  	}
	  }
	  return child;
	}
	
	var chinese = deepCopy(Chinese);
	console.log("****调用****");
	console.log(chinese);
	   