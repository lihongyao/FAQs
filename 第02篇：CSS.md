### 001：简述什么是BFC？✔️

1. 基本概念：**B**lock **F**ormatting **C**ontext，块级格式化上下文，是 一块独立渲染区域，内部元素的布局不会影响外部元素。

2. 解决什么问题？

   - **清除浮动**（防止父元素高度塌陷）
   - **避免 margin 重叠**（相邻元素的 margin 不会合并）
   - **隔离布局**（内部元素不影响外部布局）

3. 满足以下条件，就可以创建BFC

   - `float: left/right`（非 `none`）
   - `position: absolute/fixed`
   - `display: inline-block / table-cell / flex / grid`
   - `overflow: hidden / auto / scroll`（非 `visible`）

BFC 是一个独立布局空间，能解决浮动、margin 重叠等问题，通过 `float`、`position`、`overflow` 等属性触发。

### 002：px/em/rem ✔️

px、rem、em 都是表示长度或字体大小的单位，主要区别在于 **相对性** 和 **继承性**：

- `px`：固定单位，相对于 **显示器屏幕分辨率** 而言，值是固定的，指定多少就是多少。
- `em`：相对单位，相对于 **父元素** 字体大小，可被子元素继承。
  - em = 像素值 / 父元素字体大小
- `rem`：相对单位，相对于 **根元素** 字体大小，不会被子元素继承。
  - 根元素字体大小 = 设备宽度/设计稿宽度 * 100
  - rem = 设计稿值 / 100

### 003：谈一谈盒子模型

1. 组成：content - padding - border -margin
2. 标准盒子模型：box-sizing:content-box
3. IE盒子模型：box-sizing:border-box

### 004：CSS3有哪些新特性？

媒体查询/文本阴影/渐变/圆角/盒子阴影/过渡/动画/变形转换/弹性布局/网格布局/视口单位

### 005：link 与 @import 的区别？

`<link>`和`@import`都是用于在HTML或CSS中导入外部资源的方法，但它们有一些区别：

1. **用法和位置：**
   - `<link>`：`<link>`标签是HTML中的标签，用于在HTML文档中引入外部资源，如样式表、图标等。它通常位于`<head>`标签内，并使用`rel`属性指定资源的关系类型，如`stylesheet`表示样式表。
   - `@import`：`@import`是CSS中的规则，用于在CSS文件中导入外部样式表。它位于CSS文件的顶部，并在其他CSS规则之前使用。`@import`规则是以`@import`关键字开始的，并指定要导入的资源路径。
2. **加载行为：**
   - `<link>`：`<link>`标签在浏览器解析HTML文档时就会同时加载指定的资源，不会阻塞页面的渲染。它可以并行加载多个资源，提高加载效率。
   - `@import`：`@import`规则是在CSS文件加载时才会加载导入的资源。它会阻塞页面的渲染，直到该资源加载完成才会继续渲染。如果有多个`@import`规则，它们会按顺序加载。
3. **兼容性：**
   - `<link>`：`<link>`标签是HTML的一部分，几乎所有的浏览器都支持它。
   - `@import`：`@import`规则是CSS2引入的特性，它在一些旧版本的浏览器中可能不被完全支持。尤其在IE6-IE9中，对`@import`规则的支持存在一些限制。
4. **优先级：**
   - `<link>`：`<link>`标签中的样式表具有较高的优先级，可以覆盖其他样式规则。它们的加载顺序也会影响样式的优先级。
   - `@import`：`@import`规则的样式表优先级较低，它们会在其他样式规则之后加载，并且优先级较低的样式可能会被其他样式覆盖。

综上所述，`<link>`标签具有更广泛的兼容性，可以并行加载多个资源，并且在样式覆盖和优先级方面更灵活。相比之下，`@import`规则在加载行为和兼容性方面可能存在一些限制。因此，在实际开发中，优先选择使用`<link>`标签来引入外部样式表。

### 006：什么是外边距重叠？ 重叠的结果是什么？

外边距重叠是指两个或多个相邻元素的外边距（margin）发生重叠的现象。

折叠结果遵循下列计算规则：

1. 两个相邻的外边距**都是正数**时，折叠结果是它们 **两者之间较大的值**。
2. 两个相邻的外边距**都是负数**时，折叠结果是两者 **绝对值** 的 **较大值**。
3. 两个外边距**一正一负**时，折叠结果是两者的 **相加的和**。

### 007：`flex：0 1 auto` 是什么意思？✔️

`flex` 是 `flex-grow`、`flex-shrink`、`flex-basis` 的缩写：

- `flex-grow`：放大比例
  - 默认为0，表示如果存在剩余空间，也不放大，都为1时表示平均分配剩余空间；
- `flex-shrink`：缩小比例
  - 默认为1，即如果空间不足，该项目将等比缩小；
