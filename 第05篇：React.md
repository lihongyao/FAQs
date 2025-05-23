### 001：React 理念

React 的目标是构建 **快速响应** 的大型 Web 应用程序。制约快速响应的因素主要有两个：

1. CPU的瓶颈

   解决方案：**时间切片**。

   React 将同步更新变为可中断的异步更新。在浏览器每一帧的时间中，预留 5ms 给 JS 线程用于更新组件。如果时间不够，React 将控制权交还给浏览器进行 UI 渲染，等待下一帧继续中断的工作。

   **核心：将同步更新变为异步更新**。

2. IO的瓶颈

   解决方案：**Suspense**
   
   通过 `Suspense` 组件优化数据加载和渲染，避免因 IO 操作导致的卡顿。

### 002：React 架构 ✔️

架构可以分为三层：

- Scheduler（调度器）
  - **功能**：调度任务的优先级，高优先级任务优先进入 `Reconciler`。
  - **特点**：React 16 新增，支持时间切片和任务中断/恢复。
- Reconciler（协调器）
  - **功能**：找出变化的组件，为变化的虚拟 DOM 打上增/删/更新的标记。
  - **特点**：基于 Fiber 架构，支持异步渲染。
- Renderer（渲染器）
  - **功能**：根据 `Reconciler` 的标记，将变化的组件同步渲染到页面上。
  - **特点**：支持多种渲染环境（如 DOM、Native、Canvas 等）。

### 003：Fiber（虚拟DOM）✔️

Fiber 是 React 内部实现的一套状态更新机制，支持任务优先级、中断与恢复，并能复用中间状态。每个任务更新单元对应一个 React Element 的 Fiber 节点。

Fiber 的核心特点：

1. **任务优先级**：支持高优先级任务优先执行。
2. **可中断与恢复**：任务可以中断并在后续恢复，避免阻塞主线程。
3. **用中间状态**：恢复任务时可以复用之前的中间状态，提升性能。

📖 **扩展问题：Fiber 节点**

**Fiber 节点** 是 React 中用于实现虚拟 DOM 和异步渲染的核心数据结构。每个 React 元素（如组件或 DOM 节点）对应一个 Fiber 节点，用于描述其状态、属性和更新任务。

**Fiber 节点的关键属性：**

- **`type`**：节点类型（如组件、DOM 元素）。

- **`key`**：唯一标识符，用于优化列表渲染。

- **`stateNode`**：节点对应的真实 DOM 或组件实例。

- **`child`**：指向第一个子节点。

- **`sibling`**：指向下一个兄弟节点。

- **`return`**：指向父节点。

- **`pendingProps`**：待更新的属性。

- **`memoizedProps`**：已更新的属性。

- **`memoizedState`**：组件状态（如 `useState` 的值）。

- **`effectTag`**：标记节点需要执行的操作（如插入、更新、删除）。

**Fiber 的作用：**

1. **任务调度**：支持优先级任务、中断与恢复。
2. **增量渲染**：将渲染任务拆分为多个小任务，避免阻塞主线程。
3. **复用状态**：恢复任务时可复用之前的中间状态，提升性能。

### 004：React 组件通信方式 ✔️

1. 父子组件：props & callback
2. 兄弟节点：状态提升
3. 跨层级通信：context
4. 全局状态管理：Redux /  Zustand  / eventBus

### 005：谈谈你对合成事件的理解？

React 通过将事件监听器挂载到 `document` 上，利用 **事件冒泡** 机制统一处理事件。当 DOM 元素触发事件后，事件会冒泡到 `document`，React 会找到对应的组件，生成一个 **合成事件**，并按组件树模拟事件冒泡流程。

**合成事件的特点：**

1. **事件委托**：所有事件统一挂载到 `document`，减少内存占用。
2. **跨浏览器兼容**：封装了浏览器差异，提供一致的事件接口。
3. **性能优化**：避免频繁绑定和解绑事件，提升性能。
4. **模拟冒泡**：按组件树结构模拟事件冒泡，确保事件传播符合预期。

