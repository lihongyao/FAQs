### 001：Vue生命周期 ⭐️

Vue 实例从创建到销毁的过程。

[生命周期图示 >>](https://cn.vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram)

[生命周期钩子 >>](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html)

### 002：谈谈你对keep-alive的了解

内置组件，用于缓存和保持组件的状态，以避免重复创建和销毁组件。

### 003：v-**if**和v-show区别

- `v-show`：通过修改元素的 display 属性让其显示或者隐藏；

- `v-if`：通过销毁和重建DOM达到让元素显示和隐藏的效果；

### 004：v-**if**和v-**for**优先级 ⭐️

当 v-if 与 v-for 一起使用时：

- Vue2：v-for的优先级高于v-if
- Vue3：v-if的优先级高于v-for

### 005：**ref**是什么？

`ref` 是一个特殊的属性，用于在模板中给元素或组件注册一个引用。

### 006：谈谈你对nextTick的理解? ⭐️

1. 定义：在下次DOM更新循环结束之后执行延迟回调，在修改数据之后立即使用它，可获取更新后的DOM。

2. 为什么要使用nextTick？

   Vue是异步执行DOM更新的

3. 使用场景

   - 在created钩子函数中进行DOM操作时（因为此时DOM还未挂载渲染）
   - 数据更新之后立即获取更新后的DOM

4. 实现原理

   Vue是异步执行 DOM 更新的，一旦观察到数据变化，Vue 就会开启一个队列，然后把在同一个事件循环当中观察到数据变化的 watcher 推送进这个队列。如果这个 watcher 被触发多次，只会被推送到队列一次。这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和 DOM 操作。而在下一个事件循环时，Vue会清空队列，并进行必要的DOM更新。

### 007：**scoped** 原理 ⭐️

scoped 属性可以将样式作用域限制在当前组件的范围内，避免全局污染。其实现原理是通过给当前组件的所有选择器加上一个唯一的标识符（如 `data-v-xxx`），从而让当前组件的样式仅对带有这个标识符的元素生效。

具体来说，当一个 Vue 组件中使用了 `scoped` 属性时，Vue 在编译组件时会通过 PostCSS 插件（如 postcss-selector-scope）将组件中的所有样式选择器添加一个特殊的属性选择器，以确保样式只作用于当前组件。



### 008：Vue中如何做样式穿透？ ⭐️

1. Vue2

   - 使用 `::v-deep` 选择器：

     ```less
     /* 在父组件中 */
     .parent ::v-deep .child {
       /* 修改子组件的样式 */
     }
     ```

   - 使用 `/deep/` 选择器：

     ```less
     /* 在父组件中 */
     .parent /deep/ .child {
       /* 修改子组件的样式 */
     }
     ```

   - 使用 `>>>` 选择器（仅在单文件组件中有效）：

     ```less
     /* 在父组件中 */
     .parent >>> .child {
       /* 修改子组件的样式 */
     }
     ```

2. Vue3

   - `:deep(.类名)`
   - `::v-deep(.类名)`

3. `!important`

### 009：Vue组件传值 ⭐️

1. `$props ` ⇔ `$emits`
2. `v-model` 
3. `ref`
4. `provide` → `inject`
5. `eventBus`
6. `Vuex` / `Pinia`

### 010：computed、methods、watch有什么区别？

- `computed` 是用于声明计算属性，根据依赖的数据自动计算并缓存结果。
- `methods` 是用于定义组件中的方法，需要手动调用执行。
- `watch` 是用于观察数据的变化并执行相应的操作，适用于对数据变化做出响应或进行异步操作。

### 011：Vuex有哪些属性？

1. `state`：存储应用程序的状态数。
2. `mutaions`：同步状态变更，用于修改 `state` 中的状态。
3. `actions`：异步操作和提交 `mutations`。
4. `getters`：计算属性，用于从 `state` 中派生出新的状态数据。
5. `modules`：模块化管理状态。

### 012：Vuex是单向数据流还是双向数据流？

单向数据流

在 Vuex 中，数据流动是单向的，从 `state`（状态）到 `getters`（计算属性）到视图（组件），最后通过 `mutations`（同步变更）或 `actions`（异步操作）来修改状态。这遵循了 Flux 架构中的单向数据流概念。

当组件需要修改状态时，它们会触发 `mutations` 或 `actions` 来提交一个变更请求，然后在 `mutations` 中进行**同步的状态变更**。这种单向数据流确保了状态的可追踪性，因为所有的状态变更都经过中央的 `mutations`，我们可以清楚地看到每个状态的修改历史。

另外，由于 Vuex 中的状态是响应式的，当状态发生变化时，相关的组件会自动更新视图，从而保持视图与状态的同步。

需要注意的是，尽管 Vuex 的数据流是单向的，但并不意味着数据流只能从状态到视图。视图也可以通过提交 `mutations` 来修改状态，但这应该是通过 `actions` 或其他逻辑的结果，而不是直接在视图中修改状态。

### 013：Vuex中的mutaitons和actions区别

1. mutaions：仅支持同步操作
2. actions：支持异步

### 014：Vuex如何做持久化存储

- localStorage：监听 beforeunload 事件持久化state，每次加载应用时从本地读取
- 插件：vuex-persist

### 015：Vue路由模式 ⭐️

Vue路由模式主要有两种：**哈希模式** / **历史模式**

区别：

1. 表现形式不同
   - 历史模式：https://51plus.cn/index
   - 哈希模式：https://51plus.cn/#/index
2. 路由切换是否向服务器发送请求
   - 历史模式：https://51plus.cn/id → 发送请求
   - 哈希模式：不会发送请求 
3. 哈希模式是默认模式
4. 历史模式比哈希模式更符合传统的URL格式

### 016：介绍一下SPA以及SPA有什么缺点

SPA：**S**ingle-**P**age **A**pplication，单页应用。

优点：

1. 用户体验
2. 前后端分离
3. 可重用性和可维护性高
4. 快速响应

缺陷：

1. 首次加载较慢
2. SEO难度较高
3. 内存占用较大
4. 浏览器兼容性

### 017：双向绑定原理 ⭐️

Vue数据双向绑定原理是通过 **数据劫持结合发布者-订阅者模式** 的方式来实现的，首先是对**数据进行监听**，然后当**监听的属性发生变化时**则告诉订阅者是否要更新，若更新就会**执行对应的更新函数从而更新视图**。

### 018：虚拟DOM ⭐️

1. 什么是虚拟DOM？

   虚拟DOM是一个用于表示真实DOM结构和属性的 **js对象**。这个对象用于对比前后虚拟 DOM 的差异化，然后进行局部渲染从而实现性能上的优化。

2. 为什么要用虚拟DOM？

   浏览器在生成DOM树的时候，非常消耗资源，因此引入虚拟DOM概念通过一定的算法优化之后减少页面重绘和回流，提高页面渲染效率，使页面更加流畅和响应快速。

### 020：Diff算法 ⭐️

Diff算法主要用于比较虚拟DOM，实现局部更新以达到性能优化的目的。

1. Vue2使用 **双向指针** 来进行虚拟DOM的比较，而Vue3在实现上使用了更高效的**单向链表结构**。

2. 在处理列表渲染时，Vue2和Vue3都尽量减少节点的移动，但采用的具体策略略有差异。Vue2使用启发式算法，而Vue3则结合Map数据结构来更高效地定位节点的位置变化。

3. 对于节点移动，Vue2使用splice函数进行数组操作，而Vue3采用了更轻量级的类似React的Fiber架构，实现更高效的节点移动。


总体来说，Vue3的diff算法相比Vue2更加高效，并且新增的静态提升优化方式可以进一步提升渲染性能

### 021：响应式原理 ⭐️

响应式原理3个步骤：数据劫持、依赖收集、派发更新

1. 在创建vue实例的时候，首先通过 `Object.defineProperty()` 对data属性进行劫持，同时创建 Dep 用来搜集使用该 Data 的 Watcher
2. 编译模板时，创建 Watcher，并将 Dep.target 标识为当前 Watcher。在此期间，如果使用到了 Data 中的数据，就会触发 Data 的 get 方法，然后调用 Dep.addSub 将 Watcher 搜集起来。
4. 数据更新时，会触发 Data 的 set 方法，然后调用 Dep.notify 通知所有使用到该 Data 的 Watcher 去更新 DOM。

### 022：data 为什么是函数？

避免数据污染

对象在栈中存储的都是地址，函数的作用就是属性私有化，保证组件修改自身属性时不会影响其他复用组件。

### 023：子组件prop接收数据之后刷新页面，数据丢失怎么处理？

1. 通过后台来保存数据
2. 本地持久化
3. 通过Vuex/Pinia持久化
4. 通过url传递参数，保存在url中

### 024：Vue2 vs Vue3 ⭐️

1. API模式不同

   - Vue2：选项式API
   - Vue3：选项式API / 组合式API
2. 检测机制的变化
   - Vue2 基于Object.defineProperty 实现数据劫持
   - Vue3 基于 ES6的Proxy API 对数据代理，检测的使整个对象。
3. Diff算法优化（*参考020：Diff算法*）
4. 建立数据的方式不同

   - Vue2：在data属性中定义数据
   - Vue3：在 `setup()` 函数中定义数据
5. 生命周期钩子不同

   - Vue3的钩子函数在Vue2的基础上加了on，如：created → onCreated
   - beforeDestory 和 destoryed 更名为 onBeforeUnmount 和 onUnmounted
   - 用setup代替beforeCreate和created。
6. 父子传参不同

   - definProps
7. Vue3引入了新的优化方式——静态提升，通过在编译阶段处理静态节点，减少运行时的开销

总结：**Vue3 性能更高、体积更小、更利于复用、代码维护更方便**

### 025：defineProperty和Proxy的区别？⭐️

Vue 在实例初始化时遍历 data 中的所有属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。并劫持各个属性 getter 和 setter，在数据变化时发布消息给订阅者，触发相应的监听回调，而这之间存在几个问题。

1.  初始化时需要遍历对象所有 key，如果对象层次较深，性能不好

2. 通知更新过程需要维护大量 dep 实例和 watcher 实例，额外占用内存较多
3. Object.defineProperty 无法监听到数组元素的变化，只能通过劫持重写数组方法
4. 动态新增，删除对象属性无法拦截，只能用特定 set/delete API 代替
5. 不支持 Map、Set 等数据结构

Vue3 使用 Proxy 来监控数据的变化，监测的是整个对象，而不再是某个属性：

1. 消除了  Object.defineProperty 存在的很多限制。
2. 可以监测到对象属性的添加和删除，可以监听数组的变化
3. 它的处理方式是在 getter 中去递归响应式，这样的好处是真正访问到的内部属性才会变成响应式，简单的可以说是**按需实现响应式，减少性能消耗**。
4. 
5. Proxy 可以监听数组的变化。
6. 支持Map、Set结构

### 026：Vue3 Diff算法和 Vue2 的区别？⭐️

我们知道在数据变更触发页面重新渲染，会生成虚拟 DOM 并进行 patch 过程，这一过程在 Vue3 中的优化有如下

1. 编译阶段的优化
   - 事件缓存：将事件缓存(如: @click)，可以理解为变成静态的了
   - 静态提升：第一次创建静态节点时保存，后续直接复用
   - 添加静态标记：给节点添加静态标记，以优化 Diff 过程
     由于编译阶段的优化，除了能更快的生成虚拟 DOM 以外，还使得 Diff 时可以跳过"永远不会变化的节点"，
2. Diff 算法的优化
   - Vue2 是全量 Diff，Vue3 是静态标记 + 非全量 Diff
   - 使用最长递增子序列优化了对比流程

### 027：Vuex vs Pinia ⭐️

Pinia和Vuex都是Vue状态管理库，但是它们有一些区别：

1. API风格
   - Vuex 是 Vue.js 官方提供的状态管理库，它在 Vue 2 中被广泛使用。它使用基于选项的 API 设计，通过定义 `state`、`mutations`、`actions` 等选项来管理状态和处理业务逻辑。
   - Pinia 是一个由 Vue 社区维护的状态管理库，专门为 Vue 3 设计。它采用了基于类的 API 设计，通过定义 `state`、`getters`、`actions` 等类成员来管理状态和处理业务逻辑。
2. 响应式系统
   - Vuex 使用 Vue 2 的响应式系统来管理状态，它基于 Object.defineProperty() 来监听状态的变化，并在状态变化时触发视图更新。
   - Pinia 使用 Vue 3 的基于 Proxy 的响应式系统来管理状态，使用 Proxy 对象监听状态变化，并在状态变化时触发更新。这种基于 Proxy 的响应式系统在性能上优于 Vue 2 中的 Object.defineProperty()。
3. TypeScript 支持
   - Vuex 对 TypeScript 有一定的支持，提供了一些类型定义和接口声明，使得在 TypeScript 项目中使用时更加方便。
   - Pinia 在设计上更加友好于 TypeScript，并提供了更好的类型推断和类型检查支持，使得在 TypeScript 项目中的开发更加高效和安全。

### 028：Vue 🆚 React

1. 核心思想不同
   - Vue的核心思想是尽可能的降低前端开发的门槛，是一个**灵活易用的渐进式双向绑定的MVVM框架**。
   - React的核心思想是**声明式渲染和组件化、单向数据流**，React既不属于MVC也不属于MVVM架构。

2. 本质不同
   - Vue本质是**MVVM框架**，由MVC发展而来。
   - React是**前端组件化框架**，由后端组件化发展而来。

3. 响应式原理不同
   - Vue通过数据劫持+发布订阅者模式来实现
   - React主要通过 **setState** 来更新状态，从而触发组件的更新。

4. 监听数据变化的实现原理不同
   - Vue通过劫持属性setter/getter，能精确知道数据的变化
   - React 是通过 **比较引用的方式** 进行的。

5. Diff算法不同

   Vue和React的Diff算法都是进行同层次的比较，主要有以下两点不同：

   - 对比结点时，如果节点元素类型相同，但是className不同，Vue 认为是不同类型的元素，会进行删除重建，但是React则会认为是同类型的节点，只会修改节点属性。

   - 列表渲染时，Vue采用的是首尾指针法，而React采用的是从左到右依次比对的方式。从这点上来说vue的对比方式更加高效。

6. 组件写法不同
   - Vue 通过 `<template>` 单文件组件的形式，后缀名为：`.vue`
   - React 提倡使用 `jsx` + `inline style`，后缀名为：`.j(t)sx`

7. 组合不同功能的方式不同
   - Vue使用 minxin
   - React使用 HoC（高阶组件）

8. 组件通信方式不同
   - Vue：`props` + `emit`、`provide` + `inject`、Vuex
   - React：`props` + `callback`、`context`、`Redux`

9. 渲染过程不同
   - Vue可以更快的计算出虚拟DOM的差异（*这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，**不需要重新渲染整个组件树***）
   - React在应用的状态被改变时，**全部子组件都会重新渲染**。通过shouldComponentUpdate 这个生命周期方法可以进行控制，但Vue将此视为默认的优化。

https://worktile.com/kb/ask/19606.html

