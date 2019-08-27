/*
*Array.prototype.push将一个或多个元素添加到数组的末尾，并返回数组的长度
*Array.prototype.pop 删除数组中的最后一个元素，并返回该元素的值。此方法会更改元数组
*
* */
//Array.prototype.push
var fruits = ["apple","orange","banana"];
var len = fruits.push("chengzi");
console.log(len);//4

var sports = ["football","basketball","pingpang"];
var spo = sports.pop();
console.log(spo);