//创建一个数组
var newArray = [1,1,2,3,3,"a","a","bb",false,false,true];

// function unique(arr){
//     return [...new Set(arr)];
// }
//
// let a = unique(newArray);
// console.log(a);

/*
1.ES6提供的新数据结构Set,类似于数组,但是成员的值都是唯一的,无重复值.Set本身是一个构造函数,用来生成Set数据结构.
2.Array.form方法可以将Set数据结构转换成数组.我们可以利用此特性编写一个去重函数.
*
* */

function unique(arr){
    return Array.from(new Set(arr));
}

let b = unique(newArray);
console.log(b);

//字符串去重
let string = "aabbccdd";
let c = unique(string).join("");
console.log(c);
console.log(typeof c);

//set实现交集 并集 差集
let a = new Set(["1","2","3"]);
let  d = new Set(["4","2","3"]);

//并集
let unique2 = new Set([...a,...d]);
console.log(unique2);

//交集
let e = new Set(["1","2","3"]);
let f = new Set(["4","2","5"]);
let intersect = new Set([...e].filter(x=>f.has(x)));

// let intersect = new Set([...e].filter(function (x) {
//     return f.has(x);
// }));
console.log(intersect);

//差集
let g = new Set(["1","2","3","4","5"]);
let h = new Set(["1","2","3"]);

let difference = new Set([...g].filter(x=>!h.has(x)));
console.log(difference);




