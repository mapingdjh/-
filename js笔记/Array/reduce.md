# reduce #
## 一、 概念
### 1.1、什么是reduce，它是做什么的



### 1.2、API语法

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
### 2.3、计算数组中每个元素出现的次数
### 2.4、对数组对象按指定的属性分类
### 2.5、 数组和数组对象（按照指定属性）去重


