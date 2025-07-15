// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");
hamburger.addEventListener("click", function () {
  mobileNav.classList.toggle("open");
});

// Testimonials Carousel
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
  if (currentSlide >= originalSlides * 2) {
    // Wait for transition to complete, then reset without animation
    setTimeout(() => {
      carousel.style.transition = "none";
      currentSlide = 0;
      updateCarousel();
      // Re-enable transition after a brief moment
      setTimeout(() => {
        carousel.style.transition = "transform 0.5s ease-in-out";
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
  // Get current card width and gap based on screen size
  let cardWidth, gap;
  if (window.innerWidth <= 600) {
    cardWidth = 400;
    gap = 30;
  } else if (window.innerWidth <= 900) {
    cardWidth = 600;
    gap = 40;
  } else {
    cardWidth = 988;
    gap = 52;
  }

  // Update carousel position
  const translateX = -currentSlide * (cardWidth + gap);
  carousel.style.transform = `translateX(${translateX}px)`;

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
