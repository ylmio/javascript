1.constructor方法是Class类的默认方法，通过new命令，创建一个新的实例对象时，会自动调用此方法。一个类必须有constructor()方法，如果创建类的时候，没有显示的定义该方法，一个空的 constructor()方法会被默认添加。

```javascript
class Wangpa{

}

//等同于
class Wangpa{
    constructor(){}
}
```

上面定义了一个空的 Wangpa类，Javascript引擎会自动为它添加一个空的 constructor() 方法。



2.constructor() 方法默认返回实例对象即 this

```javascript
class Wangpa{
    constructor(){
        return Object.create(null);
    }
}

console.log(new Wangpa() instanceof Wangpa); //false
```

上面的代码中，constructor() 函数返回一个全新的对象，结果导致实例对象不是 Wangpa 类的实例。

3.类必须使用 new 命令调用，否则会报错

```javascript
//构造函数不使用 new 命令 也不会报错
function Person(){

}
let p1 = Person();
let p2 = new Person();
console.log(p1);
console.log(p2);


//类必须使用 new 命令调用，否则会报错。这是类与普通构造函数的主要区别，后者不用 new 也可以执行 
class Wangpa{
    constructor(){
        return Object.create(null);
    }
}

let xiaowang = Wangpa();//center.html:81 Uncaught TypeError: Class constructor Wangpa cannot be invoked without 'new'
```











