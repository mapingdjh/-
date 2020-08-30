# reduce #
## 一、 概念
### 1.1、什么是reduce，它是做什么的
> 对数组中的每一个元素都执行一次指定的函数reducer，并把执行结果保存下来



### 1.2、API语法
arr.reduce(callback(acc,cur,index arr), initValue)

* callback
  * acc: 用于保存每次执行callback后返回的值，这些值最终累计一个最终结果值 
  * cur： 当前数组元素
  * index: 当前数组元素索引
  * arr: 当前数组
* initValue:
  * 第一次执行函数，给acc赋值
  * 如果没有设置，acc将会取数组元素第一个值，此时cur会去数组中第二值，索引从1开始； 如果数组为空，会报错
  * 建议设置initValue
  
### 1.3、理解
 > 与map等方法一样，都是遍历数组，对数组中每一个元素执行一个函数
 > 它可把每次执行函数结果都保存累计下来， 就像for循环计算数组元素和，定一个变量，保存累加的和一样；
 > initValue很重要，他的类型就是我们要通过reduce计算获取最终的值类型，比如求和(Number), 数组扁平化(设置数组)
 > 简化了代码，可读性差
   

## 二、 使用场景

### 2.1、计算数组元素和
```js
	// 计算数组元素和
    let arr = [1,2,4,3]
    let sum = arr.reduce(((acc, cur) => acc + cur), 0)
    console.log("sum=", sum);

    // 数组对象中元素和
    let arrObj = [{x: 1}, {x: 2}, {x: 4}, {x: 3}];
    let sum2 = arrObj.reduce(
        (acc, cur) => acc + cur.x
    , 0)
    console.log("sum2=", sum2);
```
### 2.2、 数组扁平化(二维数组转化一维数组)
```js
	let flattArr = [[0, 1], [2, 3], [4, 5]];
    let flattened = flattArr.reduce(
        (acc, cur) => acc.concat(cur)
    , [])
    console.log('flattened==', flattened)
    
    // 通用写法
    // function flattDeep(arr) {
    //     return arr.reduce(
    //         (acc,cur) => acc.concat(Array.isArray(cur)? flattDeep(cur): cur)
    //         , [])
    // }

    let flattDeep = arr => arr.reduce( (acc,cur) => acc.concat(Array.isArray(cur)? flattDeep(cur): cur),[])
    console.log('flattDeep=',flattDeep([1,[2],[[3],4]]))
```
### 2.3、计算数组中每个元素出现的次数
```js
	var arrCounts = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
    //返回数据结构： {Alice:2, Bob: 1 }
    let count = arrCounts.reduce(
        (acc, cur) => {
            acc[cur] ? acc[cur] += 1 : acc[cur] = 1
            return acc;
        }
    , {})
    console.log("arr count==", count)
```
### 2.4、对数组对象按指定的属性分类
```js
    // 对数组对象按指定的属性分类
    let people = [
        { name: 'Alice', age: 21 },
        { name: 'Max', age: 20 },
        { name: 'Jane', age: 20 }
    ];
    //返回数据结构： { 20: [{ name: 'Max', age: 20 },xxx]}
    let groupBy = (arrObj, field) => arrObj.reduce(
        (acc, cur) => {
            // console.log()
            let property = cur[field]
            // if(acc[property]) {
            //     acc[property].push(cur)
            // }else {
            //     acc[property] = []
            //     acc[property].push(cur)
            // }
            // 优化上面写法
            if (!acc[property]) {
                acc[property] = []
            }
            acc[property].push(cur)
            return acc;
        }, {})

    console.log("groupBy==", groupBy(people, 'age'))
```
### 2.5、 数组和数组对象（按照指定属性）去重
```js
    let myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
    let uniArray = myArray.reduce(
        (acc, cur) => {
            if (acc.indexOf(cur) < 0) {
                acc.push(cur)
            }
            return acc;
        }
        , []
    )
    console.log('uniArray==', uniArray)
    
    // 数组对象去重
    let myArrayObj = [
        { name: 1, age: 1 },
        { name: 2, age: 1 },
        { name: 3, age: 2 },
    ]
    let uniqObj = (array, field) => {
        let tempObj = {};
        return array.reduce(
            (acc, cur) => {
                let property = cur[field]
                tempObj[property] ? tempObj[property]++ : tempObj[property] = 1 && acc.push(cur)
                return acc;
            }
            , [])
    }
    console.log('uniqObj==', uniqObj(myArrayObj, 'age'))

```

### 2.6、 redux中compose
……
