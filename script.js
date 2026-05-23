/* ========================================
   Pedro Izaac — Portfolio Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. DOT GRID BACKGROUND
    // ==========================================
    const canvas = document.getElementById('dotGrid');
    const ctx = canvas.getContext('2d');
    let dots = [];
    let mouseX = -1000;
    let mouseY = -1000;

    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createDots();
    }

    function createDots() {
        dots = [];
        const spacing = 50;
        const cols = Math.ceil(canvas.width / spacing) + 1;
        const rows = Math.ceil(canvas.height / spacing) + 1;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                dots.push({
                    x: i * spacing,
                    y: j * spacing,
                    baseRadius: 1,
                    radius: 1
                });
            }
        }
    }

    function drawDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        dots.forEach(dot => {
            const dx = mouseX - dot.x;
            const dy = mouseY - dot.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 150;

            if (dist < maxDist) {
                const scale = 1 - dist / maxDist;
                dot.radius = dot.baseRadius + scale * 3;
                ctx.fillStyle = `rgba(108, 92, 231, ${0.15 + scale * 0.5})`;
            } else {
                dot.radius = dot.baseRadius;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
            }

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(drawDots);
    }

    initCanvas();
    drawDots();

    window.addEventListener('resize', () => {
        initCanvas();
    });

    // ==========================================
    // 2. CURSOR GLOW (follows mouse)
    // ==========================================
    const cursorGlow = document.getElementById('cursorGlow');
    let glowX = 0;
    let glowY = 0;
    let currentGlowX = 0;
    let currentGlowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glowX = e.clientX;
        glowY = e.clientY;
    });

    function animateGlow() {
        // Smooth lag effect
        currentGlowX += (glowX - currentGlowX) * 0.08;
        currentGlowY += (glowY - currentGlowY) * 0.08;
        cursorGlow.style.left = currentGlowX + 'px';
        cursorGlow.style.top = currentGlowY + 'px';
        requestAnimationFrame(animateGlow);
    }

    animateGlow();

    // Hide glow on touch devices
    if ('ontouchstart' in window) {
        cursorGlow.style.display = 'none';
    }

    // ==========================================
    // 3. NAVBAR — Scroll Effect
    // ==========================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // ==========================================
    // 4. HAMBURGER MENU (mobile)
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ==========================================
    // 5. SMOOTH SCROLL
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // 5.5. COUNTER ANIMATION
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
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }

    const aboutObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            animateCounters();
        }
    }, { threshold: 0.5 });
    
    const aboutMarkers = document.querySelector('.about-markers');
    if (aboutMarkers) aboutObserver.observe(aboutMarkers);

    // ==========================================
    // 6. SCROLL REVEAL — Intersection Observer
    // ==========================================
    const revealElements = document.querySelectorAll(
        '.about-grid, .about-label, .about-body, .about-markers, ' +
        '.section-label, .skill-card, .skills-grid, ' +
        '.project-card, .projects-grid, ' +
        '.journey-step, .journey-track, ' +
        '.contact-inner'
    );

    // Add reveal class to all
    revealElements.forEach(el => el.classList.add('reveal'));

    // Add stagger class to grid containers
    document.querySelectorAll('.skills-grid, .projects-grid, .contact-links').forEach(el => {
        el.classList.add('reveal-stagger');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================
    // 7. CARD TILT (subtle 3D)
    // ==========================================
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `translateY(-4px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ==========================================
    // 8. ACTIVE NAV LINK HIGHLIGHT
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollY = window.scrollY + 120;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.style.color = '#eaeaf0';
                } else {
                    link.style.color = '';
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
});
