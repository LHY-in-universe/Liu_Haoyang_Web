// ============================================
// ENHANCED ANIMATIONS AND INTERACTIONS
// ============================================

class AnimationManager {
    constructor() {
        this.observer = null;
        this.scrollTimeout = null;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupHoverEffects();
        this.setupPageTransitions();
    }

    // 设置交叉观察器用于滚动时的元素动画
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                    entry.target.classList.remove('animate-in');
                }
            });
        }, options);

        // 观察所有可动画元素
        document.querySelectorAll('.hero-content, .section, .card, .skill-item, .project-item').forEach(el => {
            this.observer.observe(el);
        });
    }

    // 滚动动画
    setupScrollAnimations() {
        let ticking = false;

        const updateScrollEffects = () => {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // 导航栏滚动效果
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (scrollTop > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }

            // 添加滚动进度指示器
            this.updateScrollProgress(scrollTop);

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    // 更新滚动进度
    updateScrollProgress(scrollTop) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = this.createScrollProgressBar();
        }
        
        progressBar.style.width = `${progress}%`;
    }

    // 创建滚动进度条
    createScrollProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #4F46E5, #7C3AED, #EC4899);
            z-index: 9999;
            transition: width 0.1s ease;
            border-radius: 0 2px 2px 0;
        `;
        document.body.appendChild(progressBar);
        return progressBar;
    }

    // 视差效果
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        };

        window.addEventListener('scroll', handleParallax);
    }

    // 悬停效果增强
    setupHoverEffects() {
        // 按钮磁性效果
        document.querySelectorAll('.btn, .card').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
            });

            element.addEventListener('mousemove', (e) => {
                this.magneticEffect(e, element);
            });

            element.addEventListener('mouseleave', (e) => {
                element.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    // 波纹效果
    createRippleEffect(e) {
        const button = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const rippleStyles = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                background-color: rgba(255, 255, 255, 0.6);
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;

        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = rippleStyles;
            document.head.appendChild(style);
        }

        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 600);
    }

    // 磁性效果
    magneticEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
    }

    // 页面转场动画
    setupPageTransitions() {
        // 页面加载动画
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('page-loaded');
        });

        // 链接点击转场效果
        document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.target !== '_blank') {
                    this.pageTransition(e, link.href);
                }
            });
        });
    }

    // 页面转场
    pageTransition(e, url) {
        if (window.location.href === url) return;
        
        e.preventDefault();
        
        const overlay = document.createElement('div');
        overlay.className = 'page-transition';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #4F46E5, #7C3AED);
            z-index: 10000;
            transition: left 0.5s ease-in-out;
        `;
        
        document.body.appendChild(overlay);
        
        // 动画开始
        setTimeout(() => {
            overlay.style.left = '0';
        }, 10);
        
        // 页面跳转
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }

    // 打字机效果
    typewriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }

    // 数字计数动画
    countUp(element, start, end, duration = 2000) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * this.easeOutCubic(progress));
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    // 缓动函数
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    // 销毁观察器
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// CSS 动画样式
const animationStyles = `
    /* 页面加载动画 */
    body:not(.page-loaded) {
        overflow: hidden;
    }
    
    body:not(.page-loaded) * {
        animation-play-state: paused;
    }
    
    .page-loaded {
        animation: pageSlideIn 0.6s ease-out;
    }
    
    @keyframes pageSlideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* 滚动动画 */
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* 导航栏滚动效果 */
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }
    
    [data-theme="dark"] .navbar.scrolled {
        background: rgba(31, 41, 55, 0.95);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    }

    /* 卡片悬停效果增强 */
    .card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
    }
    
    .card:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            transparent
        );
        transition: left 0.5s;
    }
    
    .card:hover::before {
        left: 100%;
    }

    /* 按钮增强效果 */
    .btn {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }
    
    .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
    }
    
    .btn:active {
        transform: translateY(0);
    }

    /* 文本闪烁效果 */
    @keyframes textGlow {
        0%, 100% { text-shadow: 0 0 5px rgba(79, 70, 229, 0.5); }
        50% { text-shadow: 0 0 20px rgba(79, 70, 229, 0.8), 0 0 30px rgba(124, 58, 237, 0.6); }
    }
    
    .text-glow {
        animation: textGlow 2s ease-in-out infinite;
    }

    /* 加载动画 */
    .loading-dots {
        display: inline-block;
    }
    
    .loading-dots::after {
        content: '';
        animation: dots 1.5s linear infinite;
    }
    
    @keyframes dots {
        0%, 20% { content: '.'; }
        40% { content: '..'; }
        60%, 100% { content: '...'; }
    }
`;

// 添加样式到页面
if (!document.querySelector('#animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = animationStyles;
    document.head.appendChild(style);
}

// 初始化动画管理器
let animationManager;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        animationManager = new AnimationManager();
    });
} else {
    animationManager = new AnimationManager();
}

// 导出用于外部使用
window.animationManager = animationManager;