# 欢迎来到我的博客

这是一个使用 **Markdown** 编写的示例博客文章。

## 功能特点

### 1. 支持丰富的 Markdown 语法

- ✅ 标题和段落
- ✅ **粗体** 和 *斜体*
- ✅ 代码块和行内代码
- ✅ 表格
- ✅ 链接

### 2. 代码高亮

```javascript
// JavaScript 示例
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('World');
```

```python
# Python 示例
def calculate_sum(a, b):
    return a + b

result = calculate_sum(5, 3)
print(f"结果是: {result}")
```

### 3. 引用块

> 这是一个引用块示例。
> 
> 可以用来突出显示重要信息或引用他人的观点。

### 4. 表格支持

| 功能 | 支持 | 说明 |
|------|------|------|
| Markdown | ✅ | 完整支持 |
| PDF | ✅ | 嵌入式预览 |
| 语法高亮 | ✅ | 多语言支持 |
| 响应式 | ✅ | 移动端友好 |

## 如何使用

### 创建新博客文章

1. 在 `public/blog-posts/` 目录下创建 `.md` 文件
2. 编写 Markdown 内容
3. 在博客配置中添加文章信息

### 示例配置

```javascript
{
  id: 'my-post',
  title: '文章标题',
  type: 'markdown',
  content: '/blog-posts/my-post.md',
  isFilePath: true
}
```

## 数学公式

### 行内公式

爱因斯坦质能方程：$E = mc^2$，薛定谔方程：$i\hbar\frac{\partial}{\partial t}\Psi = \hat{H}\Psi$

### 块级公式

高斯积分：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### 麦克斯韦方程组

$$
\nabla \cdot \mathbf{E} = \frac{\rho}{\epsilon_0} \tag{1}
$$

$$
\nabla \cdot \mathbf{B} = 0 \tag{2}
$$

$$
\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t} \tag{3}
$$

$$
\nabla \times \mathbf{B} = \mu_0\mathbf{J} + \mu_0\epsilon_0\frac{\partial \mathbf{E}}{\partial t} \tag{4}
$$

### 复杂矩阵方程

薛定谔方程的矩阵形式：

$$
\begin{pmatrix}
H_{11} & H_{12} & \cdots & H_{1n} \\
H_{21} & H_{22} & \cdots & H_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
H_{n1} & H_{n2} & \cdots & H_{nn}
\end{pmatrix}
\begin{pmatrix}
\psi_1 \\
\psi_2 \\
\vdots \\
\psi_n
\end{pmatrix}
= E
\begin{pmatrix}
\psi_1 \\
\psi_2 \\
\vdots \\
\psi_n
\end{pmatrix}
$$

### 多行公式推导

贝叶斯定理推导：

$$
\begin{aligned}
P(A|B) &= \frac{P(B|A)P(A)}{P(B)} \\
&= \frac{P(B|A)P(A)}{P(B|A)P(A) + P(B|\neg A)P(\neg A)} \\
&= \frac{P(B|A)P(A)}{\sum_{i}P(B|A_i)P(A_i)}
\end{aligned}
$$

### 量子力学中的算符

海森堡不确定性原理：

$$
\Delta x \cdot \Delta p \geq \frac{\hbar}{2} \tag{5}
$$

其中动量算符定义为：

$$
\hat{p} = -i\hbar\frac{\partial}{\partial x}
$$

### 傅里叶变换

$$
\mathcal{F}\{f(t)\} = F(\omega) = \int_{-\infty}^{\infty} f(t)e^{-i\omega t}dt
$$

逆变换：

$$
\mathcal{F}^{-1}\{F(\omega)\} = f(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty} F(\omega)e^{i\omega t}d\omega
$$

## 链接

- [访问我的 GitHub](https://github.com)
- [Vue.js 官网](https://vuejs.org)

## 总结

这个 Markdown 博客系统提供了：

1. 🎨 美观的排版
2. 📱 响应式设计
3. 🌙 深色模式支持
4. 📝 完整的 Markdown 语法
5. 📄 PDF 预览功能

---

感谢阅读！如有问题，欢迎联系我。


