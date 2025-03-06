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

// Loading screen functionality
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

// Dynamic Slideshow Setup
document.addEventListener('DOMContentLoaded', function () {
    // Function to set up a dynamic slideshow
    function setupDynamicSlideshow(slidesContainer, prevButton, nextButton, containerClass) {
        const slides = slidesContainer;
        const totalSlides = slides.children.length;

        let currentSlide = 0;

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
                prevButton.classList.add(`hidden-${containerClass}`); // Hide left button on first slide
            } else {
                prevButton.classList.remove(`hidden-${containerClass}`); // Show left button
            }

            if (currentSlide === totalSlides - 1) {
                nextButton.classList.add(`hidden-${containerClass}`); // Hide right button on last slide
            } else {
                nextButton.classList.remove(`hidden-${containerClass}`); // Show right button
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
    }

    // Setup for first color slideshow
    const firstColorSlides = document.querySelector('.slides-colors');
    const firstColorPrevButton = document.querySelector('.prev-button-colors');
    const firstColorNextButton = document.querySelector('.next-button-colors');

    if (firstColorSlides && firstColorPrevButton && firstColorNextButton) {
        setupDynamicSlideshow(firstColorSlides, firstColorPrevButton, firstColorNextButton, 'colors');
    }

    // Setup for second color slideshow
    const secondColorSlides = document.querySelectorAll('.slides-colors')[1]; // Select the second occurrence
    const secondColorPrevButton = document.querySelectorAll('.prev-button-colors')[1];
    const secondColorNextButton = document.querySelectorAll('.next-button-colors')[1];

    if (secondColorSlides && secondColorPrevButton && secondColorNextButton) {
        setupDynamicSlideshow(secondColorSlides, secondColorPrevButton, secondColorNextButton, 'colors');
    }
});

// Existing Slideshow Script
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelector('.slides');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const totalSlides = 5; // Total number of slides
    let currentSlide = 0;

    // Function to show a specific slide
    function showSlide(index) {
        // Prevent going out of bounds
        if (index < 0) {
            index = 0; // Stay on the first slides
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

// Rest of your existing JavaScript code remains the same (Interior and Secure sliders, Exterior slider, etc.)
let interiorSlideIndex = 0;
let interiorSlideInterval;

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
    moveInteriorSlide(0);
    
    // Reset the autoplay timer when manually changing slides
    clearInterval(interiorSlideInterval);
    interiorSlideInterval = setInterval(autoplayInteriorSlides, 3000);
}

// Rest of the code (Secure slider, Exterior slider) remains the same

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

let exteriorCurrentSlide = 0;
const exteriorSlider = document.getElementById('exterior-slider');
let exteriorSlides, exteriorDots;

// Initialize the slider
function initExteriorSlider() {
  // Get all slides and dots
  exteriorSlides = document.querySelectorAll('#exterior-slider > .exterior-slide, #exterior-slider > .exterior-double-slide');
  exteriorDots = document.querySelectorAll('.exterior-dot');
  
  // Make sure we have enough dots
  updateDots();
  
  // Touch event variables
  let touchStartX = 0;
  let touchEndX = 0;

  // Set up touch events
  exteriorSlider.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  exteriorSlider.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  // Initialize
  exteriorShowSlide(0);
  
  // Set up auto-slide
  let slideInterval = setInterval(() => {
    exteriorChangeSlide(1);
  }, 5000);

  // Pause auto-slide when interacting with slider
  exteriorSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  exteriorSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
      exteriorChangeSlide(1);
    }, 5000);
  });

  exteriorSlider.addEventListener('touchstart', () => {
    clearInterval(slideInterval);
  });

  exteriorSlider.addEventListener('touchend', () => {
    slideInterval = setInterval(() => {
      exteriorChangeSlide(1);
    }, 5000);
  });
}

// Update dots to match the number of slides
function updateDots() {
  const dotsContainer = document.getElementById('exterior-dots');
  
  // Clear existing dots
  dotsContainer.innerHTML = '';
  
  // Create new dots
  for (let i = 0; i < exteriorSlides.length; i++) {
    const dot = document.createElement('span');
    dot.className = 'exterior-dot';
    if (i === 0) dot.classList.add('active');
    dot.onclick = function() { exteriorJumpToSlide(i); };
    dotsContainer.appendChild(dot);
  }
  
  // Update the exteriorDots reference
  exteriorDots = document.querySelectorAll('.exterior-dot');
}

