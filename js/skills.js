document.addEventListener('DOMContentLoaded', () => {
    const skillsContainer = document.getElementById('skills-container');
    const languageSelect = document.getElementById('languageSelect');

    function loadSkills() {
        const currentLang = localStorage.getItem('preferredLanguage') || 'ca';

        // Fetch skills from JSON
        fetch('data/skills.json')
            .then(response => response.json())
            .then(skills => {
                skillsContainer.innerHTML = ''; // Clear existing skills

                skills.forEach(skill => {
                    // Get name in current language or fallback to Catalan/first available
                    let skillName = skill.name;
                    if (typeof skill.name === 'object') {
                        skillName = skill.name[currentLang] || skill.name['ca'] || Object.values(skill.name)[0];
                    }

                    const skillElement = document.createElement('div');
                    skillElement.className = 'skill-item mb-4';
                    skillElement.innerHTML = `
                        <div class="d-flex justify-content-between mb-1">
                            <span class="fw-bold">${skillName}</span>
                            <span>${skill.percent}%</span>
                        </div>
                        <div class="progress" style="height: 20px;">
                            <div class="progress-bar" role="progressbar" style="width: 0%" 
                                 aria-valuenow="${skill.percent}" aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                    `;
                    skillsContainer.appendChild(skillElement);
                });

                // Initialize Intersection Observer for animation
                initSkillsAnimation();
            })
            .catch(error => console.error('Error loading skills:', error));
    }

    // Initial load
    loadSkills();

    // Listen for language changes
    if (languageSelect) {
        languageSelect.addEventListener('change', () => {
            loadSkills();
        });
    }
});

function initSkillsAnimation() {
    const progressBars = document.querySelectorAll('.progress-bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('aria-valuenow') + '%';
                progressBar.style.width = targetWidth;
                observer.unobserve(progressBar); // Animate only once
            }
        });
    }, { threshold: 0.1 });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });

    // Ensure skills are visible when printing
    window.addEventListener('beforeprint', () => {
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('aria-valuenow') + '%';
            bar.style.width = targetWidth;
        });
    });
}
