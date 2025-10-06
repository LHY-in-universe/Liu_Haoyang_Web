import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  // 简化为只支持中文
  const t = (key) => {
    const translations = {
      name: '刘浩洋',
      home: '首页',
      blog: '博客',
      documents: '文档',
      resume: '简历',
      about: '关于我',
      projects: '项目作品',
      contact: '联系我',
      skills: '技能专长',
      viewMore: '查看更多',
      download: '下载',
      sendMessage: '发送消息',
      subscribe: '订阅',
      readMore: '阅读更多'
    }

    return translations[key] || key
  }

  return {
    t
  }
})