function handleSwipe() {
  const swipeThreshold = 50; // minimum distance required for swipe
  if (touchEndX < touchStartX - swipeThreshold) {
    // Swiped left
    exteriorChangeSlide(1);
  } else if (touchEndX > touchStartX + swipeThreshold) {
    // Swiped right
    exteriorChangeSlide(-1);
  }
}

function exteriorShowSlide(index) {
  if (index >= exteriorSlides.length) {
    exteriorCurrentSlide = 0;
  } else if (index < 0) {
    exteriorCurrentSlide = exteriorSlides.length - 1;
  } else {
    exteriorCurrentSlide = index;
  }
  
  // Calculate the position based on slide width
  exteriorSlider.style.transform = `translateX(-${exteriorCurrentSlide * 100}%)`;
  
  // Update dots
  exteriorDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === exteriorCurrentSlide);
  });
}

function exteriorChangeSlide(direction) {
  exteriorShowSlide(exteriorCurrentSlide + direction);
}

function exteriorJumpToSlide(index) {
  exteriorShowSlide(index);
}

// Adjust slider height for mobile
function adjustSliderHeight() {
  if (window.innerWidth <= 768) {
    exteriorSlides.forEach(slide => {
      if (slide.classList.contains('exterior-double-slide')) {
        // Handle double slides with CSS flexbox
      } else {
        // Set height for single slides if needed
        const imageHeight = slide.querySelector('img').offsetHeight;
        const contentHeight = slide.querySelector('.exterior-content').offsetHeight;
        slide.style.height = `${imageHeight + contentHeight}px`;
      }
    });
  } else {
    // Reset heights for desktop view
    exteriorSlides.forEach(slide => {
      slide.style.height = '';
    });
  }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initExteriorSlider();
  adjustSliderHeight();
});

window.addEventListener('resize', adjustSliderHeight);

// Function to add new slides programmatically
function addExteriorSlide(isDouble, imageUrls, titles, descriptions, footerNotes) {
  let newSlide;
  
  if (isDouble) {
    // Create double slide
    newSlide = document.createElement('div');
    newSlide.className = 'exterior-double-slide';
    
    for (let i = 0; i < 2; i++) {
      const halfSlide = document.createElement('div');
      halfSlide.className = 'exterior-half-slide';
      
      const img = document.createElement('img');
      img.src = imageUrls[i];
      img.alt = 'Car feature';
      img.className = 'exterior-section-image';
      
      const content = document.createElement('div');
      content.className = 'exterior-content';
      
      const title = document.createElement('div');
      title.className = 'exterior-title';
      title.textContent = titles[i];
      
      content.appendChild(title);
      
      if (descriptions && descriptions[i]) {
        const description = document.createElement('div');
        description.className = 'exterior-description';
        description.textContent = descriptions[i];
        content.appendChild(description);
      }
      
      if (footerNotes && footerNotes[i]) {
        const footerNote = document.createElement('div');
        footerNote.className = 'exterior-footer-note';
        footerNote.textContent = footerNotes[i];
        content.appendChild(footerNote);
      }
      
      halfSlide.appendChild(img);
      halfSlide.appendChild(content);
      newSlide.appendChild(halfSlide);
    }
  } else {
    // Create single slide
    newSlide = document.createElement('div');
    newSlide.className = 'exterior-slide';
    
    const img = document.createElement('img');
    img.src = imageUrls[0];
    img.alt = 'Car feature';
    img.className = 'exterior-section-image';
    
    const content = document.createElement('div');
    content.className = 'exterior-content';
    
    const title = document.createElement('div');
    title.className = 'exterior-title';
    title.textContent = titles[0];
    
    content.appendChild(title);
    
    if (descriptions && descriptions[0]) {
      const description = document.createElement('div');
      description.className = 'exterior-description';
      description.textContent = descriptions[0];
      content.appendChild(description);
    }
    
    if (footerNotes && footerNotes[0]) {
      const footerNote = document.createElement('div');
      footerNote.className = 'exterior-footer-note';
      footerNote.textContent = footerNotes[0];
      content.appendChild(footerNote);
    }
    
    newSlide.appendChild(img);
    newSlide.appendChild(content);
  }
  
  // Add the new slide to the slider
  exteriorSlider.appendChild(newSlide);
  
  // Reinitialize the slider to update slides and dots
  initExteriorSlider();
}