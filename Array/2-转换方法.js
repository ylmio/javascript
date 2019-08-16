/*
* Array.prototype.toString 返回一个字符串
* Array.prototype.valueOf 返回Array对象的原始值
* Array.prototype.toLocaleString 返回一个字符串表示数组中的元素
* Array.prototype.join 将数组（或者一个类数组对象）中的所有元素连接到一个字符串中,不会改变原数组
*
* */

//Array.prototype.toString
const arr = ["apple","orange","banana"];
console.log(arr.toString());//apple,orange,banana

//Array.prototype.valueOf 返回Array对象的原始值
console.log(arr.valueOf());

//Array.prototype.toLocaleString
console.log(arr.toLocaleString());

//Array.prototype.join
console.log(arr.join("|"));

