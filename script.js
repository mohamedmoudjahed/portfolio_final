// ============================================
// SMOOTH SCROLLING & NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
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

    const sections = document.querySelectorAll('section[id]');
    
    const highlightNavigation = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
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

    // ============================================
    // SCROLL ANIMATIONS
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
        '.expertise-item, .experience-card, .skill-category, .project-card, .contact-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // TRANSITION ANIMATIONS ON SCROLL
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
                    setTimeout(() => {
                        panel.classList.add('animate');
                    }, index * 150);
                });
                
                // Trigger unfolding panels
                const foldSections = entry.target.querySelectorAll('.fold-section');
                foldSections.forEach((section, index) => {
                    setTimeout(() => {
                        section.classList.add('animate');
                    }, index * 200);
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
    // ============================================

    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // ============================================
    // NAVBAR BACKGROUND ON SCROLL
    // ============================================

    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
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
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ============================================
    // COUNTER ANIMATION FOR STATS (if needed)
    // ============================================

    const animateCounter = (element, target, duration = 2000) => {
        let current = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };

    // ============================================
    // PARALLAX EFFECT FOR HERO DECORATION
    // ============================================

    const heroDecoration = document.querySelector('.hero-decoration');
    
    if (heroDecoration) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroDecoration.style.transform = `translateY(${rate}px)`;
        });
    }

    // ============================================
    // LOADING ANIMATION
    // ============================================

    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // ============================================
    // FORM VALIDATION (if you add a contact form)
    // ============================================

    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add your form validation and submission logic here
            const formData = new FormData(contactForm);
            
            console.log('Form submitted:', Object.fromEntries(formData));
            
            // Show success message
            alert('Message envoyé avec succès !');
            contactForm.reset();
        });
    }

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================

    const createMobileMenu = () => {
        const navMenu = document.querySelector('.nav-menu');
        const navContainer = document.querySelector('.nav-container');
        
        // Vérifier si le hamburger existe déjà
        let hamburger = document.querySelector('.hamburger');
        
        if (window.innerWidth <= 768) {
            // Créer le hamburger s'il n'existe pas
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
                
                // Fonction pour toggle le menu
                const toggleMenu = () => {
                    const isActive = navMenu.classList.toggle('active');
                    hamburger.classList.toggle('active');
                    hamburger.setAttribute('aria-expanded', isActive);
                    document.body.style.overflow = isActive ? 'hidden' : '';
                    
                    if (isActive) {
                        createOverlay();
                    } else {
                        removeOverlay();
                    }
                };
                
                // Fonction pour créer l'overlay
                const createOverlay = () => {
                    let overlay = document.querySelector('.menu-overlay');
                    if (!overlay) {
                        overlay = document.createElement('div');
                        overlay.classList.add('menu-overlay');
                        overlay.addEventListener('click', closeMenu);
                        document.body.appendChild(overlay);
                    }
                };
                
                // Fonction pour supprimer l'overlay
                const removeOverlay = () => {
                    const overlay = document.querySelector('.menu-overlay');
                    if (overlay) {
                        overlay.style.animation = 'fadeOut 0.3s ease';
                        setTimeout(() => overlay.remove(), 300);
                    }
                };
                
                // Fonction pour fermer le menu
                const closeMenu = () => {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                    removeOverlay();
                };
                
                // Ajouter l'événement click au hamburger
                hamburger.addEventListener('click', toggleMenu);
                
                // Fermer le menu lors du clic sur un lien
                navLinks.forEach(link => {
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

    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================

    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.classList.add('scroll-to-top');
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
    // TYPEWRITER EFFECT FOR HERO TITLE (Optional)
    // ============================================

    const typewriterEffect = (element, text, speed = 100) => {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    };

    // ============================================
    // EXPERIENCE CARDS INTERSECTION OBSERVER
    // ============================================

    const experienceCards = document.querySelectorAll('.experience-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    experienceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        cardObserver.observe(card);
    });

    // ============================================
    // CONSOLE LOG (For debugging)
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
