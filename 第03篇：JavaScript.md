### 001：如何一次性渲染10万条数据？✔️

1. 虚拟列表
2. 分页加载
3. 延迟渲染：定时器
4. 数据分块加载：requestAnimationFrame、document.createDocumentFragment
5. 使用 Web Worker

### 002：如何理解原型链？✔️

思路：⾸先要说什么是原型，为什么要设计原型（共享属性和⽅法），然后说属性和⽅法查找的顺序，⾃然⽽然就谈到了原型链。原型链可以引申到继承。

回答：原型链是实现对象继承的核心机制，每个对象都有一个隐式原型（`__proto__`），指向其构造函数的 `prototype`（显示原型），当访问对象的属性或方法时，首先会在对象自身的属性中查找，如果未找到，则沿着对象的隐式原型（`__proto__`）向上查找，直到找到目标属性或方法。如果查找到原型链的顶端（即`Object.prototype`），仍未找到，则返回`undefined`。原型链的终点是`null`。

1. **继承与共享**：通过原型链，对象可以共享原型上的属性和方法，实现基于原型的继承。
2. **性能优化**：将方法定义在原型上，可以避免每个实例重复创建方法，节省内存。
3. **灵活操作**：可以使用`Object.create`创建指定原型的新对象，或通过`Object.setPrototypeOf`动态修改对象的原型。

### 003：传值与传址

传值：值传递，原始类型（String、Number、Boolean、null、undefined、Symbol、BigInt）

传值：地址传递，对象类型（对象、数组、函数..）

### 004：如何准确判断数组类型 ✔️

- 方法1：`Object.prototype.toString.call(target).slice(8, -1) === 'Array'`（强烈推荐）
- 方法2：`Array.isArray(target)`
- 方法3：`target.constructor === Array`
- 方法4：`target instanceof Array`

### 005：数组常用方法

参考 「第5章·数组对象APIs」

### 006：如何理解深浅拷贝？✔️

浅拷贝：只复制对象的第一层属性，如果属性是引用类型，则复制的是引用（指针），而不是实际的值

- `Object.create()`
- `Object.assign()`
- `...`：扩展运算符

深拷贝：完全复制对象的所有层级属性，生成一个全新的对象

- `JSON.parse(JSON.stringify(object))`
  - **局限性**：忽略 `undefined`、`Symbol` 和函数，不能处理循环引用和特殊对象。
- 递归遍历复制
  - 通过递归逐层复制值，需处理循环引用和特殊对象。
- 使用第三方库（如：lodash.cloneDeep）

### 008：清空数组元素

- `arr.length = 0`：没有重新开辟内存（推荐）
- `arr = []`：重新开辟内存

### 009：call/bind/apply 的区别 ✔️

它们都是用于改变函数 `this` 指向的方法：

1. `call(this, ...args)`：修改 `this` 指向并 **立即执行函数**；
2. `apply(this, [..args])`：修改 `this` 指向并 **立即执行函数**，参数以 **数组** 形式传递；
3. `bind(this, ...args)`：修改 `this` 指向并 **返回新函数**，不会立即执行。

### 010：对象继承 ✔️

1. 原型链继承：通过将一个对象实例作为另一个对象的原型来实现继承。优点是简单易懂，缺点是所有子类实例共享同一原型对象，存在属性和方法被共享修改的风险。
2. 构造函数继承：通过在子类构造函数中使用父类构造函数并传递参数来实现继承。优点是可以在子类实例上执行父类构造函数中的代码，缺点是无法继承父类原型链上的属性和方法。
3. 组合继承：结合了原型链继承和构造函数继承的优点，在子类构造函数中调用父类构造函数以及将一个对象实例作为另一个对象的原型来实现继承。优点是既可以继承父类构造函数中的属性和方法，又可以继承父类原型链上的属性和方法，缺点是会调用两次父类构造函数。
4. 寄生继承：在原型式继承的基础上，增强对象，返回新对象。优点是不必为了指定子类的原型而调用父类的构造函数，缺点是由于没有使用严格的语法，可能会给其他开发者带来困扰。
5. ES6 的 class 继承：通过 `class` 关键字和 `extends` 关键字来实现继承。优点是语法简单，易于理解，缺点是需要使用 ES6 中的新特性，不支持旧版浏览器。

综合考虑，ES6 的 class 继承是 JavaScript 中对象继承的最优方案，因为它语法简单、易于理解，同时可以轻松地继承父类构造函数中的属性和方法以及父类原型链上的属性和方法。

### 011：有哪些数据类型及其区别是什么？✔️

