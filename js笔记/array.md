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

> 测试代码：<br>
> var arr = [0,1,3,5,8]; <br>
> console.log(arr.indexOf(5,6));

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

### 3.3 随机从原数组抽取一个元素,加入到新数组
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