- `flex-basis`：用于设置项目占据的主轴空间（项目初始大小）
  - 默认为 auto，即项目大小由内容决定。
  - 设置为固定值表示项目占据的主轴大小等于固定值  。

> 延伸试题：
>
>  `flex:1` 是什么意思？
>
> `flex:1` 是 `flex-grow: 1`、`flex-shrink: 1`、`flex-basis: auto` 的缩写，表示元素会 **自动占据剩余空间**，并在空间不足时 **等比缩小**。

### 008：解释什么是浮动以及工作原理？

浮动是一种用于控制元素在页面布局中位置的属性。通过将元素浮动到文档流中的左侧或右侧，可以让其他元素环绕在其周围。

浮动的工作原理如下：

1. **浮动元素的定位：** 使用`float`属性可以将元素从正常的文档流中脱离出来，并移动到其容器的左侧或右侧。浮动元素会尽量向左或向右移动，直到碰到其容器的边缘或其他浮动元素。
2. **环绕效果：** 其他非浮动的元素会根据浮动元素的位置进行环绕布局。环绕效果使得文本和其他元素可以围绕在浮动元素的周围。

需要注意的是，浮动元素对父容器和其他兄弟元素的布局产生了一些影响：

- **父容器高度塌陷：** 当父容器中的所有子元素都是浮动元素时，父容器的高度将塌陷为0，因为浮动元素脱离了文档流，不会撑开父容器的高度。为了避免这种情况，可以在父容器上添加`overflow: auto`或`clearfix`来清除浮动。
- **兄弟元素的环绕布局：** 兄弟元素会围绕在浮动元素的周围进行布局。如果兄弟元素是块级元素，默认情况下会占据浮动元素旁边的空间，并向下移动。如果希望兄弟元素不环绕浮动元素，可以使用`clear`属性来清除浮动。

### 009：如何实现三栏布局

1. 绝对定位
2. 浮动
3. Flex → flex:1
4. Grid

### 010：如何实现元素居中？

1. 弹性盒模型；
2. 绝对定位 + margin:
3. 绝对定位 + 平移：transform：translate（-50%，-50%）;
4. line-height 和 height 保持一致（里面的元素必须是inline，否则不生效）；
5. 通过padding：（已知子元素宽高情况，但不推荐）； 

### 011：CSS选择器及其优先级

| 选择器         | 格式                   | 优先级权重 |
| -------------- | ---------------------- | ---------- |
| `id` 选择器    | `#id`                  | 100        |
| 类选择器       | `#classname`           | 10         |
| 属性选择器     | `input[type='button']` | 10         |
| 伪类选择器     | `li:last-child`        | 10         |
| 标签选择器     | `div`                  | 1          |
| 伪元素选择器   | `li:after`             | 1          |
| 相邻兄弟选择器 | `h1 + p`               | 0          |
| 子选择器       | `ul > li`              | 0          |
| 后代选择器     | `li a`                 | 0          |
| 通配符选择器   | `*`                    | 0          |

对于选择器的 **优先级**：

- 标签选择器、伪元素选择器：`1`

- 类选择器、伪类选择器、属性选择器：`10`
- `id` 选择器：`100`
- 内联样式：`1000`

**注意事项：**

- `!important` 声明的样式的优先级最高；
- 如果优先级相同，则最后出现的样式生效；
- 继承得到的样式的优先级最低；
- 通用选择器（`*`）、子选择器（`>`）和相邻同胞选择器（`+`）并不在这四个等级中，所以它们的权值都为 `0` ；
- 样式表的来源不同时，优先级顺序为：内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式。

### 012：CSS 中可继承与不可继承属性有哪些？

**（1）继承属性**

- <u>字体</u> 系列属性：`font-family`、`font-weight`、`font-size`、`font-style`
- <u>文本</u> 系列属性：`text-indent`、`text-align`、`line-height`、`word-spacing`、`letter-spacing`、`text-transform`、`color`
- 元素可见性：`visibility`
- 列表布局属性：`list-style-type`、`ist-style-image` 等
- 光标属性：`cursor`

**（2）非继承属性**

- `display`
- 文本属性：`vertical-align`、`text-decoration`、`text-shadow`、`white-space`
- 盒子模型相关属性
- 背景属性
- 定位属性
- 轮廓样式属性
- ...

### 013：隐藏元素的方法有哪些？✔️

- `display: none`：脱离文档流
- `visibility: hidden`：占据空间，但不响应事件。
- `opacity: 0`：占据空间，响应事件。
- `position: absolute`
- `z-index: 负值`
- `clip/clip-path`
- `transform: scale(0, 0)`：占据空间，但不响应事件。

### 014：伪元素和伪类的区别和作用？

- **伪元素**：在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。它们只在外部显示可见，但不会在文档的源代码中找到它们，因此，称为 “伪” 元素。例如：`::before`、`::after`、`::first-line`、`::first-letter`
- **伪类**：将 <u>特殊的效果</u> 添加到 <u>特定选择器</u>上。它是已有元素上添加类别的，不会产生新的元素。例如：`:hover`、`:first-child`