原始数据类（原始数据类型）：`Number`、`String`、`Boolean`、`Null`、`Undefined`、`Symbol`、`BigInt`。

引用数据类型：`Object`、`Function`

两种类型的区别在于 **存储位置的不同**：（*了解*）

- 原始数据类型：存储在 **栈** 中，占据空间小、大小固定，属于被频繁使用数据；
- 引用数据类型：存储在 **堆** 中，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

### 012：typeof 类型判断 ✔️

1. typeof 能否正确判断类型？
   - 对原始类型（除 `null` 返回 `object` 外）能正确判断。
   - 对对象类型，除函数返回 `function` 外，其他都返回 `object`。
   - 因此，`typeof` 无法精确区分对象的具体类型。
2. typeof 和 instanceof 的区别？
   - typeof：判断数据类型（原始类型 + `object`/`function`）
   - instanceof：判断对象是否是某构造函数的实例。
3. 补充说明：
   - **`typeof null` 返回 `object`**：这是 JavaScript 的历史遗留问题，属于语言设计缺陷。
   - **`instanceof` 的原理**：通过检查对象的原型链是否包含构造函数的 `prototype` 属性。
   - **`typeof` 的局限性**：无法区分数组、对象、`null` 等，因为它们都返回 `object`。

### 013：闭包是什么? 闭包的用途? ✔️

**闭包**是由 **词法环境** 和 **函数** 组成的。当一个内部函数引用外部函数的变量时就会形成闭包，如果这个内部函数作为外部函数的返回值，就会形成 **词法环境的引用闭环**，导致引用的变量常驻内存，可能引发 **内存泄漏**。闭包突破了函数作用域的限制，使函数内外能够沟通，同时也是实现私有方法或属性、暴露公共方法的渠道。

特性：封闭性 / 持久性

用途：

1. 防止全局变量污染；
2. 封装私有化；
3. 模块化开发（实现公有变量）
4. 作缓存

缺陷：内存泄露

### 014：简述事件循环原理 ✔️

