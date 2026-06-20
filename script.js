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
    // 2. HAMBURGER MENU (Mobile)
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        // Toggle hamburger animation and menu visibility
        const spans = menuToggle.querySelectorAll('span');
        menuToggle.classList.toggle('active');
        
        if (menuToggle.classList.contains('active')) {
            spans[0].style.transform = 'translateY(8px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            navLinks.classList.add('open');
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            navLinks.classList.remove('open');
        }
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            menuToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ==========================================
    // 3. SMOOTH SCROLL (Offset for fixed header)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                const offset = 100; // Account for navbar height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

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
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
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
                
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================
    // 6. BENTO GLOW EFFECT (Mouse Tracking)
    // ==========================================
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
    });

});
