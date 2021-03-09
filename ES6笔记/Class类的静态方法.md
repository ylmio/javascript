什么是**静态方法**

类相当于实例的原型，<u>所有在类中定义的方法都会被实例继承</u>。如果在方法前面加上 <font color="red">static</font> 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就成为"静态方法"

```javascript
class MakeFoo{
    static classMethod(){
        console.log('hello');
    }
}
//只能通过类来调用
MakeFoo.classMethod();//hello

//在实例中调用报错未定义
let smallF = new MakeFoo();
smallF.classMethod();// Uncaught TypeError: smallF.classMethod is not a function
```

上面的例子表明，静态方法只能通过类来调用，实例无法继承，如果在实例上调用静态方法，就会抛出错误，表示该方法不存在。

注意，如果静态方法中包含 <font color="red">this</font> 关键字，这个 <font color="red">this</font>  指向的是类，而不是实例。

```javascript
class MakeFoo{
    static classMethod(){
        //this 指向类，而不是实例
        this.classWrite();
    }
    static classWrite(){
        console.log("hello world!");
    }
    classWrite(){
        console.log("你好，世界！");
    }
}

MakeFoo.classMethod();// hello world!
```

上面的代码中，静态方法<font color="red">classMethod</font> 中 调用了 <font color="red">this.classWrite</font> 方法，这里的  <font color="red">this</font> 指向的是<font color="red">MakeFoo</font>类，而不是<font color="red">MakeFoo</font>的实例，等同于调用了<font color="red">MakeFoo. classWrite</font>。另外，从这个例子可以看出，静态方法可以与非静态方法重名。

**父类的静态方法可以被子类继承**

```javascript
class MakeFoo{
    static classWrite(){
        console.log("hello world!");
    }
}

class SmallFoo extends MakeFoo{

}

SmallFoo.classWrite();// hello world!
```

上面的代码中，父类 <font color="red">MakeFoo</font>有一个静态方法，子类 <font color="red">SmallFoo</font>可以调用这个方法。

静态方法也可以从<font color="red">super</font>对象上来调用

```javascript
class MakeFoo{
    static classWrite(){
        return '你好,'
    }
}

class SmallFoo extends MakeFoo{
    static myWrite(){
        console.log(super.classWrite() + 'world')
    }
}

SmallFoo.myWrite();// 你好,world
```

**类的静态属性**

类的静态属性指的是<font color="red">Class</font> 类本身的属性，即<font color="red">Class.propName</font>,而不是定义在实例对象 <font color="red">this</font>上的属性。

```javascript
class Foo{}
Foo.method = "GET";
console.log(Foo.method);//GET
```

上面的写法定义了一个新静态属性 <font color="red">method</font> ，目前只有这种写法可行，因为<u>ES6明确规定，Class 内部只有静态方法，没有静态属性</u>。新提案提供了一个解决方法，就是在实例属性的前面，加上 <font color="red">static</font> 关键字。

```javascript
class Foo{
    static myStaticProp = 41
    funs1(){
        console.log(Foo.myStaticProp);
    }
}
let f1 = new Foo();
f1.funs1();//41
```

