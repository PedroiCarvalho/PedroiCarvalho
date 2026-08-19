/**
 * ============================================================================
 * PEDRO CARVALHO — DESIGNER & DESENVOLVEDOR FRONT-END
 * JavaScript Interativo & Funcionalidades
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ------------------------------------------------------------------------
    // 1. NAVBAR SCROLL EFFECT
    // ------------------------------------------------------------------------
    const siteHeader = document.getElementById('siteHeader');

    const handleHeaderScroll = () => {
        if (!siteHeader) return;
        if (window.scrollY > 30) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // ------------------------------------------------------------------------
    // 2. THEME SWITCHER (DARK / LIGHT THEME)
    // ------------------------------------------------------------------------
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    // Detectar preferência inicial salva ou do sistema
    const applyTheme = (themeName) => {
        if (themeName === 'light') {
            htmlElement.classList.remove('dark-theme');
            htmlElement.classList.add('light-theme');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun theme-icon';
            }
        } else {
            htmlElement.classList.remove('light-theme');
            htmlElement.classList.add('dark-theme');
            if (themeIcon) {
                themeIcon.className = 'fas fa-moon theme-icon';
            }
        }
        localStorage.setItem('pedro_portfolio_theme', themeName);
    };

    const savedTheme = localStorage.getItem('pedro_portfolio_theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Verificar preferência do sistema operacional
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        applyTheme(prefersLight ? 'light' : 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isCurrentlyLight = htmlElement.classList.contains('light-theme');
            applyTheme(isCurrentlyLight ? 'dark' : 'light');
        });
    }

    // ------------------------------------------------------------------------
    // 3. MENU MOBILE & ACESSIBILIDADE
    // ------------------------------------------------------------------------
    const mobileMenuTrigger = document.getElementById('mobileMenuTrigger');
    const navMenu = document.getElementById('navMenu');

    const closeMobileMenu = () => {
        if (!mobileMenuTrigger || !navMenu) return;
        mobileMenuTrigger.classList.remove('active');
        mobileMenuTrigger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
    };

    const openMobileMenu = () => {
        if (!mobileMenuTrigger || !navMenu) return;
        mobileMenuTrigger.classList.add('active');
        mobileMenuTrigger.setAttribute('aria-expanded', 'true');
        navMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    if (mobileMenuTrigger && navMenu) {
        mobileMenuTrigger.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Fechar ao clicar em qualquer link
        const menuLinks = navMenu.querySelectorAll('.nav-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    closeMobileMenu();
                }
            });
        });

        // Fechar ao pressionar a tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        });

        // Fechar se redimensionar para tela grande
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && navMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        });
    }

    // ------------------------------------------------------------------------
    // 4. SMOOTH SCROLLING COM OFFSET FIXO DO HEADER
    // ------------------------------------------------------------------------
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 76;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ------------------------------------------------------------------------
    // 5. SCROLL SPY (INDICADOR DE SEÇÃO ATIVA NA NAVBAR)
    // ------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-menu .nav-link');

    const highlightActiveNav = () => {
        const scrollPosition = window.pageYOffset + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNav, { passive: true });

    // ------------------------------------------------------------------------
    // 6. BAIXAR CV / IMPRESSÃO EM PDF
    // ------------------------------------------------------------------------
    const triggerPDFDownload = () => {
        window.print();
    };

    const heroDownloadCV = document.getElementById('heroDownloadCV');
    const navDownloadCV = document.getElementById('navDownloadCV');

    if (heroDownloadCV) {
        heroDownloadCV.addEventListener('click', (e) => {
            e.preventDefault();
            triggerPDFDownload();
        });
    }

    if (navDownloadCV) {
        navDownloadCV.addEventListener('click', (e) => {
            e.preventDefault();
            triggerPDFDownload();
        });
    }

    // ------------------------------------------------------------------------
    // 7. BOTÃO VOLTAR AO TOPO
    // ------------------------------------------------------------------------
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ------------------------------------------------------------------------
    // 8. FORMULÁRIO DE CONTATO COM VALIDAÇÃO & FEEDBACK
    // ------------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const senderName = document.getElementById('senderName');
    const senderEmail = document.getElementById('senderEmail');
    const senderSubject = document.getElementById('senderSubject');
    const senderMessage = document.getElementById('senderMessage');
    const formFeedback = document.getElementById('formFeedback');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const clearValidationErrors = () => {
        [senderName, senderEmail, senderSubject, senderMessage].forEach(input => {
            if (input) input.classList.remove('input-error');
        });
        [nameError, emailError, subjectError, messageError].forEach(error => {
            if (error) error.classList.remove('visible');
        });
        if (formFeedback) {
            formFeedback.className = 'form-feedback-alert';
            formFeedback.style.display = 'none';
            formFeedback.textContent = '';
        }
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearValidationErrors();

            let isValid = true;

            // Validação Nome
            if (!senderName.value.trim()) {
                senderName.classList.add('input-error');
                nameError.classList.add('visible');
                isValid = false;
            }

            // Validação E-mail
            if (!senderEmail.value.trim() || !validateEmail(senderEmail.value.trim())) {
                senderEmail.classList.add('input-error');
                emailError.classList.add('visible');
                isValid = false;
            }

            // Validação Assunto
            if (!senderSubject.value.trim()) {
                senderSubject.classList.add('input-error');
                subjectError.classList.add('visible');
                isValid = false;
            }

            // Validação Mensagem
            if (!senderMessage.value.trim() || senderMessage.value.trim().length < 5) {
                senderMessage.classList.add('input-error');
                messageError.classList.add('visible');
                isValid = false;
            }

            if (isValid) {
                const name = encodeURIComponent(senderName.value.trim());
                const subject = encodeURIComponent(`[Contato Portfólio] ${senderSubject.value.trim()}`);
                const body = encodeURIComponent(
                    `Olá Pedro,\n\nMeu nome é: ${senderName.value.trim()}\nMeu e-mail de contato: ${senderEmail.value.trim()}\n\nMensagem:\n${senderMessage.value.trim()}\n\n---\nEnviado através do seu currículo online.`
                );

                // Feedback visual de sucesso
                formFeedback.textContent = 'Mensagem preparada com sucesso! Abrindo seu cliente de e-mail...';
                formFeedback.className = 'form-feedback-alert success';

                // Disparo amigável para cliente de e-mail padrão
                setTimeout(() => {
                    window.location.href = `mailto:pedroipcarvalho@gmail.com?subject=${subject}&body=${body}`;
                }, 400);

                // Reset suave dos campos
                setTimeout(() => {
                    contactForm.reset();
                }, 1000);
            }
        });

        // Limpar erro ao digitar
        [senderName, senderEmail, senderSubject, senderMessage].forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    input.classList.remove('input-error');
                    const errorId = input.id.replace('sender', '').toLowerCase() + 'Error';
                    const errorEl = document.getElementById(errorId);
                    if (errorEl) errorEl.classList.remove('visible');
                });
            }
        });
    }
});
