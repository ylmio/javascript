// 添加一个值
let arr1 = ["apple","orange","banana"];
arr1.push("purpose");
console.log(arr1);//["apple", "orange", "banana", "purpose"]
// 不添加值
let arr2 = ["apple","orange","banana"];
arr2.push("");
console.log(arr2);//["apple", "orange", "banana", ""]
//返回的是新数组的长度
let arr2Length = arr2.push("purpose");
console.log(arr2Length);//4
//unshift方法向数组的开头添加一个或多个元素
let arr3 = ["apple","orange","banana"];
arr3.unshift("purpose");
console.log(arr3);

//unshift方法返回的也是新数组的长度
let arr5 = ["apple","orange","banana"];
arr5.unshift("purpose");
console.log(arr5.length);
