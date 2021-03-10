Class可以通过 <font color="red"> extends </font>关键字实现继承。这比<font color="red"> *ES5 通过修改原型链实现继承*</font>，要清晰和方便很多。

```javascript
class Foo{
    getValue(){
        console.log("dddd");
    }
}
class SmallFoo extends Foo{

}
let small1 = new SmallFoo();
small1.getValue();//dddd
```

上面的代码定义了一个 SmallFoo 类，该类通过  <font color="red"> extends </font>关键字，继承了  <font color="red"> Foo </font>的所有属性和方法。

```javascript
class Point{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    showMyColor(){
        return "this is my color!"
    }
}
class ColorPoint extends Point{
    constructor(x,y,color){
        super(x,y);//调用父类的 constructor(x,y);
        this.color = color;
    }
    sayColor(){
        return this.color + ',' + super.showMyColor();//调用父类的 showMyColor()方法
    }
}

let c1 = new ColorPoint('name','age','red');
console.log(c1);// {name: "name", age: "age", color: "red"}

let c1result = c1.sayColor();
console.log(c1result);//red,this is my color!
```

在上面的代码中，在 <font color="red">constructor </font>>和 <font color="red">sayColor </font>方法之中，出现了<font color="red">super </font> 关键字，它**在这里表示父类的构造函数**，用来新建父类的 <font color="red">this </font>对象。

子类必须在 <font color="red">constructor </font>方法中调用  <font color="red">super </font> 方法，否则新建实例时会报错。这是因为子类自己的 <font color="red">this</font> 对象必须通过父类的构造函数来完成塑造。如果不调用   <font color="red">super </font> 方法，子类就得不到  <font color="red">this</font>  对象。

```javascript
class Point{

}
class SmallPoint extends Point{
    constructor(){//等于重写了constructor，不写会默认添加，不报错
		//super();
    }
}
let s1 = new SmallPoint();
console.log(s1);//Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
```

上面的代码中，<font color="red">SmallPoint</font> 继承了父类 <font color="red">Point</font>，但是它的构造函数没有调用 <font color="red">super</font> 方法，导致新建实例时报错。

**ES5的继承，实质是先创造子类的实例对象 <font color="red">this</font> ,然后再将父类的方法添加到 <font color="red">this</font> 上面（<font color="red">Parent.apply(this)</font>）。ES6的继承机制完全不同，实例是先将父类实例对象的属性和方法，加到 <font color="red">this</font> 上面（所以必须先调用<font color="red">super</font>方法）,然后再用子类的构造函数修改  <font color="red">this</font> 。**

如果子类没有定义 <font color="red">constructor</font>方法，则会默认被添加，代码如下。也就是说，不管有没有显示定义，每个子类都有  <font color="red">constructor</font>方法。

```javascript
class SmallPoint extends Point{
}
//等同于
class SmallPoint extends Point{
    constructor(...args){
        super(...args);
    }
}
```

**另一个需要非常重要的地方在于，在子类的构造函数中，只用调用了 <font color="red">super</font> 之后，才可以使用 <font color="red">this</font> 关键字，否则会报错。这是因为子类实例的创建基于父类实例，而只有 <font color="red">super</font> 才能调用父类实例。**

```javascript
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
class SmallPoint extends Point{
    constructor(x,y,color){
        this.color = color;//Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
        super(x,y);
        this.color = color;//正确
    }
}
```

上面代码中，子类的 <font color="red">constructor</font>方法没有调用 <font color="red">super</font>之前就使用 <font color="red">this</font>关键字，结果报错，而放在  <font color="red">super</font>方法之后就是正确的。

下面是生成子类实例的代码

```javascript
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
class SmallPoint extends Point{
    constructor(x,y,color){
        super(x,y);
        this.color = color;
    }
}

let cp = new SmallPoint(20,3,"green");
console.log(cp);// SmallPoint {x: 20, y: 3, color: "green"}

console.log(cp instanceof Point);//true
console.log(cp instanceof SmallPoint);//true
//<font color="red"></font>
```

经过  <font color="red">instanceof</font>  验证 cp 同时是 Point 和 SmallPoint 两个类的实例，这与 ES5 的行为完全一致。

**最后，父类的静态方法，也可以被子类继承。**

```javascript
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    static copySome(){
        console.log("来点什么....");
    }
}
class SmallPoint extends Point{
    constructor(x,y,color){
        super(x,y);
        this.color = color;
    }
}

SmallPoint.copySome();//来点什么....
```

**Object.getPrototypeOf()**	

Object.getPrototypeOf()可以用来从子类上获取父类，进而判断一个类是否继承了另一个类

```javascript
class Point{

}
class SmallPoint extends Point{

}

let a = Object.getPrototypeOf(SmallPoint).name;
console.log(a);//Point
console.log(Object.getPrototypeOf(SmallPoint)===Point);//true
```

