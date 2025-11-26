/**
 * SCROLL ANIMATIONS - Lightweight AOS Implementation
 * Animate elements on scroll with various effects
 */

(function () {
    'use strict';

    // Configuration
    const config = {
        offset: 120,          // Offset from the original trigger point
        delay: 0,             // Delay in milliseconds
        duration: 800,        // Animation duration in milliseconds
        easing: 'ease',       // CSS easing function
        once: false,          // Whether animation should happen only once
        mirror: false,        // Whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // Defines which position of the element should trigger animation
    };

    // Store all animated elements
    let animatedElements = [];

    /**
     * Initialize AOS
     */
    function init() {
        // Get all elements with data-aos attribute
        const elements = document.querySelectorAll('[data-aos]');

        elements.forEach((element, index) => {
            const animation = element.getAttribute('data-aos');
            const duration = element.getAttribute('data-aos-duration') || config.duration;
            const delay = element.getAttribute('data-aos-delay') || config.delay;
            const easing = element.getAttribute('data-aos-easing') || config.easing;
            const once = element.getAttribute('data-aos-once') === 'true' || config.once;
            const offset = element.getAttribute('data-aos-offset') || config.offset;

            // Set transition properties
            element.style.transitionDuration = `${duration}ms`;
            element.style.transitionDelay = `${delay}ms`;
            element.style.transitionTimingFunction = easing;

            // Store element data
            animatedElements.push({
                element,
                animation,
                once,
                offset: parseInt(offset),
                animated: false
            });
        });

        // Initial check
        checkElements();

        // Add scroll listener
        window.addEventListener('scroll', throttle(checkElements, 100));
        window.addEventListener('resize', throttle(checkElements, 100));
    }

    /**
     * Check which elements should be animated
     */
    function checkElements() {
        animatedElements.forEach(item => {
            if (item.once && item.animated) return;

            if (isElementInViewport(item.element, item.offset)) {
                animateElement(item);
            } else if (config.mirror && !item.once) {
                removeAnimation(item);
            }
        });
    }

    /**
     * Check if element is in viewport
     */
    function isElementInViewport(element, offset) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        return (
            rect.top <= windowHeight - offset &&
            rect.bottom >= 0
        );
    }

    /**
     * Animate element
     */
    function animateElement(item) {
        if (!item.animated) {
            item.element.classList.add('aos-animate');
            item.animated = true;

            // Trigger custom event
            const event = new CustomEvent('aos:in', { detail: item.element });
            document.dispatchEvent(event);
        }
    }

    /**
     * Remove animation
     */
    function removeAnimation(item) {
        if (item.animated) {
            item.element.classList.remove('aos-animate');
            item.animated = false;

            // Trigger custom event
            const event = new CustomEvent('aos:out', { detail: item.element });
            document.dispatchEvent(event);
        }
    }

    /**
     * Throttle function
     */
    function throttle(func, wait) {
        let timeout;
        let previous = 0;

        return function () {
            const now = Date.now();
            const remaining = wait - (now - previous);
            const context = this;
            const args = arguments;

            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(context, args);
            } else if (!timeout) {
                timeout = setTimeout(() => {
                    previous = Date.now();
                    timeout = null;
                    func.apply(context, args);
                }, remaining);
            }
        };
    }

    /**
     * Refresh AOS (useful when adding new elements dynamically)
     */
    function refresh() {
        animatedElements = [];
        init();
    }

    /**
     * Add animations to sections automatically
     */
    function autoAddAnimations() {
        // Animate section headers
        document.querySelectorAll('.resume-section h2').forEach((header, index) => {
            if (!header.hasAttribute('data-aos')) {
                header.setAttribute('data-aos', 'fade-up');
                header.setAttribute('data-aos-duration', '1000');
            }
        });

        // Animate sections with alternating effects
        document.querySelectorAll('.resume-section').forEach((section, index) => {
            if (!section.hasAttribute('data-aos')) {
                const animations = ['fade-up', 'fade-left', 'fade-right'];
                const animation = animations[index % animations.length];
                section.setAttribute('data-aos', animation);
                section.setAttribute('data-aos-duration', '800');
            }
        });

        // Animate profile image
        const profileImg = document.querySelector('.img-profile');
        if (profileImg && !profileImg.hasAttribute('data-aos')) {
            profileImg.setAttribute('data-aos', 'zoom-in');
            profileImg.setAttribute('data-aos-duration', '1000');
        }

        // Animate social icons
        document.querySelectorAll('.social-icon').forEach((icon, index) => {
            if (!icon.hasAttribute('data-aos')) {
                icon.setAttribute('data-aos', 'fade-up');
                icon.setAttribute('data-aos-delay', `${index * 100}`);
                icon.setAttribute('data-aos-duration', '600');
            }
        });

        // Animate experience/education items
        document.querySelectorAll('.d-flex.flex-column.flex-md-row.justify-content-between').forEach((item, index) => {
            if (!item.hasAttribute('data-aos')) {
                const animation = index % 2 === 0 ? 'fade-right' : 'fade-left';
                item.setAttribute('data-aos', animation);
                item.setAttribute('data-aos-duration', '800');
            }
        });

        // Animate skills
        document.querySelectorAll('.list-inline-item').forEach((skill, index) => {
            if (!skill.hasAttribute('data-aos')) {
                skill.setAttribute('data-aos', 'zoom-in');
                skill.setAttribute('data-aos-delay', `${(index % 8) * 50}`);
                skill.setAttribute('data-aos-duration', '500');
            }
        });

        // Animate QR code
        const qrCode = document.querySelector('.qr-code-container');
        if (qrCode && !qrCode.hasAttribute('data-aos')) {
            qrCode.setAttribute('data-aos', 'flip-left');
            qrCode.setAttribute('data-aos-duration', '1000');
        }

        // Animate awards/certifications
        document.querySelectorAll('.fa-ul li').forEach((item, index) => {
            if (!item.hasAttribute('data-aos')) {
                item.setAttribute('data-aos', 'fade-left');
                item.setAttribute('data-aos-delay', `${index * 150}`);
                item.setAttribute('data-aos-duration', '600');
            }
        });
    }

    /**
     * Smooth scroll to anchor
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Add parallax effect to sections
     */
    function initParallax() {
        const sections = document.querySelectorAll('.resume-section');

        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;

            sections.forEach((section, index) => {
                const speed = (index % 2 === 0) ? 0.5 : -0.5;
                const yPos = -(scrolled * speed / 10);
                section.style.transform = `translateY(${yPos}px)`;
            });
        }, 10));
    }

    /**
     * Initialize everything when DOM is ready
     */
    function ready() {
        console.log('🎬 Initializing scroll animations...');

        // Auto-add animations to elements
        autoAddAnimations();

        // Initialize AOS
        init();

        // Initialize smooth scroll
        initSmoothScroll();

        // Initialize parallax (optional, can be disabled)
        // initParallax();

        console.log('✨ Scroll animations ready!');
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ready);
    } else {
        ready();
    }

    // Expose refresh function globally
    window.AOS = {
        refresh: refresh,
        init: init
    };

    // Listen for custom events
    document.addEventListener('aos:in', (e) => {
        console.log('Element animated in:', e.detail);
    });

})();
