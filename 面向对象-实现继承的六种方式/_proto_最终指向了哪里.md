_ proto _ 最终指向了哪里？

**Object.prototype的__proto__ 是Null**

```js
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.eat = function(){
    console.log("喜欢吃糖");
}
var per = new Person("小明",5);
console.dir(per.__proto__);
console.dir(per.__proto__.__proto__);
console.dir(per.__proto__.__proto__.__proto__);
```

控制台打印显示：

![image-20201105101536400](C:\Users\yingl\AppData\Roaming\Typora\typora-user-images\image-20201105101536400.png)

综上所述：

实例对象per的 _ _proto _ _ 指向Person.prototype的   __ proto __ ;

Person.prototype的 __ proto __ 指向Object.prototype 的 __ proto __;

Object.prototype 的 __ proto __指向 null;

据说是终极杀气的JPG:

![img](https://img-blog.csdn.net/20180509110145645)