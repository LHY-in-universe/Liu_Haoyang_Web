---
title: How to Use the Automated Blog System
date: 2024-08-11
category: tutorial
tags: [Blog System, Markdown, Automation]
author: Liu Haoyang
language: en
excerpt: A comprehensive guide on how to use this automated blog system, from creating Markdown files to automatically generating HTML pages.
---

# How to Use the Automated Blog System

Welcome to this powerful automated blog system! This system allows you to easily create complete HTML blog articles by simply creating Markdown files.

## System Features

### 🚀 Automated Building
- Automatically converts Markdown files to HTML article pages
- Automatically updates blog list pages
- Automatically generates article excerpts and reading time
- Supports bilingual Chinese-English system

### 📝 Markdown Support
- Full Markdown syntax support
- Code syntax highlighting
- Front Matter metadata support
- Automatic table of contents and navigation generation

### 🎨 Beautiful Interface
- Responsive design
- Modern UI style
- Dark/light theme support
- Mobile-friendly

## How to Use

### 1. Create New Article
```bash
npm run new "Article Title"
```

This will create a new Markdown file template in the `posts/` directory.

### 2. Edit Article Content
Edit the generated Markdown file and add your content:

```markdown
---
title: My New Article
date: 2024-08-11
category: tech
tags: [Technology, Frontend, React]
author: Liu Haoyang
language: en
excerpt: This is a brief description of the article
---

# Article Title

Your article content...
```

### 3. Build Website
```bash
npm run build
```

The system will automatically:
- Generate HTML article pages
- Update blog lists
- Generate article index

### 4. Preview Website
```bash
npm run serve
```

Visit `http://localhost:8000` in your browser to preview your website.

## Front Matter Configuration

The Front Matter at the beginning of each Markdown file supports the following fields:

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | ✅ | Article title | `"React Hooks Deep Dive"` |
| `date` | ✅ | Publication date | `2024-08-11` |
| `category` | ✅ | Article category | `tech`, `tutorial`, `life`, `thoughts` |
| `tags` | ✅ | Article tags | `[React, JavaScript, Frontend]` |
| `author` | ❌ | Author name | `"Liu Haoyang"` |
| `language` | ❌ | Language identifier | `zh` or `en` |
| `excerpt` | ❌ | Article excerpt | Will be auto-generated if not provided |

## Directory Structure

```
Liu_Haoyang_Web/
├── posts/              # Markdown files directory
│   ├── article-1.md
│   ├── article-2.md
│   └── posts.json      # Article index (auto-generated)
├── articles/           # HTML article pages (auto-generated)
│   ├── article-1.html
│   └── article-2.html
├── templates/          # HTML template files
├── build-blog.js       # Build script
├── blog.html           # Chinese blog list page
├── blog-en.html        # English blog list page
└── package.json        # Project configuration
```

## Advanced Features

### Auto-watch File Changes
During development, you can use the following command for automatic building:

```bash
npm run watch
```

The system will automatically rebuild when Markdown files change.

### Clean Generated Files
```bash
npm run clean
```

### Bilingual Support
When creating English articles, add `-en` suffix to the filename:
```markdown
---
title: How to Use This Blog System
language: en
---
```

## Custom Templates

You can create custom HTML templates in the `templates/` directory:
- `article-zh.html` - Chinese article template
- `article-en.html` - English article template

## Deploy to GitHub Pages

1. Build the website: `npm run build`
2. Commit all files to GitHub
3. Enable GitHub Pages in repository settings
4. Select `master` branch as source branch

## Troubleshooting

### Common Issues

**Q: Article doesn't appear in blog list?**
A: Check if the Markdown file's Front Matter format is correct, ensure you've run `npm run build`.

**Q: Code highlighting doesn't work?**
A: Make sure code blocks use correct language identifiers, e.g.: \`\`\`javascript

**Q: Images not displaying properly?**
A: Use relative paths for images, recommend placing images in `images/` directory.

### Getting Help

If you encounter problems, you can:
1. Check build log output
2. Verify Markdown syntax
3. Validate Front Matter format
4. Confirm file paths are correct

## Summary

This automated blog system greatly simplifies the blog article creation and management process. You only need to focus on content creation, and the system will automatically handle all the technical details.

Start your blogging journey! 🎉