### 006：`setState` 是同步还是异步？✔️

既存在异步情况也存在同步情况

1. 异步情况：
   - **场景**：在 React 的 **合成事件** 和 **生命周期方法** 中，`setState` 是异步的。
   - **原因**：React 会将多个 `setState` 调用合并，统一进行状态更新和渲染，以优化性能。
   - **表现**：在异步情况下，`setState` 不会立即更新状态，而是将更新放入队列，稍后批量处理。
2. 同步情况：
   - **场景**：在 **定时器**（如 `setTimeout`、`setInterval`）、**原生 DOM 事件** 或 **Promise 回调** 中，`setState` 是同步的。
   - **原因**：这些场景脱离了 React 的控制机制，React 无法合并或批量处理更新。
   - **表现**：`setState` 会立即更新状态并触发重新渲染。

**为什么会有异步和同步的区别？**

React 的设计目标是优化性能，减少不必要的渲染。在合成事件和生命周期方法中，React 通过批量处理 `setState` 来避免频繁渲染。而在定时器、原生事件等场景中，React 无法控制更新时机，因此表现为同步行为。

### 007：React 生命周期 ✔️

React 的生命周期分为三个阶段：挂载（Mounting）、更新（Updating）和卸载（Unmounting）。

1. **挂载阶段**
   - `constructor`：初始化状态和绑定事件。
   - `static getDerivedStateFromProps`：根据 props 更新状态。
   - `render`：渲染 UI。
   - `componentDidMount`：组件挂载后执行操作，如网络请求或 DOM 操作。
2. **更新阶段**
   - `static getDerivedStateFromProps`：根据 props 更新状态。
   - `shouldComponentUpdate`：决定是否重新渲染。
   - `render`：重新渲染 UI。
   - `getSnapshotBeforeUpdate`：在 DOM 更新前捕获状态。
   - `componentDidUpdate`：组件更新后执行操作。
3. **卸载阶段**
   - `componentWillUnmount`：组件卸载前执行清理操作，如取消订阅。
4. **错误处理**
   - `static getDerivedStateFromError`：捕获子组件的错误并更新状态。
   - `componentDidCatch`：处理错误并记录日志。

React 19 的优化与变化：

1. **并发渲染**：React 19 进一步优化了并发渲染机制，生命周期方法在并发模式下可能被多次调用，开发者需确保代码的幂等性。
2. **自动批处理**：状态更新会自动批处理，减少不必要的重新渲染。

### 008：React Hooks 为什么只能在顶层使用？Vue 是否有类似限制？✔️

React 内部使用**单向链表**来管理 Hooks 的状态，每个 Hook 的调用顺序必须严格一致，顺序变化会导致错乱。

Vue 的 Composition API **没有强制顶层调用的要求**，因为 Vue 的状态是通过响应式依赖追踪管理的，不依赖调用顺序，但是 Vue 要求必须在 `setup` 中同步注册。

### 009：props 和 state 有什么区别？✔️

**Props** 是父组件传递给子组件的只读数据，用于组件间通信；

**State** 是组件内部管理的可变数据，通过 `setState` 更新并触发重新渲染。

核心区别：

1. 来源：Props 来自父组件，State 由组件自身维护
2. 可变性：Props 不可修改，State 可修改

### 010：React 中的 props 为什么是只读的？✔️

1. **单向数据流**：确保数据只能从父组件流向子组件，避免混乱的数据修改来源
2. **可预测性**：组件像纯函数一样，相同的 props 始终渲染相同结果，便于调试和维护
3. **性能优化**：避免因 props 可变导致 React 频繁检查差异，提升渲染效率
4. **组件复用**：只读性保证组件在不同父组件下行为一致，增强独立性

若需修改数据，应使用 **state** 或通过父组件更新 props

