有两种方式使用in操作符：单独使用和在for-in循环中使用。在单独使用时，in操作符会在通过对象
能够访问给定属性时返回true,无论该属性存在于实例中还是原型中。看一看下面的例子。

    //定义一个空的构造函数
    function Person(){

    }
    //将属性和方法添加到构造函数的原型对象中
    Person.prototype.name = "李白";
    Person.prototype.age = 60;
    Person.prototype.job = "诗人";
    Person.prototype.sayName = function(){
        console.log(this.name);
    };
    //调用构造函数来创建新对象
    var person1 = new Person();
    var person2 = new Person();

    console.log(person1.hasOwnProperty("name"));//false
    console.log("name" in person1);//true

    person1.name="杜甫";
    console.log(person1.name);//"杜甫 " 来自实例
    console.log(person1.hasOwnProperty("name"));//true
    console.log("name" in person1);//true

    console.log(person2.name);//"李白 " 来自原型
    console.log(person2.hasOwnProperty("name"));//false
    console.log("name" in person2);//true

    delete person1.name;
    console.log(person1.name);//"李白 " 来自实例
    console.log(person1.hasOwnProperty("name"));//false
    console.log("name" in person1);//true
    
在以上代码的执行的整个过程中，name属性要么是直接在对象上访问到的，要么是通过原型访问到的。因此，调用"name" in person1始终都会返回true,无论该属性存在于实例中还是存在于原型中。同时使用hasOwnProperty()和in操作符，就可以确定该属性到底是存在于实例中，还是存在于原型中，如下所示。

    function hasPrototypeProperty(object,name){
        return !object.hasOwnProperty(name)&&(name in object)
    }

由于in操作符只要通过对象能够访问到属性就返回true,hasOwnProperty()只在属性存在于实例中才返回true,因此只要in操作符返回true而hasOwnProperty()返回false，就可以确定属性是原型中的属性。下面来看一看上面那定义的函数hasPrototypeProperty()的用法。

    function hasPrototypeProperty(object,name){
        return !object.hasOwnProperty(name)&&(name in object)
    }
    //定义一个空的构造函数
    function Person(){

    }
    //将属性和方法添加到构造函数的原型对象中
    Person.prototype.name = "李白";
    Person.prototype.age = 60;
    Person.prototype.job = "诗人";
    Person.prototype.sayName = function(){
        console.log(this.name);
    };
    //调用构造函数来创建新对象
    var person = new Person();
    console.log(hasPrototypeProperty(person, "name"));//true 说明读取的是原型中属性

    person.name = "杜甫";
    console.log(hasPrototypeProperty(person, "name"));//false 说明读取的是实例中的属性
    
在这里，name属性先是存在于原型中，因此hasPrototypeProperty()返回true.当在实例中重写name属性后，该属性就存在于实例中了，因此hasPrototypeProperty()返回false.即使原型中仍然有name属性，但由于现在实例中也有了这个属性，因此原型中的name属性就用不到了。
在使用for-in循环时，返回的是所有能够通过对象访问的、可枚举的属性，其中既包括存在于实例中的属性，也包括存在于原型中的属性。
