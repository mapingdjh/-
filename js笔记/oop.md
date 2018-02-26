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

#### Object.assign()浅拷贝
	var o1 = { a: 1 };
    var o2 = { b: 2 };
	var o3 = { c: 3 };
	var obj = Object.assign(o1, o2, o3);
	console.log(obj); // { a: 1, b: 2, c: 3 }
	console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变

      因为 Object.assign() 拷贝的是属性值。假如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值。
      因为拷贝是引用值，改变引用对象，源对象也受影响
       var o1 = { a: 1 };
	   var o2 = { b: 2 };
	   var o3 = { c: 3,demo: {name: 123} };
	   var res = Object.assign({},o1,o2,o3);
	   console.log(res);     // {a:1,b:2,c:3,demo:{name: 123}}
	   res.demo.name = "maping"
	  //如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值, 所有res的demo和 o3的demo引用同一个地址
	  // 改变任何一个，他们同时发生变化
	   console.log(res);   // {a:1,b:2,c:3,demo:{name: 'maping'}}
	   console.log(o3);   // {a:1,b:2,c:3,demo:{name: 'maping'}}

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
## 面试题
```javascript
var param = 1;

function main()
{    
    console.log(param);
    var param = 2;
    console.log(this.param);
    this.param = 3;
}

//下面两条语句分别会在控制台打印什么？
main(); // undefined 1
var m = new main(); // undefined undefined
执行new mian()时，this.param输出undefined时因为
this.param==>m.param,此时对象m中没有任何值
[参照 ：http://www.cnblogs.com/similar/p/5292926.html#3385010](http://www.cnblogs.com/similar/p/5292926.html#3385010)
```
