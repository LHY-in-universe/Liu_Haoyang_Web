// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link or outside
document.addEventListener('click', (e) => {
    if (mobileMenu && navMenu) {
        // Close when clicking nav link
        if (e.target.classList.contains('nav-link')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
        // Close when clicking outside
        else if (!e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle') && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Close mobile menu with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && navMenu && navMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Enhanced cross-page navigation handler
const handleCrossPageNavigation = (e, href) => {
    // Check if it's an anchor link on the same page
    if (href.startsWith('#') && !href.includes('.html')) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // If we're on index.html and it's an anchor, smooth scroll
        if (currentPage === 'index.html' || currentPage === '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Close mobile menu if open
                if (mobileMenu && navMenu) {
                    mobileMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active navigation state
                updateNavActiveState(href);
            }
        } else {
            // If we're not on index.html, navigate to index.html with anchor
            window.location.href = `index.html${href}`;
        }
    } else if (href.includes('#') && href.includes('.html')) {
        // Handle links like index.html#about
        const [page, anchor] = href.split('#');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        if (currentPage === page) {
            // Same page, just scroll to anchor
            e.preventDefault();
            const target = document.querySelector(`#${anchor}`);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            // Different page, navigate normally
            window.location.href = href;
        }
    }
    // For regular page links (blog.html, resume.html), let them navigate normally
};

// Enhanced smooth scrolling with cross-page support
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            handleCrossPageNavigation(e, href);
        }
    }
});


// Navigation active state management
const updateNavActiveState = (activeAnchor = null) => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Handle different page types
        if (currentPage === 'index.html' || currentPage === '') {
            // On homepage
            if (href === 'index.html' || href === '#home') {
                if (!currentHash || currentHash === '#home') {
                    link.classList.add('active');
                }
            } else if (href.startsWith('#')) {
                // Anchor links on homepage
                if (href === currentHash || href === activeAnchor) {
                    link.classList.add('active');
                }
            }
        } else if (currentPage === 'blog.html' && href === 'blog.html') {
            link.classList.add('active');
        } else if (currentPage === 'resume.html' && href === 'resume.html') {
            link.classList.add('active');
        } else if (href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
};

// Enhanced navigation highlighting on scroll (for homepage)
const sections = document.querySelectorAll('section[id]');
const navHighlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = `#${entry.target.id}`;
            updateNavActiveState(sectionId);
        }
    });
}, {
    threshold: 0.6,
    rootMargin: '-50px 0px -50px 0px'
});

