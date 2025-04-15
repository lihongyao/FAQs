### 001：`src` 和 `href` 的区别？✔️

`src` 和 `href` 是 HTML中用于 **引用外部资源** 的两个核心属性，它们的区别如下：

1. src：用于嵌入资源到当前文档，内容会替换当前标签，加载时会阻塞页面解析，属于同步加载。

   常用的标签有：script、img、iframe

2. href：用于建立当前文档与外部资源的关联，不会阻塞解析，属于异步加载，需用户主动触发（如点击链接）才会跳转或加载资源。

   常用的标签有：link、a

### 002：如何理解 HTML5 语义化 ？有哪些常见的语义化标签？✔️

HTML5 语义化是指通过使用具有明确含义的标签，使网页的结构和内容更加清晰，方便浏览器、开发者以及搜索引擎理解网页内容。

语义化的核心在于让标签不仅描述外观，还能表达内容的含义，从而提升网页的可读性、可维护性和可访问性。

常见的语义化标签：header/nav/main/footer/article/section/aside等。

### 003：DOCTYPE 的作⽤？✔️

**声明是文档类型**，用于告知浏览器当前 HTML 文档使用的 HTML 版本，从而确保文档以正确的模式渲染。它通常出现在 HTML 文档的第一行。

### 004：script  标签中 `defer` 和 `async` 的区别？✔️

在 `<script>` 标签中，`defer` 和`async `  是两个用于控制脚本加载和执行行为的属性。

它们的共同点是 **异步加载脚本**，不会阻塞页面解析和渲染，区别如下：

1. `async `：在会脚本下载完成后立即执行，不保证脚本执行顺序。

2. `defer`：脚本延迟执行，在 HTML 文档解析完成之后按标签所在的顺序执行。

**延伸问题：script 标签放在 head 里，怎么解决加载阻塞的问题？**

1. 使用 `async` 属性
2. 使用 `defer` 属性
3. 将 `<script>` 放在 `<body>` 结束标签之前

### 005：meta 标签是干什么的，都有什么属性和作用？ ✔️

用于提供页面的**元信息**，这些信息不会直接显示在网页内容中，但对浏览器、搜索引擎和其他服务非常重要。

常用的meta标签：

1. 字符编码

   ```html
   <meta charset="UTF-8"/>
   ```

2. 页面视口设置（响应式设计）

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

3. 搜索引擎优化

   ```html
   <meta name="keywords" content="" />
   <meta name="description" content="" />
   <meta name="robots" content="index, follow" />
   ```

4. 作者信息

   ```html
   <meta name="author" content="序猿杂谈" />
   ```

### 006：HTML5有哪些新特性？

1. 新增语义化标签：nav/header/main/footer/article等；
2. 增强了表单，input 新增了一些 type 类型；

3. 新增音视频标签；
4. 新增 Canvas 元素；
5. 引入 Web Workers / Web Socket/ 拖拽 / 地理定位等 API；
6. 本地存储（WebStorage）；
7. 新增属性：data-*、contenteditable等；

### 007：img 的 srcset 属性的作⽤？

根据设备屏幕大小和分辨率选择最合适的图像进行显示。

### 008：渐进增强和优雅降级之间的区别？

渐进增强和优雅降级都是在设计网站或应用程序时考虑到多个浏览器或设备的兼容性时采取的策略。

- **渐进增强**：指首先设计和开发一个基本的核心功能，然后逐步添加更高级的功能和体验，以适应不同的浏览器或设备。这种方法强调重要内容的可访问性，并确保基本功能对所有用户都可用。
- **优雅降级**：指首先设计和开发一个完整且高级的功能和体验，然后针对那些不能支持这些功能和体验的浏览器或设备进行逐步的退化处理，以确保所有用户都能够使用网站或应用程序。这种方法强调优秀的用户体验，但可能会导致某些用户无法访问某些内容或功能。

### 009：说一下 HTML5 drag API?

1. 拖拽源：

- `dragstart`：开始拖拽

- `darg`：拖拽中
- `dragend`：拖拽元素

2. 拖拽目标：

- `dragenter`：拖拽元素进入目标元素

- `dragover`：拖拽元经过拖拽目标
- `dragleave`：拖拽元素移出目标元素
- `drop`：拖拽元素完全进入目标元素

### 010：什么是 DOM ，它和 HTML 有什么区别？

DOM 即 Document Object Model 文档对象模型，它是一个 JS 对象。而 HTML 是一种标记语言（和 XML 类似）用于定义网页的内容和结构。

