// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const header = document.getElementById('header');

// Performance optimizations
let ticking = false;

// Debounce function to limit event firing
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// Theme toggle functionality
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    updateThemeIcon();
}

// Update theme icon based on current theme
function updateThemeIcon() {
    const currentTheme = document.body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Initialize theme based on user preference or system preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let initialTheme = 'light';
    
    if (savedTheme) {
        initialTheme = savedTheme;
    } else if (systemPrefersDark) {
        initialTheme = 'dark';
    }
    
    document.body.setAttribute('data-theme', initialTheme);
    
    // Update icon based on theme
    updateThemeIcon();
    
    // Make sure navbar is visible at the start
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.transform = 'translateY(0)';
    }
}

// Smooth scrolling for navigation links
function smoothScrollToSection(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
        window.scrollTo({
            top: targetSection.offsetTop - 80, // Account for fixed header
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
    }
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && subject && message) {
        // In a real application, you would send the data to a server here
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message (in a real app, you'd have a proper notification)
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100; // Offset for fixed header
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Variables for scroll direction tracking
let lastScrollY = window.scrollY;

// Header scroll effect with performance optimization
function handleHeaderScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            const navbar = document.querySelector('.navbar');
            
            if (navbar) {
                // If we're at the top (hero section), always show navbar
                if (currentScrollY <= 50) {
                    navbar.style.transform = 'translateY(0)';
                    navbar.classList.add('scrolled');
                } else {
                    // Hide navbar when scrolling down
                    if (currentScrollY > lastScrollY) {
                        // Scrolling down - hide navbar
                        navbar.style.transform = 'translateY(-100%)';
                    } else {
                        // Scrolling up - show navbar
                        navbar.style.transform = 'translateY(0)';
                    }
                }
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        });
        ticking = true;
    }
}

// Navbar scroll effect - now handled in handleHeaderScroll
function updateNavbarOnScroll() {
    // This function is now integrated into handleHeaderScroll
}

// Animate elements when they come into view
function animateOnScroll() {
    const fadeElements = document.querySelectorAll('.fade-up');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initialize the application
function initApp() {
    // Event listeners
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScrollToSection);
    });
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        handleHeaderScroll();
        updateNavbarOnScroll();
        animateOnScroll();
    });
    
    // Initialize theme
    initializeTheme();
    
    // Initial animations
    animateOnScroll();
    
    // Trigger animations on load in case elements are already visible
    setTimeout(animateOnScroll, 100);
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    
    // Typing Text Animations (Using Typed.js)
    if (document.querySelector('.typing')) {
        new Typed(".typing", {
            strings: ["Electrical Engineer...", "Solar Engineer...", "Site Supervisor..."],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
        });
    }
});

// Additional utility functions
// Function to handle download CV button (in case the direct link doesn't work)
function handleDownloadCV() {
    // In a real application, this would trigger the download of the actual CV
    // For now, we'll just log the action
    console.log('Download CV button clicked');
}

// Add scroll reveal effect for skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (barTop < windowHeight - 50) {
            const width = bar.parentElement.querySelector('.skill-bar').style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width || '0%';
            }, 300);
        }
    });
}

// Add event listener for skill bar animations
window.addEventListener('scroll', animateSkillBars);
setTimeout(animateSkillBars, 500);

// Intersection Observer for more advanced animations
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-up elements
    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
}