// Observe sections for navigation highlighting
sections.forEach(section => {
    navHighlightObserver.observe(section);
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .contact-item, .skill-tag');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

/**
 * ============================================
 * FORM HANDLING
 * ============================================
 */

/**
 * 联系表单处理
 */
const initContactForm = () => {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // 基础验证（支持本地化消息）
        const currentLang = getCurrentLanguage();
        
        if (!name || !email || !message) {
            showMessage(getLocalizedMessage('required_fields', currentLang), 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage(getLocalizedMessage('invalid_email', currentLang), 'error');
            return;
        }
        
        // 模拟表单提交
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = getLocalizedMessage('sending', currentLang);
        submitButton.disabled = true;
        
        // 模拟API调用
        setTimeout(() => {
            showMessage(getLocalizedMessage('contact_success', currentLang), 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
};

// 初始化联系表单
initContactForm();

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show messages
function showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 0.5rem;
        font-weight: 500;
        text-align: center;
        ${type === 'success' 
            ? 'background: #DCFCE7; color: #166534; border: 1px solid #BBF7D0;' 
            : 'background: #FEE2E2; color: #991B1B; border: 1px solid #FECACA;'
        }
    `;
    
    // Insert message after form
    contactForm.appendChild(messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Page load initialization and anchor handling
const handlePageLoad = () => {
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                updateNavActiveState(hash);
            }
        }, 100);
    } else {
        updateNavActiveState();
    }
    
    // Initialize typing animation for hero section
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
};

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', handlePageLoad);

// Handle browser back/forward navigation
window.addEventListener('popstate', handlePageLoad);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Skills animation
function animateSkills() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
    });
}

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Easter egg - Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activated
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        
        // Add rainbow animation
        if (!document.querySelector('#rainbow-style')) {
            const style = document.createElement('style');
            style.id = 'rainbow-style';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    25% { filter: hue-rotate(90deg); }
                    50% { filter: hue-rotate(180deg); }
                    75% { filter: hue-rotate(270deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        konamiCode = [];
    }
});

// Performance optimization - Debounced scroll handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handlers
const debouncedScrollHandler = debounce(() => {
    // Consolidated scroll handling
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Loading screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Initialize animations
    animateSkills();
    initializeSkillBars();
});

// Print styles
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// Blog functionality
function initializeBlogFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;

            // Filter blog posts
            blogPosts.forEach(post => {
                if (category === 'all' || post.dataset.category === category) {
                    post.style.display = 'block';
                    post.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
}

// Blog subscription form
function initializeBlogSubscription() {
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (!subscribeForm) return;

    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = subscribeForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        const currentLang = getCurrentLanguage();
        
        if (!email) {
            showMessage(getLocalizedMessage('required_fields', currentLang), 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage(getLocalizedMessage('invalid_email', currentLang), 'error');
            return;
        }
        
        // Simulate subscription
        const submitButton = subscribeForm.querySelector('button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = getLocalizedMessage('subscribing', currentLang);
        submitButton.disabled = true;
        
        setTimeout(() => {
            showMessage(getLocalizedMessage('subscribe_success', currentLang) + email, 'success');
            emailInput.value = '';
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Resume functionality
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.dataset.width;
                skillBar.style.width = width;
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

// Resume print functionality
function initializeResumePrint() {
    const printBtn = document.querySelector('button[onclick="window.print()"]');
    
    if (!printBtn) return;

    printBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.print();
    });
}

// Page-specific initialization
function initializePageSpecificFeatures() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('blog.html') || currentPage.endsWith('/blog/')) {
        initializeBlogFilters();
        initializeBlogSubscription();
    }
    
    if (currentPage.includes('resume.html') || currentPage.endsWith('/resume/')) {
        initializeSkillBars();
        initializeResumePrint();
    }
}

// Pagination functionality
function initializePagination() {
    const paginationBtns = document.querySelectorAll('.pagination-number');
    
    if (paginationBtns.length === 0) return;

    paginationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active page
            paginationBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Here you would typically load new content
            console.log('Loading page:', btn.textContent);
        });
    });
}

// Page transition effects
const addPageTransitionEffects = () => {
    // Add loading effect for page changes
    document.addEventListener('beforeunload', function() {
        document.body.style.opacity = '0.8';
    });
    
    // Restore opacity on page load
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.3s ease';
    });
};

// Initialize page transitions
addPageTransitionEffects();

// Quick navigation hover effects
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.quick-nav-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializePageSpecificFeatures();
    initializePagination();
});

// Tag cloud interactions
function initializeTagCloud() {
    const cloudTags = document.querySelectorAll('.cloud-tag');
    
    cloudTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const tagText = tag.textContent;
            
            // Filter blog posts by tag
            const blogPosts = document.querySelectorAll('.blog-post');
            const filterBtns = document.querySelectorAll('.filter-btn');
            
            // Reset filter buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Show posts containing this tag
            blogPosts.forEach(post => {
                const postTags = post.querySelectorAll('.tag');
                const hasTag = Array.from(postTags).some(postTag => 
                    postTag.textContent.toLowerCase().includes(tagText.toLowerCase())
                );
                
                if (hasTag) {
                    post.style.display = 'block';
                    post.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
}

// Language switching functionality
const initializeLanguageSwitcher = () => {
    const languageBtns = document.querySelectorAll('.lang-btn');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Language mapping for pages
    const languageMapping = {
        'index.html': { zh: 'index.html', en: 'index-en.html' },
        'index-en.html': { zh: 'index.html', en: 'index-en.html' },
        'blog.html': { zh: 'blog.html', en: 'blog-en.html' },
        'blog-en.html': { zh: 'blog.html', en: 'blog-en.html' },
        'resume.html': { zh: 'resume.html', en: 'resume-en.html' },
        'resume-en.html': { zh: 'resume.html', en: 'resume-en.html' },
        'react-hooks-deep-dive.html': { zh: 'react-hooks-deep-dive.html', en: 'react-hooks-deep-dive-en.html' },
        'react-hooks-deep-dive-en.html': { zh: 'react-hooks-deep-dive.html', en: 'react-hooks-deep-dive-en.html' },
        'frontend-performance-guide.html': { zh: 'frontend-performance-guide.html', en: '../blog-en.html' }
    };
    
    // Set active language button based on current page
    languageBtns.forEach(btn => {
        btn.classList.remove('active');
        const lang = btn.dataset.lang;
        
        if ((lang === 'zh' && !currentPage.includes('-en')) || 
            (lang === 'en' && currentPage.includes('-en'))) {
            btn.classList.add('active');
        }
    });
    
    // Handle language switch
    languageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetLang = btn.dataset.lang;
            let targetPage;
            
            // Check if we have explicit mapping
            if (languageMapping[currentPage]) {
                targetPage = languageMapping[currentPage][targetLang];
            } else {
                // For article pages not in the mapping, use pattern matching
                if (currentPage.endsWith('-en.html') && targetLang === 'zh') {
                    // Remove -en from English article
                    targetPage = currentPage.replace('-en.html', '.html');
                } else if (!currentPage.endsWith('-en.html') && targetLang === 'en') {
                    // Add -en to Chinese article
                    targetPage = currentPage.replace('.html', '-en.html');
                } else {
                    // Same language, no change needed
                    targetPage = currentPage;
                }
            }
            
            if (targetPage && targetPage !== currentPage) {
                // Store current hash for navigation
                const currentHash = window.location.hash;
                
                // Navigate to the target page
                if (currentHash && currentHash.startsWith('#')) {
                    window.location.href = targetPage + currentHash;
                } else {
                    window.location.href = targetPage;
                }
            }
        });
    });
};

// Initialize language switcher
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguageSwitcher();
});

// Language-aware form messages
const getLocalizedMessage = (key, lang = 'zh') => {
    const messages = {
        zh: {
            'contact_success': '感谢您的留言！我会尽快回复您。',
            'subscribe_success': '感谢订阅！确认邮件已发送至：',
            'required_fields': '请填写所有必填字段',
            'invalid_email': '请输入有效的邮箱地址',
            'sending': '发送中...',
            'subscribing': '订阅中...'
        },
        en: {
            'contact_success': 'Thank you for your message! I will reply to you soon.',
            'subscribe_success': 'Thank you for subscribing! Confirmation email sent to: ',
            'required_fields': 'Please fill in all required fields',
            'invalid_email': 'Please enter a valid email address',
            'sending': 'Sending...',
            'subscribing': 'Subscribing...'
        }
    };
    
    return messages[lang]?.[key] || messages['zh'][key];
};

// Update form handling to use localized messages
const getCurrentLanguage = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    return currentPage.includes('-en') ? 'en' : 'zh';
};

// Initialize tag cloud when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeTagCloud();
});

