// Testimonials Carousel - Bootstrap Compatible
const carousel = document.querySelector(".testimonials-carousel");
const dots = document.querySelectorAll(".carousel-dot");
let currentSlide = 0;
const totalSlides = dots.length;
const originalSlides = 4; // Number of original testimonials

// Auto-rotate carousel every 4 seconds
let autoRotate = setInterval(nextSlide, 4000);

function nextSlide() {
  currentSlide = currentSlide + 1;

  // If we've reached the end of all slides (8 total), reset to beginning seamlessly
  if (currentSlide >= originalSlides) {
    // Wait for transition to complete, then reset without animation
    setTimeout(() => {
      carousel.style.transition = "none";
      currentSlide = 0;
      updateCarousel();
      // Re-enable transition after a brief moment
      setTimeout(() => {
        carousel.style.transition = "transform 0.5s ease";
      }, 10);
    }, 500);
    return;
  }

  updateCarousel();
}

function prevSlide() {
  currentSlide = currentSlide - 1;
  if (currentSlide < 0) {
    currentSlide = originalSlides * 2 - 1; // Go to last slide of duplicated set
  }
  updateCarousel();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
}

function updateCarousel() {
  // Calculate slide width based on Bootstrap grid system
  let slideWidth;
  if (window.innerWidth <= 600) {
    slideWidth = 100; // Full width on mobile
  } else if (window.innerWidth <= 900) {
    slideWidth = 50; // Half width on tablet
  } else {
    slideWidth = 25; // Quarter width on desktop
  }

  // Update carousel position
  const translateX = -currentSlide * slideWidth;
  carousel.style.transform = `translateX(${translateX}%)`;

  // Update active dot (use modulo to handle infinite scroll)
  const activeIndex = currentSlide % originalSlides;
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });

  // Reset auto-rotate timer
  clearInterval(autoRotate);
  autoRotate = setInterval(nextSlide, 4000);
}

// Add click event listeners to dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => goToSlide(index));
});

// Pause auto-rotate on hover
carousel.addEventListener("mouseenter", () => {
  clearInterval(autoRotate);
});

carousel.addEventListener("mouseleave", () => {
  autoRotate = setInterval(nextSlide, 4000);
});

// Handle window resize
window.addEventListener("resize", () => {
  updateCarousel();
});

// Initialize carousel on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCarousel();
});
