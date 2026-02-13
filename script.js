// ===================================
// HomelyB - Interactive Features
// ===================================

// Load logo from information.txt file (optional - logo is already set in HTML)
async function loadLogo() {
  try {
    const response = await fetch('information.txt');
    const logoUrl = await response.text();
    
    // Only update if information.txt has a different URL
    if (logoUrl && logoUrl.trim()) {
      const footerLogo = document.getElementById('footer-logo');
      const heroLogo = document.querySelector('.hero-logo');
      
      if (footerLogo && logoUrl.trim() !== footerLogo.src) {
        footerLogo.src = logoUrl.trim();
      }
      
      if (heroLogo && logoUrl.trim() !== heroLogo.src) {
        heroLogo.src = logoUrl.trim();
      }
    }
  } catch (error) {
    // Logo is already set in HTML, so no action needed
    console.log('Using default logo from HTML');
  }
}

// Smooth scroll for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      
      // Toggle mobile menu styles
      if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        navLinks.style.gap = '15px';
      } else {
        navLinks.style.display = '';
        navLinks.style.flexDirection = '';
        navLinks.style.position = '';
        navLinks.style.top = '';
        navLinks.style.left = '';
        navLinks.style.right = '';
        navLinks.style.background = '';
        navLinks.style.padding = '';
        navLinks.style.boxShadow = '';
        navLinks.style.gap = '';
      }
    });
    
    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          mobileToggle.classList.remove('active');
          navLinks.style.display = '';
        }
      });
    });
  }
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
      navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
  });
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.feature, .menu-category, .testimonial-card, .contact-method, .order-step, .benefit-card, .stat-card'
  );
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Add hover effect to menu items
function initMenuItemEffects() {
  const menuItems = document.querySelectorAll('.menu-items li');
  
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.paddingLeft = '30px';
      this.style.color = 'var(--primary-color)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.paddingLeft = '25px';
      this.style.color = 'var(--text-dark)';
    });
  });
}

// Add click-to-copy functionality for contact info
function initContactCopy() {
  const contactMethods = document.querySelectorAll('.contact-method a');
  
  contactMethods.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only copy for email and phone, not for mailto/tel links
      if (this.href.startsWith('mailto:') || this.href.startsWith('tel:')) {
        return; // Let default behavior happen
      }
      
      e.preventDefault();
      const text = this.textContent;
      
      navigator.clipboard.writeText(text).then(() => {
        // Show copied feedback
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        this.style.color = 'var(--secondary-color)';
        
        setTimeout(() => {
          this.textContent = originalText;
          this.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    });
  });
}

// Add current year to footer
function updateFooterYear() {
  const footerText = document.querySelector('.footer-bottom p');
  if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.innerHTML = `&copy; ${currentYear} HomelyB. Made with ❤️ for everyone missing home.`;
  }
}

// Preload images for better performance
function preloadImages() {
  // Add any additional images to preload here if needed
}

// Animated counter for stats
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => animateCounter(stat));
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// Scroll to top button
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTop');
  
  if (!scrollBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  // Scroll to top when clicked
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Add parallax effect to hero section
function initParallaxEffect() {
  const hero = document.querySelector('.hero');
  
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
  });
}

// Form Modal Functions
function initFormModal() {
  const formModal = document.getElementById('formModal');
  const closeFormModal = document.getElementById('closeFormModal');
  
  if (!formModal || !closeFormModal) return;

  // Check URL parameter to show modal automatically
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('register') === 'kitchen' || urlParams.get('form') === 'register') {
    showFormModal();
  }

  // Close modal when close button is clicked
  closeFormModal.addEventListener('click', () => {
    hideFormModal();
  });

  // Close modal when clicking outside the modal content
  formModal.addEventListener('click', (e) => {
    if (e.target === formModal) {
      hideFormModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && formModal.classList.contains('active')) {
      hideFormModal();
    }
  });
}

function showFormModal() {
  const formModal = document.getElementById('formModal');
  if (formModal) {
    formModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function hideFormModal() {
  const formModal = document.getElementById('formModal');
  if (formModal) {
    formModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Remove URL parameter without page reload
    if (window.history.replaceState) {
      const url = new URL(window.location);
      url.searchParams.delete('register');
      url.searchParams.delete('form');
      window.history.replaceState({}, '', url);
    }
  }
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadLogo();
  initSmoothScroll();
  initMobileMenu();
  initNavbarScroll();
  initScrollAnimations();
  initMenuItemEffects();
  initContactCopy();
  updateFooterYear();
  preloadImages();
  initStatsCounter();
  initScrollToTop();
  initParallaxEffect();
  initFormModal();
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Reset mobile menu on desktop view
    if (window.innerWidth > 768) {
      const navLinks = document.querySelector('.nav-links');
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        navLinks.style.display = '';
      }
    }
  }, 250);
});

// Add loading state
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Prevent FOUC (Flash of Unstyled Content)
document.documentElement.style.visibility = 'visible';
