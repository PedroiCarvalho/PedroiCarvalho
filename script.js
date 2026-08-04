/* ========================================
   Pedro Izaac Premium Portfolio — Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. NAVBAR — Scroll Effect
    // ==========================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // ==========================================
    // 1.5 THEME TOGGLE (Dark/Light)
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlEl = document.documentElement;

    // Load saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        htmlEl.classList.remove('dark-theme');
        htmlEl.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        // Add transition class
        htmlEl.classList.add('theme-transitioning');

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

        // Remove transition class after animation
        setTimeout(() => {
            htmlEl.classList.remove('theme-transitioning');
        }, 500);
    });

    // ==========================================
    // 2. HAMBURGER MENU (Mobile)
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    const closeMenu = () => {
        if (!menuToggle) return;
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
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
            
            if (isOpen) {
                spans[0].style.transform = 'translateY(8px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
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

        // Close menu on window resize if expanded to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
                closeMenu();
            }
        });
    }

    // ==========================================
    // 3. SMOOTH SCROLL & CV DOWNLOAD HANDLER
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            e.preventDefault();
            const target = document.querySelector(id);
            if (target) {
                const offset = window.innerWidth <= 768 ? 75 : 100; // Account for navbar height on mobile/desktop
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    const downloadCV = document.getElementById('downloadCV');
    if (downloadCV) {
        downloadCV.addEventListener('click', (e) => {
            e.preventDefault();
            window.print();
        });
    }

    // ==========================================
    // 4. COUNTER ANIMATION (Years in IT)
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
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

    // ==========================================
    // 5. SCROLL REVEAL (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-scale, .reveal-slide-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -20px 0px',
        threshold: 0.05
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                
                // Trigger counter animation if it's visible
                if (entry.target.querySelector('.counter') || entry.target.classList.contains('counter')) {
                    if (!hasCounted) {
                        hasCounted = true;
                        animateCounters();
                    }
                }
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================
    // 6. BENTO GLOW EFFECT (Fine Pointer Mouse Tracking)
    // ==========================================
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (isFinePointer) {
        const bentoItems = document.querySelectorAll('.bento-item, .glass-card');

        bentoItems.forEach(item => {
            item.addEventListener('mousemove', e => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const glow = item.querySelector('.bento-glow');
                if (glow) {
                    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--accent-glow) 0%, transparent 60%)`;
                }
        });
    }

});
