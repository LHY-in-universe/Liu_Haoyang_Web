// ============================================
// PERFORMANCE OPTIMIZATION MODULE
// ============================================

class PerformanceOptimizer {
    constructor() {
        this.lazyLoadImages = [];
        this.intersectionObserver = null;
        this.performanceMetrics = {};
        
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.optimizeImages();
        this.preloadCriticalResources();
        this.setupResourceHints();
        this.monitorPerformance();
        this.setupServiceWorker();
    }

    // 图片懒加载
    setupLazyLoading() {
        // 创建交叉观察器
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.intersectionObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // 查找所有需要懒加载的图片
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.intersectionObserver.observe(img);
        });
    }

    // 加载图片
    loadImage(img) {
        return new Promise((resolve, reject) => {
            const imageLoader = new Image();
            
            imageLoader.onload = () => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                resolve(img);
            };
            
            imageLoader.onerror = () => {
                img.classList.add('error');
                reject(new Error('Image failed to load'));
            };
            
            imageLoader.src = img.dataset.src;
        });
    }

    // 图片优化
    optimizeImages() {
        // 为高 DPI 显示器提供适当的图片
        const images = document.querySelectorAll('img[data-src-2x]');
        const isHighDPI = window.devicePixelRatio > 1;
        
        images.forEach(img => {
            if (isHighDPI && img.dataset.src2x) {
                img.dataset.src = img.dataset.src2x;
            }
        });

        // 根据屏幕尺寸选择合适的图片
        this.setupResponsiveImages();
    }

    // 响应式图片
    setupResponsiveImages() {
        const responsiveImages = document.querySelectorAll('[data-responsive]');
        
        responsiveImages.forEach(img => {
            const sources = JSON.parse(img.dataset.responsive);
            const screenWidth = window.innerWidth;
            
            let selectedSrc = sources.default;
            
            if (screenWidth <= 480 && sources.small) {
                selectedSrc = sources.small;
            } else if (screenWidth <= 768 && sources.medium) {
                selectedSrc = sources.medium;
            } else if (sources.large) {
                selectedSrc = sources.large;
            }
            
            img.dataset.src = selectedSrc;
        });
    }

    // 预加载关键资源
    preloadCriticalResources() {
        const criticalResources = [
            { href: '../css/styles.css', as: 'style' },
            { href: '../js/script.js', as: 'script' },
            { href: '../../public/images/common/avatars/avatar.jpg', as: 'image' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            
            if (resource.type) {
                link.type = resource.type;
            }
            
            document.head.appendChild(link);
        });
    }

    // 设置资源提示
    setupResourceHints() {
        // DNS 预解析
        const dnsPrefetch = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdn.jsdelivr.net'
        ];

        dnsPrefetch.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });

        // 预连接关键第三方域名
        const preconnect = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];

        preconnect.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = '';
            document.head.appendChild(link);
        });
    }

    // 性能监控
    monitorPerformance() {
        if (!window.performance) return;

        // 监听页面加载完成
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.collectPerformanceMetrics();
            }, 100);
        });

        // 监听 Core Web Vitals
        this.observeWebVitals();
    }

    // 收集性能指标
    collectPerformanceMetrics() {
        const perfData = window.performance.timing;
        const navigation = window.performance.getEntriesByType('navigation')[0];
        
        this.performanceMetrics = {
            // 页面加载时间
            loadTime: perfData.loadEventEnd - perfData.navigationStart,
            
            // DNS 查询时间
            dnsTime: perfData.domainLookupEnd - perfData.domainLookupStart,
            
            // TCP 连接时间
            tcpTime: perfData.connectEnd - perfData.connectStart,
            
            // 请求响应时间
            requestTime: perfData.responseEnd - perfData.requestStart,
            
            // DOM 解析时间
            domParseTime: perfData.domContentLoadedEventEnd - perfData.domLoading,
            
            // 资源加载时间
            resourceLoadTime: perfData.loadEventEnd - perfData.domContentLoadedEventEnd,
            
            // 首次内容绘制（如果支持）
            fcp: navigation ? navigation.responseStart - navigation.fetchStart : 0
        };

        // 发送性能数据（如果需要）
        this.reportPerformanceData();
    }

    // 观察 Web Vitals
    observeWebVitals() {
        // 首次内容绘制 (FCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                if (entry.name === 'first-contentful-paint') {
                    this.performanceMetrics.fcp = entry.startTime;
                }
            });
        }).observe({ entryTypes: ['paint'] });

        // 最大内容绘制 (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.performanceMetrics.lcp = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // 首次输入延迟 (FID)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                this.performanceMetrics.fid = entry.processingStart - entry.startTime;
            });
        }).observe({ entryTypes: ['first-input'] });
    }

    // 报告性能数据
    reportPerformanceData() {
        if (window.gtag) {
            // 发送到 Google Analytics
            gtag('event', 'timing_complete', {
                name: 'load',
                value: this.performanceMetrics.loadTime
            });
        }

        // 控制台输出（开发环境）
        if (window.location.hostname === 'localhost') {
            console.group('🚀 Performance Metrics');
            console.table(this.performanceMetrics);
            console.groupEnd();
        }
    }

    // 设置 Service Worker
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    // 内存优化
    optimizeMemory() {
        // 清理不需要的事件监听器
        this.cleanupEventListeners();
        
        // 清理定时器
        this.cleanupTimers();
        
        // 清理观察器
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
    }

    cleanupEventListeners() {
        // 移除滚动事件监听器（如果存在）
        const scrollHandlers = ['scroll', 'resize', 'orientationchange'];
        scrollHandlers.forEach(event => {
            window.removeEventListener(event, this[`${event}Handler`]);
        });
    }

    cleanupTimers() {
        // 清理可能存在的定时器
        if (this.performanceTimer) {
            clearTimeout(this.performanceTimer);
        }
    }

    // 获取性能指标
    getMetrics() {
        return this.performanceMetrics;
    }

    // 销毁优化器
    destroy() {
        this.optimizeMemory();
    }
}

// CSS 性能优化样式
const performanceStyles = `
    /* 图片懒加载样式 */
    img.lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    img.loaded {
        opacity: 1;
    }
    
    img.error {
        opacity: 0.5;
        filter: grayscale(100%);
    }

    /* 骨架屏样式 */
    .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
    }
    
    [data-theme="dark"] .skeleton {
        background: linear-gradient(90deg, #374151 25%, #4B5563 50%, #374151 75%);
        background-size: 200% 100%;
    }
    
    @keyframes skeleton-loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }

    /* 性能优化的动画 */
    .optimized-animation {
        will-change: transform, opacity;
        transform: translateZ(0);
    }
    
    .optimized-animation:hover {
        backface-visibility: hidden;
        perspective: 1000px;
    }
`;

// 添加样式
if (!document.querySelector('#performance-styles')) {
    const style = document.createElement('style');
    style.id = 'performance-styles';
    style.textContent = performanceStyles;
    document.head.appendChild(style);
}

// 初始化性能优化器
let performanceOptimizer;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        performanceOptimizer = new PerformanceOptimizer();
    });
} else {
    performanceOptimizer = new PerformanceOptimizer();
}

// 页面卸载时清理资源
window.addEventListener('beforeunload', () => {
    if (performanceOptimizer) {
        performanceOptimizer.destroy();
    }
});

// 导出供外部使用
window.performanceOptimizer = performanceOptimizer;