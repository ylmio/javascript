/*
* 数组检测方法
*1.instanceof: arr instanceof Array 返回一个布尔值
*2.Array.isArray(arr);也是返回一个布尔值；目前最靠谱的方法
*
* */

const arr = ["one","two","three","four"];
console.log(arr instanceof Array);//true

console.log(Array.isArray(arr));//true

if(Array.isArray(arr)){
    arr.push("five");
    console.log(arr);
}