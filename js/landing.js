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
            loadLatestPosts(newLang);
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

    // Load latest blog posts
    loadLatestPosts(currentLang);

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

function loadLatestPosts(lang) {
    fetch('data/blog_posts.json')
        .then(response => response.json())
        .then(posts => {
            const latestPosts = posts.slice(0, 3); // Get latest 3 posts
            const container = document.getElementById('latest-posts');
            container.innerHTML = '';

            latestPosts.forEach(post => {
                const title = post.title[lang] || post.title['en'];
                const summary = post.summary[lang] || post.summary['en'];

                const col = document.createElement('div');
                col.className = 'col-md-4 mb-4';

                col.innerHTML = `
                    <div class="card blog-preview-card h-100">
                        ${post.image ? `<img src="${post.image}" class="card-img-top" alt="${title}">` : ''}
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text text-muted small">
                                <i class="far fa-calendar-alt me-1"></i> ${post.date}
                            </p>
                            <p class="card-text flex-grow-1">${summary}</p>
                            <a href="blog.html" class="btn btn-outline-primary mt-auto">
                                ${window.translations?.[lang]?.landing?.blog?.btn_read || 'Llegir més'}
                            </a>
                        </div>
                    </div>
                `;

                container.appendChild(col);
            });
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            document.getElementById('latest-posts').innerHTML =
                '<p class="text-center text-muted">No s\'han pogut carregar els posts.</p>';
        });
}
