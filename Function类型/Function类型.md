##### Function类型

每个函数都是**Function**类型的实例，而且都与其他引用类型一样具有属性和方法。由于函数是对象，因此函数名实际上也是一个指向函数对象的指针，不会与某个函数绑定。函数通常是使用**函数声明语法定义**的，如下面的例子所示：

```js
function sum(num1,num2){
    return num1+num2;
}
```
这与下面使用**函数表达式定义函数**的方式几乎相差无几：

```js
var sum=function(num1,num2){
    return num1+num2;
}
```
以上代码定义了变量**sum**并将其初始化为一个函数。有读者可能会注意到，**function**关键字后面没有函数名。这是因为在使用函数表达式定义函数时，没有必要使用函数名--通过变量**sum**即可以引用函数。另外，还要注意函数末尾有一个分号，就像生命其他变量时一样。

最后一种定义函数的方式是使用**Function构造函数**。**Function**构造函数可以接收任意数量的参数，但最后一个参数始终都被看成函数体，而前面的参数则枚举了新函数的参数。来看下面的例子：

```js
var sum=new Function("num1","num2",
    "return num1+num2");//不推荐
```
从技术角度讲，这是一个函数表达式。但是，我们不推荐读者使用这种方法定义函数，因为这种语法会导致解析两次代码（第一次是解析常规ECMAScript代码，第二次是解析传入构造函数中的字符串），从而影响性能。不过，这种语法对于理解“函数是对象，函数名是指针”的概念倒是非常直观的。

由于函数名仅仅是指向函数的指针，因此函数名与包含对象指针的其他变量没有什么不同。换句话说，一个函数可能会有多个名字，如下面的例子所示。

```js
    function sum(num1,num2){
        return num1+num2;
    }
    console.log(sum(10,10));//20

    var anotherSum=sum;
    console.log(anotherSum(10,10));//20

    var sum=null;
    console.log(anotherSum(10,10));//20
```
以上代码首先定义了一个名为**sum（）**的函数，用于求两个值的和。然后，又声明了变量**anotherSum**，并将其设置为与**sum**相等（将**sum**的值赋给**anotherSum**）<u>。注意，使用不带圆括号的函数名是访问函数指针，而非调用函数。</u>此时，**anotherSum**和**sum**就都指向了同一个函数，因此**anotherSum（）**也可以被调用并返回结果。即使将**sum**设置为**null**，让它与函数"断绝关系"，但仍然可以正常调用**anotherSum（）**。

##### 没有重载（深入理解）

将函数名想象为指针，也有助于理解为什么ECMAScript中没有函数重载的概念。请看下面的例子：

```js
function addSomeNumber(num){
    return num+100;
}

function addSomeNumber(num){
    return num+200;
}

var result=addSomeNumber(100);
console.log(result);//300
```
显然，这个例子中声明了两个同名函数，而结果则是后面的函数覆盖了前面的函数。以上代码实际上与下面的代码没有什么区别。
```js
var addSomeNumber=function(num){
    return num+100;
};
addSomeNumber=function(num){
    return num+200;
};
var result=addSomeNumber(100);
console.log(result);//300
```
通过观察重写之后的代码，很容易看清楚到底是怎么回事儿--在创建第二个函数时，实际上覆盖了引用第一个函数的变量addSomeNumber。
#####函数声明和函数表达式
本节到目前为止，我们一直没有对函数声明和函数表达式加以区分。而实际上，解析器在向执行环境中加载数据时，对函数声明和函数表达式并非一视同仁。解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；至于函数表达式，则必须等到解析器执行到它所在代码行，才会真正被解释执行。请看下面的例子。
```js
console.log(sum(10,10));//20
function sum(num1,num2){
    return num1+num2;
}
```
以上代码完全可以正常运行。因为在代码开始执行之前，解析器就已经通过一个名为**函数声明提升**（function declaration hoisting）的过程,读取并将函数声明添加到执行环境中。对代码求值时，JavaScript引擎在第一遍会声明函数并将它们放到源代码树的顶部。所以，即使声明函数的代码在调用它的代码后面，JavaScript引擎也能把函数声明提升到顶部。如果像下面例子所示的，把上面的函数声明改为等价的函数表达式，就会在执行期间导致错误。
```js
console.log(sum(10,10));//Uncaught TypeError: sum is not a function
var sum=function(num1,num2){
    return num1+num2;
}
```
以上代码之所以会在运行期间产生错误，原因在于函数位于初始化语句中，而不是一个函数声明。换句话说，在执行到函数所在的语句之前，变量sum中不会保存有队函数的引用。
