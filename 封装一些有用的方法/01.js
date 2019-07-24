function type(para){
    return Object.prototype.toString.call(para);
}

function typeOf(para){
    return typeof (para)
}

let a = null;
console.log(type(a));//Null
console.log(typeOf(a));//Object

let b = [];
console.log(type(b));//Array
console.log(typeOf(b));//Object

let c = {};
console.log(type(c));//Array
console.log(typeOf(c));//Object

//基本数据类型：string number boolean null undefined
//引用数据类型：object


/*
* type与typeOf在检测string number boolean undefined均相同
* 在检测null时，type返回正确值null,而typeOf方法返回object
* 在检测array时，type返回正确值Array,而typeOf方法返回object
*因为
* Object是js中所有数据类型的父类，所有的数据类型都继承了Object
*
* */
