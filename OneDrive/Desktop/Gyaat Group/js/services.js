document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  
    // Smooth Scrolling
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
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
          }
        }
      });
    });
  
    // Service Filter
    const serviceFilter = document.getElementById('serviceFilter');
    if (serviceFilter) {
      serviceFilter.addEventListener('change', function() {
        const selectedService = this.value;
        if (selectedService) {
          const targetSection = document.getElementById(selectedService);
          if (targetSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    }
  
    // Service Navigation Highlight
    const serviceSections = document.querySelectorAll('.service-card');
    const serviceNavItems = document.querySelectorAll('.service-nav-item');
    
    function highlightServiceNav() {
      let currentSection = '';
      
      serviceSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.pageYOffset + 150; // Adjust for header
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.id;
        }
      });
      
      serviceNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-service') === currentSection) {
          item.classList.add('active');
        }
      });
    }
    
    window.addEventListener('scroll', highlightServiceNav);
    highlightServiceNav(); // Initialize on load
  
    // Animate service cards on scroll
    function animateServiceCards() {
      serviceSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
          section.classList.add('visible');
        }
      });
    }
    
    window.addEventListener('scroll', animateServiceCards);
    animateServiceCards(); // Initialize on load
  
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
    
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Sticky Header
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  });