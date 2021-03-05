注意点：

**1.严格模式**

类和模块的内部，默认就是严格模式，所以不需要是 use strict 指定运行模式。

**2.不存在变量提升**

类不存在变量提升（hoist），这一点与 ES5 完全不同。

```javascript
new Too();//ReferenceError
class Too{}
```

上面的代码会报错，因为 ES6 不会把类的声明提升到头部。这与后文提到的类的继承有关，必须保证子类在父类之后定义。

```javascript
{
    let Foo = class{};
    class Bar extends Foo {
        //...
    }
}
```

上面的代码不会报错，因为 Bar 继承 Foo 的时候已经有定义了。但是，如果存在 class 的提升，就会报错。因为class会被提升到代码头部，而 let 命令是不提升的，所以会导致 Bar 继承 Foo 的时候，Foo还没有被定义。 

**3.name 属性**

name属性总是返回定义在class 关键字后面的类名

```javascript
let Foo = class dasf{};
console.log(Foo.name);//dasf
```

**4.Generator 方法**

如果某个方法之前加上星号（*），就表示该方法是一个 **Generator ** 函数。

**5.this 指向**

类的方法内部如果含有 this ，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能会报错。

```javascript
class Clean{
    cleanDesk(time){
        console.log(this.time +" clean the desk");//含有this，单独使用此方法会报错
    }
    cleanRoom(){

    }
}

let c1 = new Clean();
const { cleanDesk } = c1;
cleanDesk("7:00");// Uncaught TypeError: Cannot read property 'time' of undefined
```

上面的代码中，cleanDesk 方法中的this默认指向Clean类的是实例。但是如果将这个方法提取出来单独使用，this 会指向该方法运行时所在的环境，（由于class内部是严格模式，所以this实际指向的是undefined）,从而找不到 time 而报错。

一个比较简单的解决办法，就是在构造方法中绑定 this ,这样就不会找不到 time 参数了。

```javascript
class Clean{
    constructor(time){
        this.time = time;
        this.cleanDesk = this.cleanDesk.bind(this);//绑定this
    }
    cleanDesk(){
        console.log(this.time +" clean the desk");
        this.cleanRoom();
    }

    cleanRoom(){
        console.log("18:00 clean the room")
    }
}

let c1 = new Clean("7:00");
let { cleanDesk } = c1;
// c1.cleanDesk();
cleanDesk();
```

另一种解决办法是使用箭头函数

```javascript
class Datas{
    constructor(){
        this.getData = () => this;
    }
    getData(){
        console.log("从此获取到一些数据");
    }
}

let dr = new Datas();
console.log(dr.getData() === dr); //true
const { getData } = dr;
getData();//?
```

箭头函数内部的`this`总是指向定义时所在的对象。上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象，所以`this`会总是指向实例对象。