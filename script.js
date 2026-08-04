/* ========================================
   Pedro Izaac Premium Portfolio — Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. NAVBAR — Scroll Effect
    // ==========================================
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ==========================================
    // 1.5 THEME TOGGLE (Dark/Light)
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlEl = document.documentElement;

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

            setTimeout(() => {
                htmlEl.classList.remove('theme-transitioning');
            }, 500);
        });
    }

    // ==========================================
    // 2. HAMBURGER MENU (Mobile)
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
                const offset = window.innerWidth <= 768 ? 75 : 100;
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
            if (!target) return;
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
    // 5. SCROLL REVEAL (Intersection Observer + Fallback)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-scale, .reveal-slide-up');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -20px 0px',
            threshold: 0.05
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    
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
    } else {
        revealElements.forEach(el => el.classList.add('is-revealed'));
    }

    setTimeout(() => {
        revealElements.forEach(el => {
            if (!el.classList.contains('is-revealed')) {
                el.classList.add('is-revealed');
            }
        });
    }, 800);

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
        });
    }

    // ==========================================
    // 7. TYPEWRITER EFFECT (Dynamic Subtitle)
    // ==========================================
    const typewriterEl = document.getElementById('typewriterText');
    if (typewriterEl) {
        const phrases = [
            "Analista de Quality Assurance (QA)",
            "Especialista em Testes de API",
            "Automação Selenium & Postman",
            "Especialista em TI (12+ Anos)"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 35 : 65;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 400;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 800);
    }

    // ==========================================
    // 8. QA LIVE TEST CONSOLE PLAYGROUND
    // ==========================================
    const terminalOutput = document.getElementById('terminalOutput');
    const btnSmoke = document.getElementById('runSmokeTest');
    const btnApi = document.getElementById('runApiTest');
    const btnBug = document.getElementById('runBugHunt');
    const btnClear = document.getElementById('clearConsole');

    if (terminalOutput) {
        function appendLog(text, type = 'info') {
            const line = document.createElement('div');
            line.className = `log-line ${type}`;
            line.textContent = text;
            terminalOutput.appendChild(line);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }

        let isRunningTest = false;

        function runAsyncSuite(logs) {
            if (isRunningTest) return;
            isRunningTest = true;
            logs.forEach((log, index) => {
                setTimeout(() => {
                    appendLog(log.text, log.type);
                    if (index === logs.length - 1) {
                        isRunningTest = false;
                    }
                }, index * 420);
            });
        }

        if (btnSmoke) {
            btnSmoke.addEventListener('click', () => {
                runAsyncSuite([
                    { text: "[RUNNER] Inicializando Smoke Test Suite v2.5...", type: "system" },
                    { text: "[TEST 01] Validando renderização inicial do DOM... PASSED", type: "pass" },
                    { text: "[TEST 02] Verificando rotas e navegação principal... PASSED", type: "pass" },
                    { text: "[TEST 03] Verificando responsividade e viewports móveis... PASSED", type: "pass" },
                    { text: "[RESULT] Smoke Test finalizado: 3/3 Passaram (100% Sucesso)", type: "success" }
                ]);
            });
        }

        if (btnApi) {
            btnApi.addEventListener('click', () => {
                runAsyncSuite([
                    { text: "[POSTMAN] Executando chamada REST: GET https://api.pedroizaac.com.br/v1/health", type: "system" },
                    { text: "[HTTP/1.1] 200 OK — Time: 18ms — Size: 1.2 KB", type: "pass" },
                    { text: "[SCHEMA] Payload JSON de resposta atende à especificação OpenAPI 3.0", type: "pass" },
                    { text: "[ASSERTION] Status Code == 200 | Latência < 50ms: TRUE", type: "pass" },
                    { text: "[RESULT] Teste de API REST concluído com êxito!", type: "success" }
                ]);
            });
        }

        if (btnBug) {
            btnBug.addEventListener('click', () => {
                runAsyncSuite([
                    { text: "[EXPLORATORY] Executando busca por edge cases e bugs de regressão...", type: "system" },
                    { text: "[WARN] Tentativa de injeção de payload nulo em formulário...", type: "warn" },
                    { text: "[CATCH] Exceção capturada com sucesso pelo Tratador Global (Sem Crashes)", type: "pass" },
                    { text: "[BUG REPORT] 0 Bugs Críticos encontrados. Sistema 100% Estável!", type: "success" }
                ]);
            });
        }

        if (btnClear) {
            btnClear.addEventListener('click', () => {
                terminalOutput.innerHTML = '<div class="log-line info">[SYS] Console limpo. Pronto para novos testes.</div>';
            });
        }
    }

});
