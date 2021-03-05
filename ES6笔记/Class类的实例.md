与ES5一样，实例的属性除非显示的定义在其本身（即定义在this对象上），否则都定义在类的原型上（即定义在 Class 上）。

```javascript
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        //...
    }
}

let xiaop = new Point();

console.log(xiaop.hasOwnProperty("x"));//true
console.log(xiaop.hasOwnProperty("y"));//true
console.log(xiaop.hasOwnProperty("toString"));//false
console.log(xiaop.__proto__.hasOwnProperty("toString"));//true
```

上面的代码中，x 和 y 都是实例对象 xiaop 自身的属性（因为定义在变量 this 上），所以hasOwnProperty()方法返回 true，而 toString 是原型对象上的属性（因为定义在Point类上），所以返回false。

2.与 ES5 一样，所有实例对象共享一个原型对象

```javascript
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        //...
    }
}

let p1 = new Point(1,3);
let p2 = new Point(2,3);
console.log(p1.__proto__===p2.__proto__);//true
```

这意味着，我们可以通过实例的 __proto__ 属性为 "类" 添加方法。

```javascript
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        //...
    }
}

let p1 = new Point(1,3);

p1.__proto__.toPlaying = ()=>{
    console.log("to play basketball");
}

let p2 = new Point(1,3);

p2.toPlaying();// to play basketball
```



但是__proto__ 不是语言本身的特性，所以不建议。可以通过 Object.getPrototypeOf() 获取实例对象的原型，然后再为类添加方法。

```javascript
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        //...
    }
}

let p1 = new Point(1,3);

Object.assign(Object.getPrototypeOf(p1),{
    toRunning(){
        console.log("to running");
    }
});

let p2 = new Point(1,3);

p2.toRunning();// to running
```

通过实例的 __proto__ 改写类的原型会影响到所有实例，所以需要特别谨慎。



3.类的属性名可以采用表达式

```javascript
//类的属性名可以采用表达式
let bwork = "work";
class Student{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    // work(){
    //     return (this.name + "做作业")
    // }
    [bwork](){
        return (this.name + "做作业")
    }

}

let s1 = new Student("zhuli",20);
console.log(s1);
console.log(s1.work());
```

4.类也可以采用表达式的形式来定义

```javascript
//类也可以采用表达式的形式来定义
let MyWork = class Mw{
    constructor(starttime,endtime){
        this.name = Mw.name;//Mw 只能在类的内部使用
        this.starttime = starttime;
        this.endtime = endtime;        
    }
    when(){
        return ('类的名字：'+this.name + '，开始时间：'+ this.starttime + "，结束时间：" + this.endtime)
    }
}

let mw1 = new MyWork("10:00","18:00");//不能使用 new Mw("10:00","18:00")
console.log(mw1.when());//类的名字：Mw，开始时间：coding，结束时间：10:00
```

上面示例，类的名字是Mw，但是 Mw只在类的内部使用，指代当前类。在 Class 外部，这个类只能用 MyWork 。如果类的内部没有用到Mw 的话，可以省略，像下面这样定义类就可以了。

```javascript
let MyWork = class {//...}
```

5.采用class 表达式可以写出立即执行函数

```javascript
//采用class 表达式可以写出立即执行函数
let person = new class{
    constructor(name){
        this.name = name;
    }
    sayName(){
        console.log('My name is: '+ this.name); 
    }
}('TomP');
person.sayName();//My name is: TomP
```

上面的代码中，person 是一个立即执行的类的实例。