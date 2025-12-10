// ============================================
// SMOOTH SCROLLING & NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const nav = document.querySelector('.nav');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Ajuster le décalage pour la navbar fixe
                const offsetTop = targetSection.offsetTop - nav.offsetHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ============================================
    
    const highlightNavigation = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - (nav.offsetHeight + 20); // Ajustement avec la hauteur de la navbar
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Appel initial

    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.expertise-item, .skill-category, .project-card, .contact-card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // TRANSITION ANIMATIONS ON SCROLL (Panels)
    // ============================================

    const transitionObserverOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const transitionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger sliding panels
                const slidingPanels = entry.target.querySelectorAll('.sliding-panel');
                slidingPanels.forEach((panel, index) => {
                    // Délai de 0 à 300ms pour l'effet de cascade
                    panel.style.animationDelay = `${index * 150}ms`; 
                    panel.classList.add('animate');
                });
                
                // Trigger unfolding panels
                const foldSections = entry.target.querySelectorAll('.fold-section');
                foldSections.forEach((section, index) => {
                    // Délai de 0 à 200ms pour l'effet de cascade
                    section.style.animationDelay = `${index * 200}ms`;
                    section.classList.add('animate');
                });
                
                transitionObserver.unobserve(entry.target);
            }
        });
    }, transitionObserverOptions);

    // Observe transition elements
    const transitionElements = document.querySelectorAll('.section-divider, .unfolding-panel');
    transitionElements.forEach(el => {
        transitionObserver.observe(el);
    });

    // ============================================
    // TIMELINE ITEM STAGGERED ANIMATION
    // Utilisation d'un IntersectionObserver pour les déclencher
    // ============================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const visibleItems = Array.from(timelineItems).filter(item => item.getBoundingClientRect().top < window.innerHeight);
                const currentItemIndex = visibleItems.indexOf(entry.target);

                if (currentItemIndex !== -1) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, currentItemIndex * 150); // Effet de cascade
                }
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
        timelineObserver.observe(item);
    });


    // ============================================
    // NAVBAR BACKGROUND ON SCROLL
    // Ajout d'une ombre après un certain scroll
    // ============================================

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });

    // ============================================
    // SKILL TAGS HOVER EFFECT
    // ============================================

    const skillTags = document.querySelectorAll('.tag, .spec-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // ============================================
    // PROJECT CARDS TILT EFFECT (Desktop only)
    // ============================================

    const projectCards = document.querySelectorAll('.project-card');
    
    // Désactiver l'effet tilt sur mobile pour de meilleures performances
    if (window.innerWidth > 768) {
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Rotation légère: max 5deg
                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-8px)';
            });
        });
    }

    // ============================================
    // PARALLAX EFFECT FOR HERO DECORATION (Desktop only)
    // ============================================

    const heroDecoration = document.querySelector('.hero-decoration');
    
    if (heroDecoration && window.innerWidth > 768) {
        // Utilisation de la fonction debounce pour optimiser l'écouteur d'événement
        const parallaxScroll = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3; // Taux de défilement plus lent
            heroDecoration.style.transform = `translateY(${rate}px)`;
        };

        window.addEventListener('scroll', throttle(parallaxScroll, 10));
    }


    // ============================================
    // FORM VALIDATION (Ajout du support du message)
    // ============================================

    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const form = e.target;
            const formData = new FormData(form);
            const formMessage = document.createElement('div');
            formMessage.classList.add('form-message');
            
            // Simuler l'envoi du formulaire
            setTimeout(() => {
                // Remplacer par votre vraie logique d'envoi (ex: fetch)
                const isSuccess = Math.random() > 0.1; // 90% de succès pour la démo
                
                if (isSuccess) {
                    formMessage.classList.add('success');
                    formMessage.textContent = 'Message envoyé avec succès ! Je reviendrai vers vous rapidement.';
                    form.reset();
                } else {
                    formMessage.classList.add('error');
                    formMessage.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer ou m\'envoyer un e-mail directement.';
                }

                // Supprimer l'ancien message
                const existingMessage = form.querySelector('.form-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                form.appendChild(formMessage);
                
            }, 1000);
        });
    }

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================

    const createMobileMenu = () => {
        const navMenu = document.querySelector('.nav-menu');
        const navContainer = document.querySelector('.nav-container');
        
        let hamburger = document.querySelector('.hamburger');
        
        if (window.innerWidth <= 768) {
            if (!hamburger) {
                hamburger = document.createElement('button');
                hamburger.classList.add('hamburger');
                hamburger.setAttribute('aria-label', 'Menu');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.innerHTML = `
                    <span></span>
                    <span></span>
                    <span></span>
                `;
                navContainer.appendChild(hamburger);
                
                const createOverlay = () => {
                    let overlay = document.querySelector('.menu-overlay');
                    if (!overlay) {
                        overlay = document.createElement('div');
                        overlay.classList.add('menu-overlay');
                        overlay.addEventListener('click', closeMenu);
                        document.body.appendChild(overlay);
                    }
                };
                
                const removeOverlay = () => {
                    const overlay = document.querySelector('.menu-overlay');
                    if (overlay) {
                        overlay.style.animation = 'fadeOut 0.3s ease';
                        setTimeout(() => overlay.remove(), 300);
                    }
                };
                
                const closeMenu = () => {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                    removeOverlay();
                };

                const toggleMenu = () => {
                    const isActive = navMenu.classList.toggle('active');
                    hamburger.classList.toggle('active');
                    hamburger.setAttribute('aria-expanded', isActive);
                    // Empêcher le scroll sur le body quand le menu est ouvert
                    document.body.style.overflow = isActive ? 'hidden' : ''; 
                    
                    if (isActive) {
                        createOverlay();
                    } else {
                        removeOverlay();
                    }
                };
                
                hamburger.addEventListener('click', toggleMenu);
                
                // Fermer le menu lors du clic sur un lien
                navLinks.forEach(link => {
                    // Supprimer les écouteurs précédents si l'on redimensionne
                    link.removeEventListener('click', closeMenu); 
                    link.addEventListener('click', closeMenu);
                });
            }
            
        } else {
            // Supprimer le hamburger sur grand écran
            if (hamburger) {
                hamburger.remove();
            }
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Supprimer l'overlay s'il existe
            const overlay = document.querySelector('.menu-overlay');
            if (overlay) {
                overlay.remove();
            }
        }
    };

    // Utilisation de debounce pour optimiser le redimensionnement
    window.addEventListener('resize', debounce(createMobileMenu, 250));
    createMobileMenu();


    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================

    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '&#9650;'; // Flèche vers le haut
    scrollToTopBtn.classList.add('scroll-to-top');
    // J'ai mis le style en ligne pour être sûr qu'il ne soit pas écrasé sur mobile, mais les media queries CSS sont meilleures.
    // Laissez les styles CSS et utilisez une classe pour le style si possible.
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--color-secondary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // CONSOLE LOG (Pour le plaisir)
    // ============================================

    console.log('Portfolio de Mohamed Moudjahed - Chargé avec succès! 🚀');
    console.log('AI Engineer & Data Scientist');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function
const throttle = (func, limit = 100) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};