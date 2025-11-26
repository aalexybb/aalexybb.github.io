document.addEventListener('DOMContentLoaded', () => {
    const blogContainer = document.getElementById('blog-posts-container');
    const searchInput = document.getElementById('blogSearch');
    const languageSelect = document.getElementById('languageSelect');

    let allPosts = [];

    // Fetch posts from JSON file
    fetch('data/blog_posts.json')
        .then(response => response.json())
        .then(data => {
            allPosts = data;
            renderPosts(allPosts, getCurrentLang());
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            blogContainer.innerHTML = '<p class="text-center text-danger">Error loading posts. Please try again later.</p>';
        });

    function getCurrentLang() {
        return localStorage.getItem('preferredLanguage') || 'ca';
    }

    // Render posts function
    function renderPosts(posts, lang) {
        blogContainer.innerHTML = '';

        if (posts.length === 0) {
            blogContainer.innerHTML = '<p class="text-center text-muted">No posts found.</p>';
            return;
        }

        // Get translations or defaults
        const translations = window.translations || {};
        const readMoreText = translations[lang]?.blog?.read_more || 'Llegir més';
        const postedOnText = translations[lang]?.blog?.posted_on || 'Publicat el';

        posts.forEach(post => {
            // Fallback to English if translation missing
            const title = post.title[lang] || post.title['en'];
            const summary = post.summary[lang] || post.summary['en'];

            const col = document.createElement('div');
            col.className = 'col-lg-6 mb-4';

            col.innerHTML = `
                <div class="card h-100 shadow-sm blog-card">
                    ${post.image ? `<div class="card-img-wrapper"><img src="${post.image}" class="card-img-top" alt="${title}"></div>` : ''}
                    <div class="card-body d-flex flex-column">
                        <h3 class="card-title h4">${title}</h3>
                        <div class="text-muted mb-2 small">
                            <i class="far fa-calendar-alt me-1"></i> ${postedOnText} ${post.date}
                        </div>
                        <p class="card-text flex-grow-1">${summary}</p>
                        <div class="mt-3 mb-3">
                            ${post.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
                        </div>
                        <button class="btn btn-primary mt-auto w-100 read-more-btn" onclick="openBlogModal(${post.id})">
                            ${readMoreText}
                        </button>
                    </div>
                </div>
            `;
            blogContainer.appendChild(col);
        });
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const currentLang = getCurrentLang();

            const filteredPosts = allPosts.filter(post => {
                const title = (post.title[currentLang] || post.title['en']).toLowerCase();
                return title.includes(searchTerm);
            });

            renderPosts(filteredPosts, currentLang);
        });
    }

    // Language change listener
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            const newLang = e.target.value;
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

            const filteredPosts = allPosts.filter(post => {
                const title = (post.title[newLang] || post.title['en']).toLowerCase();
                return title.includes(searchTerm);
            });

            renderPosts(filteredPosts, newLang);
        });
    }

    // Global function to open modal
    window.openBlogModal = function (postId) {
        const post = allPosts.find(p => p.id === postId);
        if (!post) return;

        const lang = getCurrentLang();
        const title = post.title[lang] || post.title['en'];
        const content = post.content[lang] || post.content['en'];
        const date = post.date;

        // Create modal HTML dynamically
        const modalHtml = `
            <div class="modal fade" id="blogModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${post.image ? `<img src="${post.image}" class="img-fluid mb-4 rounded blog-modal-hero" alt="${title}">` : ''}
                            <div class="blog-post-meta mb-3 text-muted">
                                <i class="far fa-calendar-alt me-1"></i> ${post.date}
                            </div>
                            <div class="blog-post-content">
                                ${content}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tancar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById('blogModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Append new modal to body
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Initialize and show Bootstrap modal
        const modalElement = document.getElementById('blogModal');
        const bsModal = new bootstrap.Modal(modalElement);
        bsModal.show();

        // Cleanup on hidden
        modalElement.addEventListener('hidden.bs.modal', () => {
            bsModal.dispose();
            modalElement.remove();
        });
    };
});
