// Page-specific JavaScript functionality

// About page functionality
function initAboutPage() {
    // Add any specific functionality for the about page
    console.log('About page initialized');
}

// Experience page functionality
function initExperiencePage() {
    // Add any specific functionality for the experience page
    console.log('Experience page initialized');
}

// Skills page functionality
function initSkillsPage() {
    // Add any specific functionality for the skills page
    console.log('Skills page initialized');
    
    // Animate skill bars when they come into view
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom >= 0) {
                const width = bar.getAttribute('data-width') || '0%';
                bar.style.width = width;
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', animateSkillBars);
    
    // Initialize on page load
    setTimeout(animateSkillBars, 500);
}

// Projects page functionality
function initProjectsPage() {
    // Add any specific functionality for the projects page
    console.log('Projects page initialized');
    
    // Add hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Certificates page functionality
function initCertificatesPage() {
    // Add any specific functionality for the certificates page
    console.log('Certificates page initialized');
    
    // Add hover effects for certificate cards
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    certificateCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Contact page functionality
function initContactPage() {
    // Add any specific functionality for the contact page
    console.log('Contact page initialized');
    
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real application, you would send the data to a server here
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Initialize page-specific functionality based on current page
function initPageSpecificScripts() {
    // Get current page name from URL
    const currentPage = window.location.pathname.split('/').pop().toLowerCase();
    
    // Initialize appropriate page functionality
    switch(currentPage) {
        case 'about.html':
            initAboutPage();
            break;
        case 'experience.html':
            initExperiencePage();
            break;
        case 'skills.html':
            initSkillsPage();
            break;
        case 'projects.html':
            initProjectsPage();
            break;
        case 'certificates.html':
            initCertificatesPage();
            break;
        case 'contact.html':
            initContactPage();
            break;
        case 'index.html':
        case '':
            // Homepage - initialize all functionality that should run on the main page
            initSkillsPage(); // For skill animations on homepage
            initProjectsPage(); // For project card effects on homepage
            initCertificatesPage(); // For certificate card effects on homepage
            break;
        default:
            // For any other page, try to initialize based on page content
            if (document.querySelector('.skills-container')) {
                initSkillsPage();
            }
            if (document.querySelector('.projects-grid')) {
                initProjectsPage();
            }
            if (document.querySelector('.certificates-grid')) {
                initCertificatesPage();
            }
            if (document.querySelector('#contactForm')) {
                initContactPage();
            }
            break;
    }
}

// Initialize page-specific scripts when DOM is loaded
document.addEventListener('DOMContentLoaded', initPageSpecificScripts);

// Export functions if using modules (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAboutPage,
        initExperiencePage,
        initSkillsPage,
        initProjectsPage,
        initCertificatesPage,
        initContactPage,
        initPageSpecificScripts
    };
}