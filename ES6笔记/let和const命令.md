<font color="red">let</font> 声明的变量，只能在 <font color="red">let</font> 命令所在的代码块内有效。

```javascript
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

<font color="red">for</font> 循环的计数器，很适合使用 <font color="red">let</font> 命令，因为计数器 <font color="red">i</font>只在循环体内有效，在循环体外引用就会报错。

```javascript
for (let i = 0; i < 10; i++) {
  // ...
}

console.log(i);
// ReferenceError: i is not defined
```

上面的代码中，计数器 <font color="red">i </font> 只在循环体内有效，在循环体外引用就会报错。

下面的代码如果使用 <font color="red">var</font> ，最后输出的是<font color="red">10</font>

```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```

上面的代码中，<font color="red">i</font> 是  <font color="red">var</font> 声明的，在全局范围内都有效，所以全局只有一个变量 <font color="red">i</font> 。每循环一个，<font color="red">i</font> 的值都会发生改变，而循环内被赋给数组 ，<font color="red">a</font> 的函数内部的<font color="red">console.log(i)</font> ，里面的 <font color="red">i</font>  是指向全局的 <font color="red">i</font> 。也就是说，所有数组`a`的成员里面的`i`，指向的都是同一个`i`，导致运行时输出的是最后一轮的`i`的值，也就是 10。

如果使用`let`，声明的变量仅在块级作用域内有效，最后输出的是 6。

```javascript
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

上面代码中，变量`i`是`let`声明的，当前的`i`只在本轮循环有效，所以每一次循环的`i`其实都是一个新的变量，所以最后输出的是`6`。你可能会问，如果每一轮循环的变量`i`都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量`i`时，就在上一轮循环的基础上进行计算。

另外，`for`循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

上面代码正确运行，输出了 3 次`abc`。这表明函数内部的变量`i`与循环变量`i`不在同一个作用域，有各自单独的作用域。