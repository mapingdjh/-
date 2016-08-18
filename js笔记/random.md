# 随机数 #
## 获取min-max之间的随机数
    function getRamdom(min,max){
        return Math.floor(Math.random()*(max - min + 1)) + min;
    }
## 随机生成n个minNum-maxNum之间的值不会重复的整数组

### 方法一
	/**
     * 随机生成n个minNum-maxNum之间的值不会重复的整数组，十位补0
     * @param maxNum 1-几
     * @param n 多少个
     * @returns {arr}
     */

    // TODO 当n>10会发生死循环:  说明： 随机数是1-10，而生成随机数的个数是20个，又要求不重复，所以造成
    // TODO 从第11位开始不管怎么找都是重复的数，所以造成死循环
    var randomIntNum = function(minNum,maxNum, n) {
        var oArr = [];
        var newArr = [];
        var rNum;
        /** 对应生成不重复的数，n>maxNum会造成页面死循环 */
        if(n > maxNum){
            // 避免死循环，保证程序正常执行
            var temp = n;
            n = maxNum;
            maxNum = temp;
        }
        for (var i = 0; i < n;) {
            rNum = parseInt(Math.random() * ( maxNum- minNum +1 )) + minNum;
            if (!oArr[rNum]) {
                oArr[rNum] = rNum;
                (rNum < 10) && (rNum = '0' + rNum);
                newArr.push(rNum);
                i++;
            }
        }
        return newArr;
    };
    console.log(randomIntNum(1,10,11));    

### 方法二
      /**
     * @description 随机生成n个1-maxNum之间的值不会重复的整数组，十位补0
     * @param  min,max {number}  min-max的随机值
     * @param  count  {number}  生成数组的数量
     * @return arr    {array}   返回数组
     * */
    function createRandomArray(min,max,count){
        var arr = [];
        while(arr.length < count){
            var rd = getRamdom(1,max);
            /*if(arr.indexOf(rd) == -1){   indexOf()是es5中的方法，IE8不支持
                arr.push(rd);
            }*/
            // 检测数组中不存在rd，才将rd放到数组中
            if(!indexOf(arr,rd)){
                arr.push(rd);
            }
        }
        return arr;
    }

    /**
     * @description:　查询数组中是否含有某个元素
     * @param： arr {array}需要检测的数组对象
     * @param： ele {string/number}被检测的数组元素
     * @return: {boolean} true:元素在数组中，false：元素不在数组中
     * */
    function indexOf(arr,ele){
        for(var i= 0,len=arr.length; i<len; i+=1){
            if(arr[i] == ele){
                return true;
            }
        }
        return false;
    }

    /**
     * 生成min-max之间的随机数
     * */
    function getRamdom(min,max){
        return Math.floor(Math.random()*(max - min + 1)) + min;
    }
	   

		






	

