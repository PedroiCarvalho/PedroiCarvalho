/* ========================================
   Pedro Izaac Professional Resume — Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. NAVBAR — Scroll Effect
    // ==========================================
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ==========================================
    // 2. THEME TOGGLE (Dark / Light)
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlEl = document.documentElement;

    // Load saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        htmlEl.classList.remove('dark-theme');
        htmlEl.classList.add('light-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', () => {
            const isLight = htmlEl.classList.contains('light-theme');

            if (isLight) {
                htmlEl.classList.remove('light-theme');
                htmlEl.classList.add('dark-theme');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            } else {
                htmlEl.classList.remove('dark-theme');
                htmlEl.classList.add('light-theme');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ==========================================
    // 3. HAMBURGER MENU (Mobile)
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    const closeMenu = () => {
        if (!menuToggle || !navLinks) return;
        const spans = menuToggle.querySelectorAll('span');
        if (spans.length >= 3) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const spans = menuToggle.querySelectorAll('span');
            menuToggle.classList.toggle('active');
            const isOpen = menuToggle.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            
            if (isOpen && spans.length >= 3) {
                spans[0].style.transform = 'translateY(7px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
                navLinks.classList.add('open');
                document.body.style.overflow = 'hidden';
            } else {
                closeMenu();
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                closeMenu();
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
                closeMenu();
            }
        });
    }

    // ==========================================
    // 4. SMOOTH SCROLL (With Fixed Header Offset)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            e.preventDefault();
            const target = document.querySelector(id);
            if (target) {
                const offset = window.innerWidth <= 768 ? 70 : 90;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // 5. DOWNLOAD / PRINT PDF CV
    // ==========================================
    const triggerPDF = () => {
        window.print();
    };

    const downloadCVBtn = document.getElementById('downloadCV');
    const navDownloadCVBtn = document.getElementById('navDownloadCV');

    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', (e) => {
            e.preventDefault();
            triggerPDF();
        });
    }

    if (navDownloadCVBtn) {
        navDownloadCVBtn.addEventListener('click', (e) => {
            e.preventDefault();
            triggerPDF();
        });
    }

    // ==========================================
    // 6. COUNTER ANIMATION
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    function animateCounters() {
        if (hasCounted) return;
        hasCounted = true;
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            if (!target) return;
            const duration = 1500;
            const increment = target / (duration / 16);
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCounter();
        });
    }

    // Trigger counters on load or scroll
    setTimeout(animateCounters, 300);

});
