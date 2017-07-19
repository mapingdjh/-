# 数组 #
## 一、删除数组元素
### 1.1、根据数组下标或者指定的数组元素来删除数组
     Array.prototype.remove = function(){
        for(var i= 0,len=this.length;i<len;i+=1) {
            // 如果obj是数组下标，temp为i，否则temp取数组内容
            var temp = !isNaN(arguments[0])? i : this[i];
            if (temp == arguments[0]) {
                // 当前删除元素后面的元素位置前移
                for (var j = i; j < this.length; j++) {
                    // 修改内容
                    this[j] = this[j + 1];
                }
             this.length = this.length-1;
            }
        }
    };

>测试代码： <br>
>var arr =["ddd","eee","fff","bbb","aaa"];<br>
    arr.remove(3);<br>
   //arr.remove("bbb");

### 1.2、根据数组下标来删除数组
    Array.prototype.remove = function(b) { 
		var a = this.indexOf(b); 
		if (a >= 0) { 
		this.splice(a, 1); 
		return true; 
		} 
		return false; 

        /* 判断数组中是否含有指定的元素
        if(this[arguments[0]]){
            return  this.splice(arguments[0],1);
        }else{
            return "数组下标越界";
        }
        */
	}; 

> 测试代码：<br>
> var arr =["ddd","eee","fff","bbb","aaa"];<br>
>  arr.remove(2);<br>
    console.log(arr);

## 二、查找数组元素
### 2.1、IE8及其以下查找    
    Array.prototype.indexOf = function(){
        //重写的函数只接收一个参数，否则抛出异常
        if(arguments.length != 1){
            throw new Error("indexOf只接收一个参数！");
        }else{
            var elem = arguments[0];
            //遍历数组
            for(var i=0;i<this.length;i++){  //this代表正在调用方法的对象
                if(elem === this[i]){
                    return i;
                }
            }
            return -1;
        }
    }

<br>

    Array.prototype.indexOf = Array.prototype.indexOf || function (searchElement, fromIndex) {
	if ( this === undefined || this === null ) {
		throw new TypeError( '"this" is null or not defined' );
	}

	var length = this.length >>> 0; // Hack to convert object.length to a UInt32

	fromIndex = +fromIndex || 0;

	if (Math.abs(fromIndex) === Infinity) {
		fromIndex = 0;
	}

	if (fromIndex < 0) {
		fromIndex += length;

		if (fromIndex < 0) {
		  fromIndex = 0;
		}
	}

	for (; fromIndex < length; fromIndex++) {
		if (this[fromIndex] === searchElement) {
			return fromIndex;
		}
	}

	return -1;
    };


> 测试代码：<br>
> var arr = [0,1,3,5,8]; <br>
> console.log(arr.indexOf(5,6));

### 2.2、ES5 indexOf()方法(用法同string的indexOf()方法)
    var arr = [1,2,3,4,5,6];
	var index = arr.indexOf(1);  // 如果找不到返回-1，

### 2.3 折半查找字符在数组中的位置
        /**
	     * 折半查找字符在数组中的位置(有序列表)
	     * @param arr 被检索的数组
	     * @param value 要查找的字符
	     * @type int
	     * @returns 字符在数组中的位置，没找到返回-1
	     */
		function binarySearch(arr,value){
			var startIndex = 0,               // 起点位置
				endIndex    = arr.length-1,    // 结束位置
				midIndex    = Math.floor((endIndex + startIndex) / 2);  // 中间点位置
			while((arr[midIndex] != value) && (startIndex <endIndex )){
				if(arr[midIndex] < value){
					// 要查找的元素大于中间点元素，到数组下半段去查找
					startIndex = midIndex + 1;
				}
				if(arr[midIndex] > value) {
					// 要查找的元素小于中间点元素，到数组上半段去查找
					endIndex = midIndex - 1;
				}
				midIndex = Math.floor((endIndex + startIndex) / 2);
			}
		   return (value == arr[midIndex]) ? midIndex : -1;
		}
		var array2=[1,2,3,4,5,6,7,8,9,100,109];
		console.log(binarySearch(array2,109));
		

## 三、数组随机排序
### 3.1 使用数组sort方法对数组元素随机排序
    /**
     * 洗牌算法
     * n: 需要返回或者参与排序的数组元素个数
     * */
    Array.prototype.shuffle = function(n){
        var arr = this,
            len = this.length,
           // 1、用三目运算符来判断num的取值，2、Math.min(n,len)，防止传来的n大于数组长度，导致输出空数组等
            num  = n ? Math.min(n,len): len;
        this.sort(function(a,b){
            return Math.random() - 0.5;
        });
        return arr.slice(0,num-1);
    };
> 测试代码：<br>
> var arr =[],t1,t2 <br>
>  for(var i=1;i<300;i++) {arr.push(i)}<br>
  t1 = new Date;
  for (var i=0;i<10000;i++) {
   console.log(arr.shuffle().join()) <br>
  }
t2 = new Date <br>
console.log(t2-t1) // 计算代码执行时间<br>

### 3.2 随机交换数组内的元素（个人偏好这种方法） 
  
     Array.prototype.shuffle = function(n){
        var arr = this,
                len = this.length,
                num  = n ? Math.min(n,len): len,
                temp,
                rnd;
        for(var i=0; i<len; i+=1){
            rnd = getRandom(0,len-1);
            temp = arr[i];
            arr[i] = arr[rnd];
            arr[rnd] = temp;
        }
        return arr;
    };

    // 获取min-max之间的随机数
    function getRandom(min,max){
        return min + Math.floor(Math.random()*(max-min+1));
    }

