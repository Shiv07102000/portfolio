/* ========================================
   PORTFOLIO - Enhanced JavaScript
   Theme Switching, Language, Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initTheme();
    initLanguage();
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initLevelBars();
    initSmoothScroll();
});

/* ========================================
   THEME SWITCHING
   ======================================== */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('portfolioTheme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    html.setAttribute('data-theme', initialTheme);

    // Update meta theme-color
    updateThemeColor(initialTheme);

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolioTheme', newTheme);
            updateThemeColor(newTheme);
        });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolioTheme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            updateThemeColor(newTheme);
        }
    });
}

function updateThemeColor(theme) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0e17' : '#0ea5e9');
    }
}

/* ========================================
   LANGUAGE SWITCHING
   ======================================== */
let currentLang = 'en';

function initLanguage() {
    // Check localStorage for saved preference
    const savedLang = localStorage.getItem('portfolioLang');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage(currentLang);
    }

    // Language toggle button
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'de' : 'en';
            updateLanguage(currentLang);
            localStorage.setItem('portfolioLang', currentLang);
        });
    }
}

function updateLanguage(lang) {
    // Update all elements with data-en and data-de attributes
    const elements = document.querySelectorAll('[data-en][data-de]');

    elements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            // Check if element has child elements we should preserve
            const hasOnlyText = el.childNodes.length === 1 && el.childNodes[0].nodeType === 3;
            const hasIconAndSpan = el.querySelector('i') && el.querySelector('span');

            if (hasIconAndSpan) {
                // For buttons with icons
                const span = el.querySelector('span');
                if (span) span.textContent = text;
            } else if (hasOnlyText || el.children.length === 0) {
                el.textContent = text;
            } else {
                // For elements with mixed content, try to update text nodes
                const textNode = Array.from(el.childNodes).find(n => n.nodeType === 3 && n.textContent.trim());
                if (textNode) {
                    textNode.textContent = text;
                } else {
                    el.textContent = text;
                }
            }
        }
    });

    // Update toggle button text
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        const enSpan = langToggle.querySelector('.lang-en');
        const deSpan = langToggle.querySelector('.lang-de');

        if (lang === 'en') {
            if (enSpan) enSpan.style.display = 'inline';
            if (deSpan) deSpan.style.display = 'none';
        } else {
            if (enSpan) enSpan.style.display = 'none';
            if (deSpan) deSpan.style.display = 'inline';
        }
    }

    // Update html lang attribute
    document.documentElement.lang = lang;
}

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', throttle(() => {
        const currentScroll = window.scrollY;

        // Add shadow on scroll
        if (navbar) {
            navbar.classList.toggle('scrolled', currentScroll > 50);
        }

        lastScroll = currentScroll;
    }, 16));

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
    const animatableElements = document.querySelectorAll(
        '.fade-in, .fade-in-left, .fade-in-right, .scale-in'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay based on index within viewport
                const siblings = Array.from(entry.target.parentElement?.children || [])
                    .filter(el => el.classList.contains('fade-in') ||
                        el.classList.contains('fade-in-left') ||
                        el.classList.contains('fade-in-right') ||
                        el.classList.contains('scale-in'));
                const siblingIndex = siblings.indexOf(entry.target);

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, siblingIndex * 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatableElements.forEach(el => observer.observe(el));
}

/* ========================================
   COUNTER ANIMATIONS
   ======================================== */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const fps = 60;
    const frames = duration / 1000 * fps;
    const increment = target / frames;
    let current = 0;

    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);

        current = Math.round(easedProgress * target);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ========================================
   LEVEL BARS ANIMATION
   ======================================== */
function initLevelBars() {
    const levelBars = document.querySelectorAll('.level-fill[data-width]');

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');

                setTimeout(() => {
                    bar.style.width = `${width}%`;
                }, 200);

                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    levelBars.forEach(bar => barObserver.observe(bar));
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function
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

/* ========================================
   PERFORMANCE OPTIMIZATIONS
   ======================================== */

// Preload critical resources
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload fonts if not loaded
        const fonts = document.fonts;
        if (fonts && fonts.ready) {
            fonts.ready.then(() => {
                document.body.classList.add('fonts-loaded');
            });
        }
    });
}

// Reduce animations for users who prefer reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduce-motion');
}
