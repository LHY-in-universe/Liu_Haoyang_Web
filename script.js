// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
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

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showMessage('请填写所有必填字段', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('请输入有效的邮箱地址', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = '发送中...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showMessage('消息发送成功！我会尽快回复您。', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

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

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

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
        
        if (!email) {
            showMessage('请输入邮箱地址', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('请输入有效的邮箱地址', 'error');
            return;
        }
        
        // Simulate subscription
        const submitButton = subscribeForm.querySelector('button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = '订阅中...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showMessage('订阅成功！感谢您的关注。', 'success');
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

// Initialize tag cloud when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeTagCloud();
});