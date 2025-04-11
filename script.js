// Theme Toggle
const themeToggle = document.getElementById('themetoggle');
const body = document.body;

// Set initial theme
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark' 
    ? '<i class="fas fa-moon"></i>' 
    : '<i class="fas fa-sun"></i>';

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';
});

// Mobile Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.links') && !e.target.closest('#hamburger')) {
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('.links a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#') && !link.hasAttribute('download')) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navLinks.classList.remove('active');
        }
    });
});

// Project Carousel
const projectsContainer = document.querySelector('.projects-container');
const projectCards = document.querySelectorAll('.project-card');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const dotsContainer = document.querySelector('.project-dots');
let currentIndex = 0;

// Create dots
projectCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('project-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToProject(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.project-dot');

function updateNavigation() {
    projectCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentIndex);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
    
    leftArrow.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    rightArrow.style.visibility = currentIndex === projectCards.length - 1 ? 'hidden' : 'visible';
}

function goToProject(index) {
    currentIndex = index;
    projectsContainer.scrollTo({
        left: projectCards[index].offsetLeft,
        behavior: 'smooth'
    });
    updateNavigation();
}

leftArrow.addEventListener('click', () => currentIndex > 0 && goToProject(currentIndex - 1));
rightArrow.addEventListener('click', () => currentIndex < projectCards.length - 1 && goToProject(currentIndex + 1));

// Initialize videos
document.querySelectorAll('.video-container video').forEach(video => {
    video.play().catch(e => console.log('Autoplay prevented:', e));
});

// Click to show overlay on mobile
if (window.innerWidth <= 768) {
    document.querySelectorAll('.video-container').forEach(container => {
        container.addEventListener('click', () => {
            container.classList.toggle('show-overlay');
        });
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) goToProject(currentIndex - 1);
    if (e.key === 'ArrowRight' && currentIndex < projectCards.length - 1) goToProject(currentIndex + 1);
});

const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll(
        '.animate-fade, .animate-slide-left, .animate-slide-right, .animate-slide-up'
    );

    const skillsBoxes = document.querySelectorAll('.skills-details .box');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For regular animated elements
                if (entry.target.classList.contains('animate-fade') || 
                    entry.target.classList.contains('animate-slide-left') || 
                    entry.target.classList.contains('animate-slide-right') || 
                    entry.target.classList.contains('animate-slide-up')) {
                    
                    entry.target.classList.remove('reset-animation');
                    void entry.target.offsetWidth; // Force reflow
                    
                    if (entry.target.classList.contains('animate-fade')) {
                        entry.target.classList.add('animate-fade');
                    } else if (entry.target.classList.contains('animate-slide-left')) {
                        entry.target.classList.add('animate-slide-left');
                    } else if (entry.target.classList.contains('animate-slide-right')) {
                        entry.target.classList.add('animate-slide-right');
                    } else if (entry.target.classList.contains('animate-slide-up')) {
                        entry.target.classList.add('animate-slide-up');
                    }
                }
                
                // For skills boxes
                if (entry.target.classList.contains('skills')) {
                    skillsBoxes.forEach((box, index) => {
                        setTimeout(() => {
                            box.classList.add('show');
                        }, index * 200);
                    });
                }
            } else {
                // For regular animated elements
                if (entry.target.classList.contains('animate-slide-left')) {
                    entry.target.classList.add('reset-animation', 'slide-left');
                } else if (entry.target.classList.contains('animate-slide-right')) {
                    entry.target.classList.add('reset-animation', 'slide-right');
                } else if (entry.target.classList.contains('animate-slide-up')) {
                    entry.target.classList.add('reset-animation', 'slide-up');
                } else if (entry.target.classList.contains('animate-fade')) {
                    entry.target.classList.add('reset-animation');
                }
                
                // For skills boxes
                if (entry.target.classList.contains('skills')) {
                    skillsBoxes.forEach(box => {
                        box.classList.remove('show');
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Also observe the skills section
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
};

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Add initial animations
    document.querySelector('.profile-image').classList.add('animate-slide-left');
    document.querySelector('.intro-text').classList.add('animate-slide-right', 'delay-1');
    
    // Add pulse animation to hire me button
    const hireMeBtn = document.querySelector('.hire-me');
    hireMeBtn.classList.add('animate-pulse');
    
    // Remove pulse animation on hover to avoid conflict
    hireMeBtn.addEventListener('mouseenter', () => {
        hireMeBtn.classList.remove('animate-pulse');
    });
    
    hireMeBtn.addEventListener('mouseleave', () => {
        setTimeout(() => {
            hireMeBtn.classList.add('animate-pulse');
        }, 1000);
    });
});



// Initialize
updateNavigation();