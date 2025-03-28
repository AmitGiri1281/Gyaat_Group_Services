document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // MOBILE MENU FUNCTIONALITY
    // ======================
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const navLinks = document.getElementById('navLinks');
    
    function toggleMobileMenu() {
        mobileMenuButton.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // ======================
    // SMOOTH SCROLLING
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // ======================
    // STATISTICS COUNTER
    // ======================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    current = target;
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }

    // ======================
    // TESTIMONIALS SLIDER
    // ======================
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;
    
    if (testimonialsSlider) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        // Touch events for mobile
        testimonialCards.forEach((card, index) => {
            // Touch start
            card.addEventListener('touchstart', touchStart(index));
            // Touch end
            card.addEventListener('touchend', touchEnd);
            // Touch move
            card.addEventListener('touchmove', touchMove);
            
            // Mouse events for desktop
            card.addEventListener('mousedown', touchStart(index));
            card.addEventListener('mouseup', touchEnd);
            card.addEventListener('mouseleave', touchEnd);
            card.addEventListener('mousemove', touchMove);
        });
        
        // Prevent context menu on slider
        window.oncontextmenu = function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        function touchStart(index) {
            return function(event) {
                currentIndex = index;
                startPos = getPositionX(event);
                isDragging = true;
                animationID = requestAnimationFrame(animation);
                testimonialsSlider.classList.add('grabbing');
            }
        }
        
        function touchEnd() {
            isDragging = false;
            cancelAnimationFrame(animationID);
            
            const movedBy = currentTranslate - prevTranslate;
            
            if (movedBy < -100 && currentIndex < testimonialCards.length - 1) {
                currentIndex += 1;
            }
            
            if (movedBy > 100 && currentIndex > 0) {
                currentIndex -= 1;
            }
            
            setPositionByIndex();
            testimonialsSlider.classList.remove('grabbing');
        }
        
        function touchMove(event) {
            if (isDragging) {
                const currentPosition = getPositionX(event);
                currentTranslate = prevTranslate + currentPosition - startPos;
            }
        }
        
        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }
        
        function animation() {
            setSliderPosition();
            if (isDragging) requestAnimationFrame(animation);
        }
        
        function setSliderPosition() {
            testimonialsSlider.style.transform = `translateX(${currentTranslate}px)`;
        }
        
        function setPositionByIndex() {
            currentTranslate = currentIndex * -testimonialCards[0].offsetWidth;
            prevTranslate = currentTranslate;
            setSliderPosition();
        }
    }

    // ======================
    // BACK TO TOP BUTTON
    // ======================
    const backToTopButton = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    }
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ======================
    // SERVICE CARD HOVER EFFECTS
    // ======================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'rotateY(180deg)';
            
            setTimeout(() => {
                icon.innerHTML = '<i class="fas fa-arrow-right"></i>';
                icon.style.transform = 'rotateY(0)';
            }, 200);
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            const originalIcon = this.getAttribute('data-icon');
            
            icon.style.transform = 'rotateY(180deg)';
            
            setTimeout(() => {
                icon.innerHTML = `<i class="${originalIcon}"></i>`;
                icon.style.transform = 'rotateY(0)';
            }, 200);
        });
    });

    // ======================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ======================
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stats when they come into view
                if (entry.target.classList.contains('hero-stats')) {
                    animateStats();
                }
                
                // Add animated class for CSS animations
                entry.target.classList.add('animated');
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animatedElements = document.querySelectorAll('.hero-stats, .service-card, .about-content, .testimonial-card');
    animatedElements.forEach(el => observer.observe(el));

    // ======================
    // STICKY HEADER
    // ======================
    const header = document.querySelector('header');
    
    function updateHeader() {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // ======================
    // INITIALIZE EVENT LISTENERS
    // ======================
    window.addEventListener('scroll', function() {
        toggleBackToTop();
        updateHeader();
    });
    
    // Initialize
    toggleBackToTop();
    updateHeader();
});