import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLanguageStore = defineStore('language', () => {
  const currentLang = ref(localStorage.getItem('language') || 'zh')

  const setLanguage = (lang) => {
    currentLang.value = lang
    localStorage.setItem('language', lang)
  }

  const toggleLanguage = () => {
    const newLang = currentLang.value === 'zh' ? 'en' : 'zh'
    setLanguage(newLang)
  }

  const t = (key) => {
    const translations = {
      zh: {
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
        readMore: '阅读更多',
      },
      en: {
        name: 'Haoyang Liu',
        home: 'Home',
        blog: 'Blog',
        documents: 'Documents',
        resume: 'Resume',
        about: 'About',
        projects: 'Projects',
        contact: 'Contact',
        skills: 'Skills',
        viewMore: 'View More',
        download: 'Download',
        sendMessage: 'Send Message',
        subscribe: 'Subscribe',
        readMore: 'Read More',
      }
    }

    return translations[currentLang.value]?.[key] || key
  }

  return {
    currentLang,
    setLanguage,
    toggleLanguage,
    t
  }
})
