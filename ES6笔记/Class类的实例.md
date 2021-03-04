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

