构造函数、实例对象和原型对象之间的关系

构造函数可以实例化对象

构造函数中有一个 prototype 属性，该属性是一个指针，指向构造函数的原型对象

原型对象中有一个 constructor 属性，该属性也是一个指针，指向它的构造函数

实例对象中有一个 _ proto _ 属性，指向该构造函数的原型对象

原型对象中的方法是可以被实例对象直接访问的。

**构造函数和实例对象中的 this 指向的是什么？**

```js
function Person(name,age){
    this.name = name;
    this.age = age;
    console.log("构造函数中的this 输出");
    console.log(this);
}

Person.prototype.hobby = function(){
    console.log("原型对象中的this 输出");
    console.log(this);
}

var per = new Person("小明",20);
per.hobby();
```

控制台输出结果：

![image-20201104164331813](C:\Users\yingl\AppData\Roaming\Typora\typora-user-images\image-20201104164331813.png)

**由此得出：**

原型对象中的方法 this 指向 调用它的实例对象；

构造函数中的方法 this 指向 调用它的实例对象；

接下来我们尝试改变以下原型对象的指向：

```js
function Person(name,age){
    this.name = name;
    this.age = age;
}

Person.prototype.hobby = function(){
    console.log("原型对象中的this 输出");
}


function Student(sex){
    this.sex = sex; 
}

Student.prototype.like = function(){
    console.log("Student构造函数中的方法");
}

//改变Student 原型对象的指向
Student.prototype = new Person("小明",20);
var stu = new Student("男");
console.dir(stu);
stu.hobby();
//stu.like();// Uncaught TypeError: stu.like is not a function
```

控制台输入如下：

![image-20201104172650562](C:\Users\yingl\AppData\Roaming\Typora\typora-user-images\image-20201104172650562.png)

这段代码中，我们首先定义了一个 构造函数 Person，在构造函数内部添加了name 和 age 属性，并在其原型对象上添加了一个hobby方法；然后，我们创建了 另一个构造函数 Student ，在此构造函数内部添加了 sex 属性，并在其原型对象上添加了一个 like 方法；最后，我们通过改变 Student的原型对象的指向，获取到了定义在构造函数Person 上的属性和定义在其原型对象上的hody方法。而定义在 Student 原型对象上的like方法却获取不到了，因为现在的实例对象stu 的指针已经指向了Person的原型对象，所以会报错。

### 总结：

原型对象的指向是可以被改变的

实例对象的原型 _ proto _ 指向的是该对象所在的构造函数的原型对象

构造函数的原型对象 prototype 指向如果改变了，实例对象的原型对象 _ proto _ 也会改变

实例对象和原型对象之间的关系是通过 _ proto _ 原型来联系起来的，这个关系就是原型链

如果原型对象指向改变了，那么就就应该在原型改变之后再添加原型方法，否则会调用不到

```js
//改变Student 原型对象的指向
Student.prototype = new Person("小明",20);
//在原型改变之后，再添加原型方法，否则调用不到
Student.prototype.like = function(){
    console.log("Student构造函数中的方法");
}
```

