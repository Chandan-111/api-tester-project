document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
        });

        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
    }

    // Set active nav link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Check auth status globally if not on login page
    if (currentPath !== '/login' && currentPath !== '/' && currentPath !== '/docs') {
        checkAuth();
    }
});

async function checkAuth() {
    try {
        const res = await fetch('/profile');
        if (res.status === 401) {
            window.location.href = '/login';
        }
    } catch (e) {
        console.error('Auth check failed', e);
    }
}

async function logout() {
    try {
        await fetch('/logout', { method: 'POST' });
        window.location.href = '/login';
    } catch (e) {
        console.error('Logout failed', e);
    }
}
