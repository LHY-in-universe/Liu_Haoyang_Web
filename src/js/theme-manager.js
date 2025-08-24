// ============================================
// THEME MANAGER - Universal Theme Toggle System
// ============================================

class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.querySelector('.theme-toggle-icon');
        
        // Language-specific text
        this.messages = {
            zh: {
                light: '切换到深色主题',
                dark: '切换到浅色主题'
            },
            en: {
                light: 'Switch to dark theme', 
                dark: 'Switch to light theme'
            }
        };
        
        // Detect page language
        this.lang = document.documentElement.lang === 'en' ? 'en' : 'zh';
        
        this.init();
    }
    
    init() {
        if (!this.themeToggle || !this.themeIcon) return;
        
        // Set initial theme
        this.setTheme(this.theme);
        
        // Bind click event
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Listen to system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (!this.themeIcon) return;
        
        // Update icon and title
        if (theme === 'dark') {
            this.themeIcon.textContent = '☀️';
            this.themeToggle.setAttribute('title', this.messages[this.lang].dark);
        } else {
            this.themeIcon.textContent = '🌙';
            this.themeToggle.setAttribute('title', this.messages[this.lang].light);
        }
        
        // Trigger custom event
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme } 
        }));
    }
    
    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add toggle animation effect
        if (this.themeToggle) {
            this.themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.themeToggle.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    getTheme() {
        return this.theme;
    }
}

// Initialize theme manager when DOM is ready
let themeManager;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        themeManager = new ThemeManager();
    });
} else {
    themeManager = new ThemeManager();
}

// Export global functions for other scripts
window.getTheme = () => themeManager?.getTheme() || 'light';
window.setTheme = (theme) => themeManager?.setTheme(theme);