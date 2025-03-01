// Menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navContainer = document.getElementById('navContainer');
    
    // Toggle menu when clicking hamburger icon
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navContainer.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        if (navContainer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-links a, .nav-right a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navContainer.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container') && 
            !event.target.closest('.menu-toggle') && 
            navContainer.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navContainer.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Resize handler - reset menu if window is resized beyond mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024 && navContainer.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navContainer.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const heroVideo = document.querySelector('.hero-video');
    
    // Function to hide loading screen
    function hideLoadingScreen() {
        loadingScreen.classList.add('fade-out');
        // Remove from DOM after transition completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    
    // Check if video exists
    if (heroVideo) {
        // If video is already loaded/cached
        if (heroVideo.readyState >= 3) {
            hideLoadingScreen();
        } else {
            // Listen for when video can play through without stopping
            heroVideo.addEventListener('canplaythrough', function() {
                hideLoadingScreen();
            });
            
            // Fallback if video takes too long (10 seconds)
            setTimeout(function() {
                if (!loadingScreen.classList.contains('fade-out')) {
                    hideLoadingScreen();
                }
            }, 10000);
        }
    } else {
        // No video found, hide loading screen immediately
        hideLoadingScreen();
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelector('.slides');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentSlide = 0;
    const totalSlides = 5; // Total number of slides

    // Function to show a specific slide
    function showSlide(index) {
        // Prevent going out of bounds
        if (index < 0) {
            index = 0; // Stay on the first slide
        } else if (index >= totalSlides) {
            index = totalSlides - 1; // Stay on the last slide
        }

        // Move the slides
        slides.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;

        // Hide/show buttons based on the current slide
        if (currentSlide === 0) {
            prevButton.classList.add('hidden'); // Hide left button on slide 0
        } else {
            prevButton.classList.remove('hidden'); // Show left button
        }

        if (currentSlide === totalSlides - 1) {
            nextButton.classList.add('hidden'); // Hide right button on slide 5
        } else {
            nextButton.classList.remove('hidden'); // Show right button
        }
    }

    // Previous button functionality
    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Next button functionality
    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Initialize button states
    showSlide(currentSlide);
});
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelector('.slides-batik');
    const prevButton = document.querySelector('.prev-button-batik');
    const nextButton = document.querySelector('.next-button-batik');
    let currentSlide = 0;
    const totalSlides = 14; // Total number of slides

    // Function to show a specific slide
    function showSlide(index) {
        // Prevent going out of bounds
        if (index < 0) {
            index = 0; // Stay on the first slide
        } else if (index >= totalSlides) {
            index = totalSlides - 1; // Stay on the last slide
        }

        // Move the slides
        slides.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;

        // Hide/show buttons based on the current slide
        if (currentSlide === 0) {
            prevButton.classList.add('hidden-batik'); // Hide left button on slide 0
        } else {
            prevButton.classList.remove('hidden-batik'); // Show left button
        }

        if (currentSlide === totalSlides - 1) {
            nextButton.classList.add('hidden-batik'); // Hide right button on slide 5
        } else {
            nextButton.classList.remove('hidden-batik'); // Show right button
        }
    }

    // Previous button functionality
    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Next button functionality
    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Initialize button states
    showSlide(currentSlide);
});
let interiorSlideIndex = 0;
let interiorSlideInterval; // Variable to store the interval for interior slideshow

// Function to move slides for Interior section
function moveInteriorSlide(n) {
    const slides = document.querySelectorAll(".InteriorSlide");
    const thumbnails = document.querySelectorAll(".thumbnail");

    interiorSlideIndex += n;

    if (interiorSlideIndex >= slides.length) {
        interiorSlideIndex = 0;
    }
    if (interiorSlideIndex < 0) {
        interiorSlideIndex = slides.length - 1;
    }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        thumbnails[i].classList.remove("active");
    }

    // Show the current slide
    slides[interiorSlideIndex].style.display = "block";
    thumbnails[interiorSlideIndex].classList.add("active");
}

// Function to automatically advance Interior slides
function autoplayInteriorSlides() {
    moveInteriorSlide(1);
}

// Function to show a specific Interior slide when clicking on a thumbnail
function showInteriorSlide(index) {
    interiorSlideIndex = index;
    moveInteriorSlide(0); // Call moveInteriorSlide with 0 to update the display
    
    // Reset the autoplay timer when manually changing slides
    clearInterval(interiorSlideInterval);
    interiorSlideInterval = setInterval(autoplayInteriorSlides, 3000); // Restart autoplay
}

let secureSlideIndex = 0;
let secureSlideInterval; // Variable to store the interval for secure slideshow

// Function to move slides for Secure section
function moveSecureSlide(n) {
    const slides = document.querySelectorAll(".SecureSlide");
    const thumbnails = document.querySelectorAll(".securethumbnail");

    secureSlideIndex += n;

    if (secureSlideIndex >= slides.length) {
        secureSlideIndex = 0;
    }
    if (secureSlideIndex < 0) {
        secureSlideIndex = slides.length - 1;
    }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        thumbnails[i].classList.remove("active");
    }

    // Show the current slide
    slides[secureSlideIndex].style.display = "block";
    thumbnails[secureSlideIndex].classList.add("active");
}

// Function to automatically advance Secure slides
function autoplaySecureSlides() {
    moveSecureSlide(1);
}

// Function to show a specific Secure slide when clicking on a thumbnail
function showSecureSlide(index) {
    secureSlideIndex = index;
    moveSecureSlide(0); // Call moveSecureSlide with 0 to update the display
    
    // Reset the autoplay timer when manually changing slides
    clearInterval(secureSlideInterval);
    secureSlideInterval = setInterval(autoplaySecureSlides, 3000); // Restart autoplay
}

// Initialize both sliders with autoplay
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Interior slider
    moveInteriorSlide(0); // Show the first slide and activate the first thumbnail
    interiorSlideInterval = setInterval(autoplayInteriorSlides, 3000); // Auto advance every 5 seconds
    
    // Initialize Secure slider
    moveSecureSlide(0); // Show the first slide and activate the first thumbnail
    secureSlideInterval = setInterval(autoplaySecureSlides, 3000); // Auto advance every 5 seconds
    
    // Pause autoplay when hovering over the sliders
    const interiorContainer = document.querySelector(".InteriorContainer");
    if (interiorContainer) {
        interiorContainer.addEventListener("mouseenter", function() {
            clearInterval(interiorSlideInterval);
        });
        
        interiorContainer.addEventListener("mouseleave", function() {
            interiorSlideInterval = setInterval(autoplayInteriorSlides, 3000);
        });
    }
    
    const secureContainer = document.querySelector(".SecureContainer");
    if (secureContainer) {
        secureContainer.addEventListener("mouseenter", function() {
            clearInterval(secureSlideInterval);
        });
        
        secureContainer.addEventListener("mouseleave", function() {
            secureSlideInterval = setInterval(autoplaySecureSlides, 3000);
        });
    }
    
    // Remove arrow buttons from the DOM if they exist
    const arrowButtons = document.querySelectorAll(".InteriorPrev, .InteriorNext, .SecurePrev, .SecureNext");
    arrowButtons.forEach(button => {
        if (button) {
            button.remove();
        }
    });
});