> **总结**： 伪类是通过在元素选择器上加⼊伪类改变元素状态，⽽伪元素通过对元素的操作进⾏对元素的改变。

### 015：CSS 优化和提高性能的方法有哪些？✔️

1. 合并、压缩CSS文件。
2. 使用缩写和简写属性（*如属性值为0时省略单位，为浮点数时，省略前面的`0.`*）。
3. 选择器优化（*避免使用复杂的选择器和层级嵌套*）。
4. 避免不必要的样式，巧妙使用 CSS 继承机制，拆分公共样式。
5. 减少重绘和回流。
6. 使用雪碧图（CSS Sprite)。
7. 使用CSS预处理器。
8. 使用浏览器缓存。
9. 使用字体图标。
10. 使用硬件加速（*使用CSS属性`transform`、`opacity`等来触发硬件加速，可以提高动画和过渡效果的性能*）。

### 016：如何判断元素是否到达可视区域？

以图片显示为例：

![](./IMGS/iQ_view_area.png)

- `window.innerHeight` 是浏览器可视区的高度；

- `document.body.scrollTop || document.documentElement.scrollTop` 是浏览器滚动过的距离；
- `imgs.offsetTop` 是元素顶部距离文档顶部的高度（包括滚动条的距离）；
- 内容达到显示区域的：`img.offsetTop < window.innerHeight + document.body.scrollTop;`

### 017：如何解决 1px 问题？

1px问题是指在高像素密度（Retina）屏幕上显示的1像素边框或线条看起来过粗的问题。这是由于高像素密度屏幕的物理像素与CSS像素之间的差异导致的。

以下是一些常见的解决1px问题的方法：

1. **使用缩放：** 可以使用`transform: scale()`将元素进行缩放，使其显示为0.5px或0.3333px等细小像素。例如：

   ```css
   .element {
     transform: scale(0.5);
   }
   ```

2. **使用伪元素和transform：** 可以使用伪元素和`transform: scaleY()`来创建细小的边框或线条。例如：

   ```css
   .element::before {
     content: '';
     display: block;
     height: 1px;
     background-color: #000;
     transform: scaleY(0.5);
   }
   ```

3. **使用border-image：** 可以使用CSS的`border-image`属性来创建细小的边框。通过定义一个1像素的图片作为边框图像，并使用`slice`和`repeat`属性来控制边框的展示方式。例如：

   ```css
   .element {
     border-width: 1px;
     border-style: solid;
     border-image: url(border-image.png) 1 1 stretch;
   }
   ```

### 018：如何设置小于12px的字体？

在谷歌下css设置字体大小为12px及以下时，显示都是一样大小，都是默认12px。

**解决办法：**

- 使用Webkit的内核的 `-webkit-text-size-adjust:none` 的私有CSS属性来解决（高版本不兼容）;
- 使用 CSS3 中的 `transform:scale(.xx)` 解决；
- 使用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观。

### 019：对 sticky 定位的理解？

`sticky`定位是一种基于用户滚动位置的定位方式。通过将元素在`position: relative`和`position: fixed`之间切换，元素会在滚动到达指定阈值时固定在目标位置。如果没有指定阈值，元素将表现为`position: relative`。

### 020：absolute 与 fixed 共同点与不同点？

`absolute`定位和`fixed`定位是CSS中常用的两种定位方式，它们有一些共同点和不同点。

共同点：

1. **相对于定位上下文进行定位：** 无论是`absolute`定位还是`fixed`定位，它们都是相对于其最近的定位上下文进行定位。如果没有显式指定定位上下文，则相对于最近的非静态定位的祖先元素进行定位，如果没有则相对于初始包含块（通常是视窗）进行定位。
2. **可以通过设置偏移属性进行定位：** 无论是`absolute`定位还是`fixed`定位，都可以通过设置`top`、`right`、`bottom`、`left`等偏移属性来指定元素的位置。

不同点：

1. **相对于滚动机制的不同：**
   - `absolute`定位是相对于最近的具有定位上下文的祖先元素进行定位，即使祖先元素具有滚动机制，元素也不会随着滚动而移动。
   - `fixed`定位是相对于视窗进行定位，并会随着页面的滚动保持固定位置，不会受到父元素滚动影响。
2. **脱离文档流的不同：**
   - `absolute`定位的元素脱离了文档流，它不会占据原来的位置，而其他元素会根据其脱离文档流后的位置进行布局。
   - `fixed`定位的元素也脱离了文档流，但它会以视窗为参考点进行定位，不影响其他元素的布局。
3. **相对定位的父元素：**
   - `absolute`定位的元素的定位参考对象是最近的定位祖先元素，它的父元素如果没有设置定位属性，则不会影响`absolute`定位的位置。
   - `fixed`定位的元素的定位参考对象是视窗，它的父元素对其定位没有影响。





