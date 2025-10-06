<template>
  <div class="markdown-renderer">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>
    <div v-else-if="error" class="error-state">
      <p>❌ {{ error }}</p>
    </div>
    <article v-else class="markdown-content" v-html="renderedContent"></article>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import markedKatex from 'marked-katex-extension'
import 'highlight.js/styles/github-dark.css'
import 'katex/dist/katex.min.css'

const props = defineProps({
  // Markdown 文件路径或直接传入的 Markdown 文本
  source: {
    type: String,
    required: true
  },
  // 是否是文件路径（true）还是直接的 markdown 文本（false）
  isFilePath: {
    type: Boolean,
    default: true
  }
})

const renderedContent = ref('')
const loading = ref(false)
const error = ref(null)

// 配置 KaTeX 扩展
marked.use(
  markedKatex({
    throwOnError: false,
    output: 'html',
    displayMode: false,
    // 支持 LaTeX 环境如 equation, align 等
    trust: true,
    strict: false
  })
)

// 配置 marked
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  xhtml: false
})

// 自定义渲染器
const renderer = new marked.Renderer()

// 自定义代码块渲染（为代码高亮做准备）
renderer.code = (code, language) => {
  const validLanguage = language || 'plaintext'
  // 不转义 HTML，让 highlight.js 处理
  let highlightedCode = code
  if (language && hljs.getLanguage(language)) {
    try {
      highlightedCode = hljs.highlight(code, { language }).value
    } catch (e) {
      console.warn('Code highlighting failed:', e)
    }
  }
  return `<pre><code class="hljs language-${validLanguage}">${highlightedCode}</code></pre>`
}

// 自定义链接渲染（在新标签页打开外部链接）
renderer.link = (href, title, text) => {
  // 确保 href 是字符串
  const hrefStr = href?.href || href || ''
  const isExternal = hrefStr.startsWith('http')
  const target = isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''
  const titleAttr = title ? `title="${title}"` : ''
  return `<a href="${hrefStr}" ${target} ${titleAttr}>${text}</a>`
}

marked.use({ renderer })

// HTML 转义函数（保留用于其他用途）
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// 加载和渲染 Markdown
async function loadAndRender() {
  loading.value = true
  error.value = null

  try {
    let markdownText = props.source

    if (props.isFilePath) {
      // 从文件加载
      // 处理 base path：如果路径以 / 开头，添加 base URL
      const basePath = import.meta.env.BASE_URL || '/'
      const filePath = props.source.startsWith('/')
        ? basePath + props.source.slice(1)
        : props.source

      const response = await fetch(filePath)
      if (!response.ok) {
        throw new Error(`无法加载文件: ${response.statusText}`)
      }
      markdownText = await response.text()
    }

    // 渲染 Markdown
    const rawHtml = marked.parse(markdownText)

    // 使用 DOMPurify 清理 HTML 以防止 XSS 攻击
    renderedContent.value = DOMPurify.sanitize(rawHtml, {
      // 允许所有常用的 HTML 标签和属性（包括 KaTeX 和 highlight.js 需要的）
      ALLOWED_TAGS: [
        'p',
        'br',
        'strong',
        'em',
        'u',
        's',
        'a',
        'img',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'ul',
        'ol',
        'li',
        'blockquote',
        'code',
        'pre',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td',
        'hr',
        'span',
        'div',
        'sup',
        'sub',
        'annotation',
        'semantics',
        'mrow',
        'mi',
        'mo',
        'mn',
        'msup',
        'msub',
        'mfrac',
        'math'
      ],
      ALLOWED_ATTR: [
        'href',
        'src',
        'alt',
        'title',
        'class',
        'target',
        'rel',
        'style',
        'data-katex',
        'xmlns'
      ],
      // 允许外部链接
      ALLOW_UNKNOWN_PROTOCOLS: false
    })
  } catch (err) {
    error.value = err.message
    console.error('Markdown 渲染错误:', err)
  } finally {
    loading.value = false
  }
}

// 监听 source 变化
watch(() => props.source, loadAndRender, { immediate: true })
</script>

<style scoped>
.markdown-renderer {
  width: 100%;
  min-height: 200px;
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: var(--text-light);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-state {
  color: #ef4444;
}

/* Markdown 内容样式 */
.markdown-content {
  line-height: 1.8;
  color: var(--text-dark);
  font-size: 1.05rem;
}

/* 标题样式 */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-dark);
}

.markdown-content :deep(h1) {
  font-size: 2.5rem;
  border-bottom: 3px solid var(--primary-color);
  padding-bottom: 0.5rem;
}

.markdown-content :deep(h2) {
  font-size: 2rem;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 0.5rem;
}

.markdown-content :deep(h3) {
  font-size: 1.5rem;
}
.markdown-content :deep(h4) {
  font-size: 1.25rem;
}
.markdown-content :deep(h5) {
  font-size: 1.1rem;
}
.markdown-content :deep(h6) {
  font-size: 1rem;
}

/* 段落和列表 */
.markdown-content :deep(p) {
  margin-bottom: 1.25rem;
  line-height: 1.8;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: 1.25rem;
  padding-left: 2rem;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5rem;
}

/* 链接样式 */
.markdown-content :deep(a) {
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.markdown-content :deep(a:hover) {
  border-bottom-color: var(--primary-color);
  opacity: 0.8;
}

/* 代码样式 */
.markdown-content :deep(code) {
  background: var(--bg-lighter);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: #e01e5a;
}

/* 代码块样式（使用 highlight.js）*/
.markdown-content :deep(pre) {
  background: #282c34;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  border-left: 4px solid var(--primary-color);
}

.markdown-content :deep(pre code.hljs) {
  background: transparent;
  padding: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  display: block;
}

/* KaTeX 数学公式样式 */
.markdown-content :deep(.katex) {
  font-size: 1.1em;
}

.markdown-content :deep(.katex-display) {
  margin: 1.5rem 0;
  overflow-x: auto;
  overflow-y: hidden;
}

/* 引用块 */
.markdown-content :deep(blockquote) {
  border-left: 4px solid var(--primary-color);
  padding-left: 1.5rem;
  margin: 1.5rem 0;
  color: var(--text-light);
  font-style: italic;
  background: var(--bg-light);
  padding: 1rem 1.5rem;
  border-radius: 0 8px 8px 0;
}

/* 表格样式 */
.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  text-align: left;
}

.markdown-content :deep(th) {
  background: var(--bg-gradient-primary);
  color: white;
  font-weight: 600;
}

.markdown-content :deep(tr:nth-child(even)) {
  background: var(--bg-light);
}

/* 图片样式 */
.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
  box-shadow: var(--shadow);
  display: block;
}

/* 水平线 */
.markdown-content :deep(hr) {
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
  margin: 2rem 0;
}

/* 深色模式适配 */
[data-theme='dark'] .markdown-content :deep(code) {
  background: var(--bg-lighter);
  color: #ff79c6;
}

[data-theme='dark'] .markdown-content :deep(pre) {
  background: var(--bg-lighter);
}

[data-theme='dark'] .markdown-content :deep(blockquote) {
  background: var(--bg-lighter);
}

[data-theme='dark'] .markdown-content :deep(tr:nth-child(even)) {
  background: var(--bg-lighter);
}
</style>
