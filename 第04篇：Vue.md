### 001：Vue生命周期 ✔️

Vue 实例从创建到销毁的过程。

[生命周期图示 >>](https://cn.vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram)

[生命周期钩子 >>](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html)

创建 - 挂载 - 更新 - 卸载 - 激活 ...

### 002：谈谈你对 keep-alive 的了解 ✔️

keep-alive 是 vue 的内置组件，主要用来 **缓存动态组件**  和 **路由组件** 的，避免组件在切换时被销毁和重新创建。

`<keep-alive>` 会触发两个额外的生命周期钩子：**`activated`** / **`deactivated`**。

缓存组件实例会占用内存，如果缓存过多组件，可能会导致内存占用过高。

### 003：v-if 和 v-show 区别

- `v-if`：通过销毁和重建DOM达到让元素显示和隐藏的效果；

- `v-show`：通过修改元素的 `display` 属性让其显示或者隐藏；

### 004：v-if 和 v-for 优先级 ✔️

当 v-if 与 v-for 一起使用时：

- Vue2：`v-for` 优先级高于 `v-if`，先循环再判断。
- Vue3：`v-if` 优先级高于 `v-for`，先判断再循环。

> 提示：尽量避免在同一元素上同时使用 `v-if` 和 `v-for`，可以通过计算属性或方法预先过滤数据。

### 005：**ref**是什么？

`ref` 是一个特殊的属性，用于在模板中给元素或组件注册一个引用。

### 006：谈谈你对 $nextTick 的理解? ✔️

Vue 的响应式系统是异步的。

当数据发生变化时，Vue 并不会立即更新 DOM，而是将更新操作推入一个队列，并在下一个事件循环中批量处理。

意味着，如果在数据变化后立即访问 DOM，可能会获取到未更新的 DOM 状态。

`$nextTick` 提供了一种机制，确保在 DOM 更新完成后再执行代码。

### 007：**scoped** 原理 ✔️

scoped 属性可以将样式作用域限制在当前组件的范围内，避免全局污染。其实现原理是通过给当前组件的所有选择器加上一个唯一的标识符（如 `data-v-xxx`），从而让当前组件的样式仅对带有这个标识符的元素生效。

具体来说，当一个 Vue 组件中使用了 `scoped` 属性时，Vue 在编译组件时会通过 PostCSS 插件（如 postcss-selector-scope）将组件中的所有样式选择器添加一个特殊的属性选择器，以确保样式只作用于当前组件。

### 008：Vue中如何做样式穿透？ ✔️

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

### 009：Vue组件传值 ✔️

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

### 015：Vue路由模式 ✔️

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

### 017：双向绑定（响应式）原理 ✔️

Vue 的双向绑定（响应式系统）基于 **数据劫持 + 发布-订阅模式**，通过以下步骤实现：

1. **数据劫持**

   在创建 Vue 实例的时候，会遍历 `data` 的所有属性， 然后通过 `Object.defineProperty()` 劫持个各个属性的 setter 和 getter，同时创建 `Dep` 用于依赖收集。

2. **依赖收集**

   编译模板时，为每个绑定数据的节点创建 `Watcher`，并将 Dep.target 标识为当前 Watcher。

   在此期间（首次渲染时），`Watcher` 访问数据 → 触发 `getter` → `Dep.addSub` 收集当前 `Watcher`。

3. **派发更新**

   数据变化 → 触发 `setter` → `Dep.notify()` → 所有 `Watcher` 执行更新。

### 018：虚拟DOM ✔️

1. 什么是虚拟DOM？

   虚拟DOM是一个用于表示真实DOM结构和属性的 **js对象**。通过对比前后虚拟 DOM 的差异，实现局部渲染，优化性能。

2. 为什么要用虚拟DOM？

   直接操作真实 DOM 非常消耗资源，虚拟 DOM 通过算法减少页面重排（回流）和重绘，提升渲染效率，使页面更流畅。

### 020：Diff 算法如何工作？Vue3 有何优化？ ✔️

Diff 算法用于比较虚拟 DOM 的差异，实现局部更新以优化性能。

核心思想：

1. 同级比较，仅对比同一层级的节点。
2. 通过 `key` 标识节点身份，减少不必要的节点操作。
3. 最小化操作，优先复用相同节点，仅更新变化的属性或子节点。

📖 **Vue2 vs. Vue3**

1. **Vue2**：使用 **双向指针** 比较虚拟 DOM，通过启发式算法减少节点移动。
   - 双端比较（头头、尾尾、头尾、尾头），依赖 `key` 复用节点。
   - 全量递归子节点，对长列表的插入/删除效率较低，性能开销比较大。
2. **Vue3**：采用 **单向链表结构**，结合 `Map` 数据结构更高效地定位节点变化，并借鉴 Fiber 架构（异步渲染）实现轻量级节点移动。
   - 快速 Diff：预处理相同前缀/后缀，`Map` 精准定位节点。
   - LIS（最长递增子序列） 算法：最小化节点移动次数。
   - 静态提升：跳过静态节点比较，Patch Flag 标记动态属性。

Vue3 渲染性能提升 2~3 倍，尤其擅长动态列表更新。

📖 **Vue3 有何优化？**

1. 编译阶段的优化
   - **事件缓存**：将事件（如 `@click`）缓存为静态节点。

   - **静态提升**：首次创建静态节点后直接复用，避免重复创建。

   - **静态标记**：为节点添加静态标记，优化 Diff 过程，跳过不变节点。

2. Diff 算法的优化
   - **Vue2**：全量 Diff，遍历所有节点进行对比。
   - **Vue3**：**静态标记 + 非全量 Diff**，仅对比动态节点，跳过静态节点。
   - **最长递增子序列**：优化对比流程，减少不必要的 DOM 操作。

### 022：data 为什么是函数？

**避免数据污染**

对象在栈中存储的都是地址，函数的作用就是属性私有化，保证组件修改自身属性时不会影响其他复用组件。

### 023：子组件prop接收数据之后刷新页面，数据丢失怎么处理？

1. 通过后台来保存数据
2. 本地持久化
3. 通过Vuex/Pinia持久化
4. 通过url传递参数，保存在url中

### 024：Vue2 vs. Vue3 ✔️

1. 监听机制的变化
   - Vue2 基于 `Object.defineProperty` 实现数据劫持，通过递归遍历所有属性，劫持每个属性的 setter 和 getter 实现响应式。
   - Vue3 基于 `Proxy` 实现数据劫持，不用深度遍历所有属性。
2. API模式不同
   - Vue2：选项式API
   - Vue3：新增组合 API（Composition API），更好的逻辑重用和代码组织
3. `v-if` 和 `v-for` 的优先级
4. Template 支持多个根节点
5. 打包体积优化
6. Diff算法优化（*参考020：Diff算法*）
5. 生命周期钩子不同
   - Vue3的钩子函数在Vue2的基础上加了on，如：created → onCreated
   - beforeDestory 和 destoryed 更名为 onBeforeUnmount 和 onUnmounted
   - 用setup代替beforeCreate和created。
8. 父子传参不同：definProps
7. Vue3引入了新的优化方式——静态提升，通过在编译阶段处理静态节点，减少运行时的开销

总结：**Vue3 性能更高、体积更小、更利于复用、代码维护更方便**

### 025：defineProperty 和 Proxy的区别？✔️

Vue 在实例初始化时遍历 data 中的所有属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter，同时劫持各个属性 getter 和 setter，在数据变化时发布消息给订阅者，触发相应的监听回调，而这之间存在几个问题。

1.  需要遍历对象所有属性，深层次对象性能较差。
2.  无法监听数组元素变化，需通过 **重写数组方法** 实现。
3.  动态新增/删除属性无法拦截，需使用特定 API（如 `Vue.set`/`Vue.delete`）。
4.  不支持 `Map`、`Set` 等数据结构。
5.  维护大量 `Dep` 和 `Watcher` 实例，内存占用较高。

Vue3 使用 Proxy 来监控数据的变化，监测的是整个对象，而不再是某个属性：

1. 监测整个对象，无需遍历所有属性，性能更好。
2. 支持监听数组变化和动态属性增删。
3. **按需实现响应式**，真正访问到的属性才会变为响应式，减少性能消耗。
4. 支持 `Map`、`Set` 等数据结构。
5. 语法更简洁，功能更强大。

`Proxy` 解决了 `Object.defineProperty` 的诸多限制，性能更优，功能更全面，是 Vue3 响应式系统的核心。

### 027：Vuex vs Pinia ✔️

Pinia和Vuex都是Vue状态管理库，但是它们有一些区别：

1. API风格
   - Vuex：基于选项式 API，通过 `state`、`mutations`、`actions` 等选项管理状态。
   - Pinia：基于组合式 API，通过 `state`、`getters`、`actions` 等类成员管理状态，更简洁灵活。
2. 响应式系统
   - Vuex：使用 Vue 2 的 `Object.defineProperty` 监听状态变化。
   - Pinia：使用 Vue 3 的 `Proxy` 监听状态变化，性能更优。
3. TypeScript 支持
   - Vuex：提供基础的类型支持，但不够完善。
   - Pinia：对 TypeScript 友好，提供更好的类型推断和检查，开发更高效。
4. 设计理念
   - Vuex：Vue 2 官方状态管理库，适合复杂项目。
   - Pinia：为 Vue 3 设计，轻量且现代化，适合中小型项目。

Pinia 是 Vuex 的现代化替代品，API 更简洁，性能更优，对 TypeScript 支持更好，适合 Vue 3 项目。

### 028：Vue vs. React ✔️

1. 设计理念

   - Vue：定位是一个渐进式 MVVM 框架，核心思想是数据驱动 + 模板语法，学习门槛较低。
   - React：定位是一个声明式 UI 组件库，核心思想是函数式编程 + JSX，学习曲线较高。

2. 响应式原理
   - Vue：数据劫持 + 发布订阅模式，自动依赖追踪，可以做到精确更新。
   - React：通过调用  `setState` 更新状态，引用比较，触发组件更新。

3. 渲染机制

   - Vue：组件级细粒度更新，自动缓存未变化组件。
   - React：默认全量渲染，需手动 `memo`/`useMemo`。

4. Diff算法不同

   Vue和React的Diff算法都是进行 **同层次** 的比较，主要有以下两点不同：

   - 对比结点时，如果节点元素类型相同，但是 className 不同，Vue 认为是不同类型的元素，会进行删除重建，但是React则会认为是同类型的节点，只会修改节点属性。

   - 列表渲染时，Vue采用的是首尾指针法，而React采用的是从左到右依次比对的方式。从这点上来说 vue 的对比方式更加高效。

5. 组件写法不同
   - Vue：单文件组件（`.vue`），使用 `<template>`。
   - React：`JSX` + `inline style`，文件后缀 `.jsx`/`.tsx`。

6. 逻辑复用
   - Vue：使用 `mixin` —— Hooks —— vueuse
   - React：使用 高阶组件（HoC）—— Hooks —— aHooks

7. 组件通信方式
   - Vue：`props` + `emit`、`provide` + `inject`、`Vuex`、`Pinia`
   - React：`props` + `callback`、`context`、`Redux`

### 029：Composition API vs. Options API ✔️

1. 代码组织
   - Options Api 代码按照 **选项**（`data`、`methods`、`computed`、`watch`）进行分组
   - Composition Api 代码按照 **逻辑功能** 进行分组
2. 逻辑复用
   - Options Api 逻辑复用通常通过 `mixins` 来实现，但容易导致命名冲突和代码可读性下降。
   - Composition Api 逻辑复用通过自定义 Hook（类似于 React 的 Hooks）实现，可以将逻辑提取到独立的函数中，更灵活且易于维护。
3. this 的使用
   - Options Api 通过 `this` 访问组件实例的属性和方法
   - Composition API 在 `setup` 函数中没有 `this`，所有数据和函数都需要通过 `return` 暴露给模板

### 031：为什么需要 `key`？用 `index` 会有什么问题？

`key` 帮助 Diff 算法识别节点身份，避免错误复用，如果列表中使用 `index` 可能导致 bug。

因为在列表变动时，`index` 无法稳定标识节点，可能导致：

- 错误复用（如删除中间项时，后续节点 `key` 全部变化）
- 状态混乱（如输入框内容错位）

### 032：MVVM 是什么？和MVC有何区别呢？

- Model(模型)：负责从数据库中取数据
- View(视图)：负责展示数据的地方
- Controller(控制器)：用户交互的地方，例如点击事件等等
- VM： 视图模型

在 MVVM 中，View 不知道 Model 的存在，Model 和 ViewModel 也观察不到 View，这种低耦合模式提高代码的可重用性。VM 会自动将数据更新到页面中，而 MVC 需要手动操作 dom 将数据进行更新

### 033：首屏优化 ✔️

参考阅读：https://juejin.cn/post/7482265923919822875

1. 路由懒加载
2. 组件级动态导入
3. CDN加速静态资源
4. 骨架屏

### 034：父子组件生命周期加载时的执行顺序

父beforeCreate → 父created → 父beforeMount

子beforeCreate → 子created → 子beforeMount  → 子mounted → 父mounted

延伸问题1：为什么先走子mounted在走父mounted？

比如 b.vue → a.vue → app.vue，父组件在挂载时必须确保子组件挂载之后才能挂在到根视图上，否则视图会有缺失，就好像递归查询或者双重循环，只有当内层循环结束之后外层循环才算结束1次。

延伸问题2：`this.$nextTick()` 的本质其实就是在监听生命周期的变化