DOM 的特点：

- 树形结构，DOM 树
- 可编程，可以使用 Javascript 读取和修改 DOM 数据
- 动态性，通过 DOM API 动态修改结构和数据

HTML 到 DOM 的过程

- HTML 解析：浏览器解析 HTML 代码，生成 DOM 树。
- CSSOM 生成：解析 CSS，生成 CSSOM（CSS 对象模型）。
- 渲染树：结合 DOM 和 CSSOM，生成渲染树。
- 页面渲染：根据渲染树将内容显示在页面上。

### 011：head 标签有什么作用，其中什么标签必不可少？

用于定义文档的头部信息，包括页面标题、样式表和其他元数据

下面这些标签可用在 head 部分：`<base>`, `<link>`, `<meta>`, `<script>`, `<style>`, `<title>`。

其中 `<title>` 定义文档的标题，它是 head 部分中 **唯一必需** 的元素。

### 012：label 的作用是什么？如何使用？

`label` 标签用来定义表单控件的关系：当用户选择 `label` 标签时，浏览器会自动将焦点转到和 `label` 标签相关的表单控件上。

```html
<!-- 使用方法1： -->
<label for="account">Account:</label>
<input type="text" id="account"/>

<!-- 使用方法2： -->
<label>Password:<input type="text"/></label>
```

### 013：前端需要注意哪些SEO？✔️

1. SSR 服务端渲染。
2. 合理设置 `title`、`description`、`keywords`。
3. 使用语义化标签。
4. 重要内容优先放在 HTML 靠前位置。
5. 避免用 JS 输出关键内容。
6. 禁用 `iframe`（爬虫不抓取）。
7. 为非装饰性图片添加 `alt` 属性。
8. 提升网站加载速度。
9. 使用简洁、含关键词的 URL。
10. 合理使用内部链接，锚文本需描述性。
11. 使用 HTTPS。
12. 定期更新内容。

借助 [PageSpeed Insights](https://pagespeed.web.dev/?hl=zh-CN) 网页速度分析，查看网页性能及SEO相关的建议。

### 014：\<img> 的 title 和 alt 有什么区别 

1. `title`：当鼠标悬浮在图片上时的时候显示
2. `alt`：当图片加载失败时显示，提高图片可访问性，利于搜索引擎分析

### 015：DOM 节点的 attr 和 property 有何区别？

- attr 指的是 HTML 属性（attribute）
- property 指的是 DOM 对象的属性（property）

### 016：如何一次性插入多个 DOM 节点？考虑性能？✔️

使用 DocumentFragment 文档片段。

### 017：offsetHeight scrollHeight clientHeight 有什么区别？

- `offsetHeight` 元素的 **总高度**。

  包括内容高度、内边距（padding）、水平滚动条高度（如果存在）、以及边框（border）。不包括外边距（margin）。

- `scrollHeight` 元素的 **实际内容高度**

  包括不可见的溢出部分（scrollable content），大于等于 `clientHeight`。

- `clientHeight` 元素的 **可见内容高度**
- 包括内容高度和内边距（padding），但不包括水平滚动条高度、边框（border）和外边距（margin）。

### 018：开发一个无限下拉加载图片的页面，如何给每个图片绑定 click 事件？✔️

使用 **事件委托** 实现，避免重复绑定事件，性能高，适合动态加载的场景。

### 019：window.onload 和 DOMContentLoaded 的区别是什么？ ✔️

这两个事件都用于检测页面的加载状态，但触发的时机和作用范围有所不同。

- `DOMContentLoaded` 是当 **DOM 树构建完成** 时触发，不依赖于外部资源。
- `window.onload` 是当 **整个页面及所有资源** 加载完成时触发，依赖于外部资源。

因此，`DOMContentLoaded` 会更早触发。

- 如果你的逻辑只依赖 DOM 的加载（如操作页面结构、绑定事件），使用 `DOMContentLoaded`。
- 如果你的逻辑需要依赖页面所有资源加载完成（如获取图片尺寸、执行动画），使用 `window.onload`。

### 020：HTML 标签中 inline，inline-blok ，block 元素有何区别？✔️

- `inline`：行内元素，不独占一行，高度由内容决定，无法直接设置宽度和高度。
- `inline-block`：行内块元素，不独占一行，允许设置宽度和高度。
- `block`：块级元素，独占一行，具备盒子模型。