[参考这里 >>](https://gitee.com/lihongyao/JavaScript/blob/master/%E7%AC%AC16%E7%AB%A0%20%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.md)

**核心概念**

JavaScript 是单线程语言，**事件循环**是其实现异步非阻塞的关键机制，通过 **任务队列** 和 **循环调度** 处理任务。

**运行流程**

1. **调用栈（Call Stack）**
   - 同步代码按顺序执行，形成调用栈（如函数调用）。
   - 遇到异步任务（如 `setTimeout`、`Promise`）时，交给 **Web APIs** 处理。
2. **任务队列（Task Queues）**
   - 宏任务队列（MacroTask Queue）：
     - 包含 `setTimeout`、`setInterval`、DOM 事件、`I/O` 操作等。
   - 微任务队列（MicroTask Queue）：
     - 包含 `Promise.then`、`MutationObserver`、`queueMicrotask`。
3. **事件循环调度**
   - **步骤 1**：**执行同步代码**（调用栈清空）
   - **步骤 2**：清空 **微任务队列**（优先级高，全部执行）。
   - **步骤 3**：**执行一个宏任务**（只取一个，不是清空整个宏任务队列）
   - **重复**：**重复循环**（回到步骤2，继续清空微任务→执行下一个宏任务）

**示例验证**

```js
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => console.log(3));
}, 0);

setTimeout(() => console.log(4), 0);

Promise.resolve().then(() => console.log(5));
```

输出顺序：`1 → 5 → 2 → 3 → 4`

执行过程：

1. 同步代码：`1`
2. 清空微任务：`5`
3. 执行第一个宏任务（`setTimeout 2`），输出`2` → 其回调中产生微任务`3` → **立即清空微任务**，输出`3`
4. 执行下一个宏任务（`setTimeout 4`），输出`4`

### 015：给出代码的输出顺序

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
  console.log('promise2')
}).then(function () {
  console.log('promise3');
});
console.log('script end');
```

主队列：script start → async1 start → async2 → promise1 → promise2 → script end

微任务：async1 end → promise3

宏任务：setTimeout

1. 执行全局代码，打印出 'script start'。
2. 调用 `async1()`，输出 'async1 start'。
3. 在 `async1()` 中遇到 `await async2()`，调用 `async2()`。
4. 在 `async2()` 中打印出 'async2'。
5. 返回到 `async1()`，因为 `await` 等待 `async2()` 的 Promise 完成，所以暂停执行。
6. 打印出 'promise1'。
7. 创建一个 Promise，并立即调用其构造函数中的回调函数。
8. 打印出 'promise2'。
9. 调用 `resolve()`，Promise 进入已解决状态。
10. 打印出 'script end'。
11. 因为 Promise 已解决，继续执行 `.then()` 的回调函数。
12. 打印出 'promise3'。
13. 在宏任务队列中设置一个定时器任务。
14. 当前任务执行完成，事件循环检查到微任务队列中有一个任务，执行该任务，打印出 'async1 end'。
15. 事件循环继续，从宏任务队列中取出定时器任务，打印出 'setTimeout'。

正确顺序：

```js
script start
async1 start
async2
promise1
promise2
script end
async1 end
promise3
setTimeout
```

### 016：输出什么? 为什么?

```js
var b = 10;
(function b(){
    b = 20;
    console.log(b);
})();
```

这段代码将输出 `function b()`。

这段代码展示了函数名与变量名冲突的情况，由于**函数声明具有较高的优先级**，函数名 `b` 优先被解析为函数而不是变量。

### 017：延迟加载脚本有哪些方式？

1. \<script async />：异步加载，加载完成后立即执行，不阻塞 HTML 解析。
2. \<script defer />：延迟加载，HTML 解析完成后按顺序执行，不阻塞 HTML 解析。
3. 动态导入脚本：通过 JavaScript 动态创建 `<script>` 标签，按需加载。
4. 模块化加载（ES Modules）：默认延迟加载，支持模块化开发
5. requestIdleCallback 或 IntersectionObserver：在浏览器空闲或元素进入视口时加载脚本，优化性能

### 018：null和undefined的区别？✔️

- null：空值
- undefined：未定义

### 019：箭头函数和普通函数有什么区别？✔️

1. 箭头函数用 `=>` 定义，普通函数用 `function` 定义。
2. 箭头函数语法更简洁（可省略括号和 `return`）。
3. 箭头函数只能是匿名函数，普通函数可以是匿名或具名函数。
4. 箭头函数没有自己的 `this`，从作用域链上一层继承，普通函数的 `this` 可以动态绑定，并且有调用者决定指向。
5. 箭头函数使用剩余参数（`...args`），普通函数使用 `arguments`。
6. 箭头函数不能作为构造函数（不能使用 `new`）。
7. 箭头函数没有 `prototype` 和 `super`。

> 衍生问题：
>
> Q：为什么箭头函数不能作为构造函数？
>
> A：
>
> 1. 箭头函数没有自己的 `this` 绑定（继承自外层），无法动态绑定到实例。
> 2. 无 `prototype` 属性，无法挂载原型方法。

### 020：JavaScript 和 TypeScript的区别？✔️

1. JavaScript：动态类型，运行时检查类型。
2. TypeScript：静态类型，编译时检查类型，支持类型注解。
3. TypeScript 是 JavaScript 的超集，支持面向对象编程（类、接口、继承、泛型等）。

### 021：为什么说Symbol是基本数据类型？

因为Symbol 是没有构造函数（*constructor*） 的，不能通过 `new Symbol()` 获得实例。

### 022：基本类型为什么也可以调⽅法，⽐如.toFixed() ？ 

基本类型都有对应的包装类，可以调⽅法是因为进⾏了⾃动装箱。 

### 023：['1', '2', '3'].map(parseInt) 输出什么？为什么？

输出：`[1, NaN, NaN]`

解析：

- map回调函数：`(value, index,  array)`

- parseInt语法：`parseInt(string, radix)`

- 第1次遍历：`parseInt("1", 0)`，将1解析为十进制，结果为1

- 第2次遍历：`parseInt("2", 1)`，将2解析为一进制，由于一进制没有数字2，所以返回NaN。

- 第3次遍历：`parseInt("3", 2)`，将3解析为二进制，由于二进制没有数字3，所以返回NaN。

### 024：变量提升 ✔️

JavaScript 代码执行分为 **词法分析阶段** 和 **代码执行阶段**。在词法分析阶段，`var` 声明的变量和函数声明会被提升，但 **`let` 和 `const`不会被提升**。赋值操作和函数表达式也不会被提升。

如果变量声明和函数声明重名，**函数声明的优先级更高**，会覆盖同名的变量声明。为了避免潜在错误，建议尽量避免依赖提升特性。

### 025：为什么 0.1+0.2 ! == 0.3，如何让其相等 ？

这是因为js使用的是IEEE 754标准中的双精度浮点数表示法（*即使用64位的浮点数形式存储数值*），使其无法精确表示某些小数。

解决方案：

1. 将小数转换为整数进行计算：可以将小数乘以一个倍数，使其变为整数，然后进行计算。最后再将结果除以倍数得到小数形式。
2. 使用库或函数处理精度问题：Big.js/math.js/Decimal.js

### 026：为什么有的框架使用 void(0) 替代undefined？

在旧版 JavaScript 中，`undefined` 不是保留关键字，它的值可以被覆盖，可能导致不可预料的结果。为了确保获取原生的 `undefined` 值，有些框架会使用 `void(0)` 来替代直接使用 `undefined`。

### 027：LHS 和 RHS 是什么？会造成什么影响？

LHS（Left-Hand Side）和RHS（Right-Hand Side）是js对变量进行赋值和读取操作时的两种不同类型的引用。

- LHS 引用出现在赋值操作符左侧，用于设置变量的值，如果变量不存在，且在⾮严格模式下，就会创建一个全局变量。
- RHS 引用出现在赋值操作符右侧，用于获取变量的值，如果变量不存在，就会报错 ReferenceError。 

### 028：常⻅的 JS 语法错误类型有哪些？举⼏个例⼦？

1. ReferenceError：引用错误，尝试访问未定义的变量

2. TypeError：类型错误，对不兼容类型执行操作

3. SyntaxError：语法错误，代码不符合语法规则

4. RangeError：范围错误，数值超出允许范围

5. URIError：URI错误，URI处理函数使用不当
6. EvalError：Eval 错误，`eval`函数使用不当（现已很少见

### 030：js 中如何确定 this 的值？✔️

1. **全局作用域**：`this` 指向全局对象（浏览器中为 `window`）。
2. **函数调用**：
   - **普通函数**：
     - 严格模式下，`this` 为 `undefined`。
     - 非严格模式下，`this` 指向全局对象。
   - **方法调用**：`this` 指向所属对象。
   - **构造函数**：`this` 指向实例化的对象。
3. **显式绑定**（`call`、`apply`、`bind`）
   - `this` 指向第一个参数的值（原始类型会转换为包装对象）。
   - 未传递参数时，严格模式下为 `undefined`，非严格模式下指向全局对象。

### 031：说说 new 操作符具体干了什么？✔️

1. 首先创建一个新的空对象
2. 设置原型：将该对象的隐式原型（`__proto__`）指向构造函数的显式原型（`prototype`），以继承原型上的属性和方法。
3. 绑定`this`并执行构造函数
4. 返回对象：
   - 如果构造函数返回一个**引用类型**（如对象、数组、函数等），则返回该引用类型。
   - 如果构造函数返回一个**值类型**（如`undefined`、`null`、数字、字符串等），则返回新创建的对象。

实现原理：

```js
function $New(constructor, ...args) {
  // 1. 创建一个新的空对象
  const obj = {};
  // 2. 将对象的原型指向构造函数的prototype
  obj.__proto__ = constructor.prototype;
  // 3. 绑定this，并执行构造函数
  const result = constructor.apply(obj, args);
  // 4. 返回对象
  return result instanceof Object ? result : obj;
}
```

### 032：let、const、var的区别？✔️

1. **块级作用域**：

   - `let` 和 `const` 具有块级作用域（由 `{ }` 限定）。
   - `var` 没有块级作用域，只有函数作用域和全局作用域。

   块级作用域解决了ES5中的两个问题：

   - 内层变量可能覆盖外层变量
   - 用来计数的循环变量泄露为全局变量

2. **变量提升**：

   - `var` 存在变量提升，可在声明前访问（值为 `undefined`）。
   - `let` 和 `const` 不存在变量提升，声明前访问会报错。

3. **全局属性**：

   - `var` 声明的全局变量会挂载到全局对象（如 `window`）。
   - `let` 和 `const` 不会挂载到全局对象。

4. **重复声明**：

   - `var` 允许重复声明，后声明的变量会覆盖前者。
   - `let` 和 `const` 不允许重复声明。

5. **暂时性死区**：

   在使用 `let`、`const` 命令声明变量之前，该变量都是不可用的。这在语法上，称为 **暂时性死区**。

   - `let` 和 `const` 存在暂时性死区，声明前访问会报错。
   - `var` 不存在暂时性死区。

6. **初始值设置**：

   - `var` 和 `let` 可以不设置初始值。
   - `const` 必须设置初始值。

7. **指针指向**：

   - `let` 允许重新赋值（指针指向可变）。
   - `const` 不允许重新赋值（指针指向不可变）。

| 区别               | `var` | `let` | `const` |
| ------------------ | ----- | ----- | ------- |
| 是否有块级作用域   | ❌     | ✔️     | ✔️       |
| 是否存在变量提升   | ✔️     | ❌     | ❌       |
| 是否添加全局属性   | ✔️     | ❌     | ❌       |
| 是否允许重复声明   | ✔️     | ❌     | ❌       |
| 是否存在暂时性死区 | ❌     | ✔️     | ✔️       |
| 是否必须设置初始值 | ❌     | ❌     | ✔️       |
| 能否改变指针指向   | ✔️     | ✔️     | ❌       |

### 033：如何将一个类似数组转换成真正的数组？

- `Array.prototype.slice.call(arguments)`
- `Array.from(arguments)`
- `[...arguments]`

### 034：XMLHttpRequest 基本使用

```js
// 1. 创建请求对象
let xhr = new XMLHttpRequest();
// 2. 配置请求
xhr.open('POST', '/api/login', true);
// → 设置请求头
xhr.setRequestHeader('Content-Type', 'application/json');
// → 设置响应类型
xhr.responseType = 'json';
// 3. 发送请求
xhr.send(
  JSON.stringify({
    username: 'admin',
    password: '123',
  })
);
// 4. 监听请求
xhr.onload = function () {
  if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
    console.log(xhr.response);
  } else {
    console.log('err');
  }
};
```

`readyState` 主要有5个状态：

- `0`：UNSENT，代理被创建，但尚未调用 `open()` 方法。
- `1`：OPENED，`open()` 方法已经被调用。
- `2`：HEADERS_RECEIVED，`send()` 方法已经被调用，并且头部和状态已经可获得。
- `3`：LOADING，响应体部分正在被接收。
- `4`：DONE，请求操作已经完成。这意味着数据传输已经彻底完成或失败。

### 035：谈谈你对Promise的理解？✔️

`Promise` 是 js 中用于处理异步操作的对象，它解决了传统回调函数的 **回调地狱** 问题，使异步代码更易读、更易维护。核心特点：

1. 三种状态：
   - Pending（进行中）：初始状态。
   - Fulfilled（已成功）：操作成功完成。
   - Rejected（已失败）：操作失败
2. 链式调用：
   - 通过 `.then()` 处理成功结果，`.catch()` 处理失败结果，支持链式调用，避免嵌套。
3. 错误冒泡：
   - 链式调用中，错误会一直传递到最近的 `.catch()`，便于集中处理。
4. 静态方法
   - `Promise.all()`：并行执行多个 Promise，全部成功时返回结果数组，任一失败则立即抛出错误。
   - `Promise.allSettled()`：并行执行多个 Promise，无论成功或失败，均返回结果数组，记录每个 Promise 的最终状态。
   - `Promise.any()`：并行执行多个 Promise，返回第一个成功的结果，全部失败则抛出 AggregateError。
   - `Promise.race()`：并行执行多个 Promise，返回第一个完成（无论成功或失败）的结果。
   - `Promise.try()`：将同步代码包装为 Promise，统一处理同步和异步错误（*提案中*）。
   - `Promise.withResolvers()`：快速创建 Promise 并暴露其 `resolve` 和 `reject` 方法，便于控制异步逻辑（*提案中*）。
   - `Promise.resolve()` / `Promise.reject()`：快速创建成功或失败的 Promise。

### 036：谈谈你对 async/await 的理解？✔️

`async/await` 是 js 中简化异步编程的语法糖，基于 `Promise` 实现，旨在让异步代码更接近同步代码的书写和阅读体验。

1. 在函数前添加 `async` 关键字，该函数会隐式返回一个 `Promise`。函数内部可以使用 `await` 来等待异步操作完成。
2. `await` 用于暂停 `async` 函数的执行，直到其后的 `Promise` 完成（成功或失败）。如果 `Promise` 成功，`await` 返回结果；如果失败，则抛出异常，可通过 `try/catch` 捕获。

优势：

1. **代码简洁**：避免了 `Promise` 的链式调用，减少嵌套。
2. **错误处理**：使用 `try/catch` 统一处理同步和异步错误。
3. **逻辑清晰**：以同步的方式表达异步逻辑，更易理解和维护。

### 037：localStorage vs. cookie vs. sessionStorage ✔️

- 存储大小：Cookie 4k；Storage 5M；
- 有效期：Cookie 拥有有效期；localStorage 永久存储；sessionStorage 会话存储
- Cookie 会发送到服务器端，存储在内存中；Storage 只会存储在浏览器端
- 路径：Cookie 有路径限制，Storage 只存储在域名下
- API：Cookie 没有特定的 API；Storage 有对应的 API；
- 跨域