### 3.3 随机从原数组抽取一个元素,加入到新数组

    Array.prototype.shuffle = function(n) {
      var arr = this,
          len = this.length,
          num  = n ? Math.min(n,len): len,
          newArr = [],
          rnd;
      for(var i=0; i<num; i+=1){
         rnd = getRandom(0,num-1);
         newArr.push(arr[rnd]);
      }
      return newArr.slice(0,num-1)
    };

## 四、数组对象根据指定的属性排序

    /** 数组对象中，根据对象的属性进行排序 */
    function compareObjByPer(propertyName){
       return function(obj1,obj2){
          var value1 = obj1[propertyName],	
              value2 = obj2[propertyName];
              console.log(value1);
          if(value1 < value2){
          	return -1;
          }else if(value1 > value2){
          	return 1;
          }else{
          	return 0;
          }    
       }
    }

>测试代码： <br>
> var data = [ <br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name: "Zachary",age: 28},<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name: "Nich", age: 29}<br>
    ];<br>
data.sort(compareObjByPer("age"));<br>
console.log(data);  <br>


## 五、arguments转化为数组
### 方法一
    var args = Array.prototype.slice.call(arguments);
### 方法二
    var args = [].slice.call(arguments);
### 方法三
    var args = []; 
	for (var i = 1; i < arguments.length; i++) { 
		args.push(arguments[i]);
	}


## 六、返回数组中最大值
### 6.1、apply()
    var arr = [1,2,3,4,5,8];
    var max = Math.max.apply(null,arr);
   
### 6.2、遍历数组
    var arr = [1,2,3,4,5,8];
    var max = arr[0];
    for(var i= 0,len=arr.length; i<len; i+=1){
        if(max<arr[i]){
            max = arr[i];
        }
    }
    console.log(max);

## 7、[清空数组](http://www.cnblogs.com/snandy/archive/2011/04/04/2005156.html)

var arr = [1,2,3,4,5,8]; 
### 7.1 splice()
    arr.splice(0,arr.length);

### 7.2 length赋值为0
    arr.length = 0;
### 7.3 赋值为[ ]，这种方式效率最高
    arr = []; // 赋值为一个空数组以达到清空原数组
## 八、数组去重
### 8.1、遍历数组法 
    var arr = ['a','b','c','d','b','c','a','g','d'];
    Array.prototype.delRepeat = function(){
        var newArr = [];
        for(var i= 0,len=this.length; i<len;i++){
            if(newArr.indexOf(arr[i]) == -1){
                newArr.push(this[i]);
            }
        }
        return newArr;
    };

### 8.2、数组下标判断法
     Array.prototype.delRepeat = function(){
        var newArr = [];
        for(var i= 0,len=this.length; i<len;i++){
            // 如果当前数组的第i项在当前数组中第一次出现的位置不是i，那么表示第i项是重复的，忽略掉，否则存入结果数组
            if (this.indexOf(this[i]) == i) newArr.push(this[i]);
        }
        return newArr;
    };


### 8.3、对象键值对法(效率最高)
    /** 这种方法效率最高*/
    Array.prototype.delRepeat = function(){
        var obj     = {},              // hash表
             newArr = [],              // 新数组
             len    = this.length;     // 需要去重的数组长度
        for(var i=0; i<len; i+=1){
            //如果hash表中没有当前项
            if(!obj[this[i]]){
                obj[this[i]] = true;  //存入hash表
                newArr.push(this[i]);  //把当前数组的当前项push到临时数组里面
            }
        }
        return newArr;
    };
    console.log(arr.delRepeat());	
### 8.4、ES5 filter()

	var r;
 	var arr = ['apple', 'straw', 'banana', 'pear', 'apple', 'orange', 'orange', 'straw'];
	r = arr.filter(function (element, index, self) {
	 return self.indexOf(element) === index;
	});
	console.log(r);
**说明：**<br>

- 去除重复元素依靠的是 indexOf 总是返回第一个元素的位置，后续的重复元素位置与 indexOf 返回的位置不相等，因此被 filter 滤掉了。
- [参考网址](http://www.jb51.net/article/99038.htm) http://www.jb51.net/article/99038.htm

### 8.5、ES6 Set()
**set特性：成员值唯一，没有重复的值**

	function dedupe(array){
		return Array.from( new Set(array) )
	}
    dedupe( [1,2,3,3,4,4] ) // [1,2,3,4]
    
    或者：
     let arr = [1,2,3,3,4,4];
     let arr = [ ...set ];

* Array.from可以将set结构转化为数组
* ...扩展运算符内部使用for ... of循环，也可以用于set结构，将数据转为逗号隔开的字符 

## 判断是否为数组
### instancof
    var arr = [1,2,3,4];
    console.log(arr instanceof Array);

### call()
    console.log(Object.prototype.toString.call(arr) === "[object Array]");

### Array.isArray()（ES5方法）
    console.log(Array.isArray(arr));

### 兼容写法
	function checkArray(arr){
	  if(Array.isArray){
	  	return Array.isArray(arr);
	  }else{
	  	return Object.prototype.toString.call(arr) === "[object Array]";
	  }
	}
	console.log(checkArray(arr));
	
