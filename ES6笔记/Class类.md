1.传统上我们通过构造函数来生成实例对象

```javascript
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function () {
    return '(' + this.x + ',' + this.y + ')';
};

var p = new Point(1, 2);
console.log(p.toString()); //(1,2)
```

现在，我们通过 Class 来生成实例对象

```javascript
class Point{
    //constructor 构造方法
    constructor(x,y){
        //this 代表实例对象
        this.x = x;
        this.y = y;
    }
    toString(){//方法前不需要加 function关键字,否则会报错
        return '(' + this.x + ',' + this.y + ')'
    }
    makeOhter(){//方法和方法之间也不要加 “,” 分割，否则也会报错

    }
}

var pp = new _Point(1,2);
console.log(pp.toString());//(1,2)
```

ES6可以看成是一个语法糖，绝大部分功能，ES5都可以做到。新 class 语法让对象原型的写法更清晰，更像面向对象编程。



2.类的数据类型就是函数 function；类本身指向构造函数

```javascript
class getData{
    // ...
}
//类的数据类型就是函数 function
typeof getData //function
//类本身指向构造函数
getData === getData.prototype.constructor; //true
```



3.使用 new 命令，直接实例化一个对象

```javascript
//使用：使用 new 命令可以直接实例化一个对象
class Bar{
    doStuff(){
        console.log("to do something");
    }
}
let one = new Bar();
one.doStuff();//to do something
```



4.事实上类的所有方法都定义在类的 prototype 属性上

```javascript
//构造函数的 prototype 属性，在 ES6 "类"上面继续存在
class DoWhat{
    toShoping(){

    }
    toRunning(){

    }
    toPlaying(){

    }
}

//等价于
DoWhat.prototype = {
    toShoping(){

    },
    toRunning(){

    },
    toPlaying(){

    }
}
```

5.在类的实例上调用的方法，其实就是调用的类的原型上的方法

```javascript
class Buffs{
    //....
}
let b = new Buffs();
b.constructor = buffs.prototype.constructor;//true
```

上面的代码中，b是buffs的实例，b的 constructor() 方法其实就是Buffs类原型的 constructor() 方法

6.Object.assign()可以很方便的一次添加多个方法

```javascript
//由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。
class Pint{

}
Object.assign(Pint.prototype,{//此处易写成Pint
    toPlaying(){
        console.log("toPlaying");
    },
    toRunning(){
        console.log("toRunning");
    },
    toSinging(){
        console.log("toSinging");
    }
})

let p = new Pint();
p.toPlaying(); //toPlaying
p.toRunning(); //toRunning
p.toSinging(); //toSinging
```

7.类prototype的constructor属性均指向类本身，这一特征与ES5表现一致

```javascript
//prototype 的constructor属性指向类的本身
class Person{

}
console.log(Person.prototype.constructor === Person); //true
```