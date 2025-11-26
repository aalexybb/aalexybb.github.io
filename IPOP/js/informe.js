document.addEventListener('DOMContentLoaded', () => {
    // Language handling
    const languageSelect = document.getElementById('languageSelect');
    const currentLang = localStorage.getItem('preferredLanguage') || 'ca';

    if (languageSelect) {
        languageSelect.value = currentLang;
        languageSelect.addEventListener('change', (e) => {
            const newLang = e.target.value;
            localStorage.setItem('preferredLanguage', newLang);
            updateTranslations(newLang);
        });
    }

    // Dark mode toggle
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // Load translations
    updateTranslations(currentLang);

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.competency-card, .soft-skill-card, .specialization-card, .timeline-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
});

function updateTranslations(lang) {
    if (!window.translations || !window.translations[lang]) {
        console.warn('Translations not loaded');
        return;
    }

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = window.translations[lang];

        for (const k of keys) {
            value = value?.[k];
        }

        if (value) {
            element.textContent = value;
        }
    });
}
