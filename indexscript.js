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

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const slidesContainer = document.querySelector('.slides-colors');
    const slides = document.querySelectorAll('.slide-colors');
    const prevButton = document.querySelector('.prev-button-colors');
    const nextButton = document.querySelector('.next-button-colors');
    
    // Initial setup
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Initialize button visibility
    updateButtonVisibility();
    
    // Navigation functions
    function goToSlide(index) {
      currentIndex = index;
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateButtonVisibility();
    }
    
    function goToPrevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
        goToSlide(currentIndex);
      }
    }
    
    function goToNextSlide() {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
        goToSlide(currentIndex);
      }
    }
    
    // Update button visibility based on current slide
    function updateButtonVisibility() {
      // Hide prev button on first slide
      if (currentIndex === 0) {
        prevButton.style.display = 'none';
      } else {
        prevButton.style.display = 'flex';
      }
      
      // Hide next button on last slide
      if (currentIndex === totalSlides - 1) {
        nextButton.style.display = 'none';
      } else {
        nextButton.style.display = 'flex';
      }
    }
    
    // Event listeners
    prevButton.addEventListener('click', goToPrevSlide);
    nextButton.addEventListener('click', goToNextSlide);
    
    // Touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    
    slidesContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    slidesContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left
        goToNextSlide();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right
        goToPrevSlide();
      }
    }
  });