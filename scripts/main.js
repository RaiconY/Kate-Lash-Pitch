// Main JavaScript functionality for Lash Studio Pattaya pitch deck

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollAnimations();
    initContactButtons();
    initSmoothScrolling();
    initCounterAnimations();
    initInteractiveElements();
    initParallaxEffects();
    
    console.log('🎯 Lash Studio Pattaya pitch deck initialized');
});

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
    
    // Observe cards
    document.querySelectorAll('.why-card, .proof-metric, .term-card, .timeline-content').forEach(card => {
        card.classList.add('animate-on-scroll');
        observer.observe(card);
    });
}

// Contact button functionality
function initContactButtons() {
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const buttonText = this.textContent.toLowerCase();
            let message = encodeURIComponent('Привет! Меня заинтересовал ваш проект Lash Studio Pattaya. Можем обсудить детали инвестиций?');
            
            switch(buttonText) {
                case 'whatsapp':
                    // Replace with actual WhatsApp number
                    window.open(`https://wa.me/66123456789?text=${message}`, '_blank');
                    break;
                case 'telegram':
                    // Replace with actual Telegram username
                    window.open(`https://t.me/your_telegram_username`, '_blank');
                    break;
                case 'позвонить':
                    window.open('tel:+66123456789');
                    break;
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Counter animations for metrics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.why-value, .proof-value, .term-value, .about-stat-value');
    
    const animateCounter = (element) => {
        const text = element.textContent;
        const number = parseInt(text.replace(/[^\d]/g, ''));
        
        if (isNaN(number)) return;
        
        const duration = 2000;
        const steps = 60;
        const stepValue = number / steps;
        const stepDuration = duration / steps;
        
        let currentValue = 0;
        
        const counter = setInterval(() => {
            currentValue += stepValue;
            if (currentValue >= number) {
                element.textContent = text;
                clearInterval(counter);
            } else {
                const displayValue = Math.floor(currentValue);
                element.textContent = text.replace(number.toString(), displayValue.toString());
            }
        }, stepDuration);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Interactive elements
function initInteractiveElements() {
    // Add ripple effect to clickable elements
    document.querySelectorAll('.why-card, .proof-metric, .term-card, .contact-btn').forEach(element => {
        element.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add hover effects to cards
    document.querySelectorAll('.why-card, .proof-metric, .term-card, .strategy-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero::before, .hero::after, .secret-box::before');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Utility functions
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Performance optimizations
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Optimize scroll events
    window.addEventListener('scroll', throttle(() => {
        // Scroll-based animations
        const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
    }, 16));
}

// Analytics tracking
function trackInteraction(action, element) {
    // Add your analytics tracking code here
    console.log(`User interaction: ${action} on ${element}`);
    
    // Example: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'engagement',
            event_label: element
        });
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// Accessibility improvements
function enhanceAccessibility() {
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus management
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function() {
    enhanceAccessibility();
    optimizePerformance();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initScrollAnimations,
        initContactButtons,
        initSmoothScrolling,
        initCounterAnimations,
        initInteractiveElements,
        initParallaxEffects,
        throttle,
        debounce
    };
}