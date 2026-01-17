document.addEventListener('DOMContentLoaded', () => {

    // Initialize VanillaTilt for 3D Cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".glass-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.1,
            gyroscope: true
        });
    }

    // Custom Cursor with trailing effect
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;

        cursorX += dx * 0.1;
        cursorY += dy * 0.1;

        cursorGlow.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Mobile Navigation (Slide-in)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Staggered animation for nav items
        if (navLinks.classList.contains('active')) {
            navItems.forEach((link, index) => {
                link.style.animation = `navFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            });
        }
    });

    // Close mobile menu on clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Intersection Observer for Staggered Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.section-title, .glass-card, .hero-content, .stats-grid, .timeline-item');

    fadeElements.forEach((el, index) => {
        // Add a base class for CSS transitions if not present (handled by .visible in CSS?)
        // Let's add inline styles for initial state to be safe, or assume CSS class.
        // We often need CSS for .visible. Let's add inline transition here.
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.5, 0, 0, 1), transform 0.6s cubic-bezier(0.5, 0, 0, 1)';

        observer.observe(el);
    });

    // Observer Callback Modification to Apply Styles
    // We need to re-define the observer to actually change the styles since we set them inline above.
    const styleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a slight delay based on index if possible, but here we just trigger
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                styleObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => styleObserver.observe(el));

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
