// Preloader Animation
document.addEventListener("DOMContentLoaded", () => {
  // Initially hide hero elements
  gsap.set([".marquee_inner", ".hero-text h1", ".hero-img"], {
    opacity: 0,
    y: 100
  });
  
  // Initialize GSAP timeline for preloader
  const preloaderTl = gsap.timeline();
  
  // Track loading status
  let heroImageLoaded = false;
  let preloaderAnimationComplete = false;
  let fallbackTimeout = null;
  
  // Function to check if we can hide the preloader
  const tryHidePreloader = () => {
    if (heroImageLoaded && preloaderAnimationComplete) {
      // Clear fallback timeout if it exists
      if (fallbackTimeout) {
        clearTimeout(fallbackTimeout);
      }
      
      // Hide preloader and show content
      hidePreloader();
    }
  };
  
  // Function to hide preloader and show content
  const hidePreloader = () => {
    // Create a reveal effect for the main content
    gsap.to(".preloader", {
      y: "-100%",
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        document.body.style.overflow = "auto";
        document.body.style.overflowX = "hidden";
        
        // Remove preloader immediately to prevent any flash
        document.querySelector(".preloader").style.display = "none";
        
        // Start page animations immediately after preloader is gone
        initPageAnimations();
      }
    });
  };
  
  // Preload hero image
  const heroImage = new Image();
  heroImage.src = document.querySelector(".hero-img img").src;
  
  // Set a fallback timeout (5 seconds) in case the image fails to load
  fallbackTimeout = setTimeout(() => {
    console.log("Fallback timeout triggered - forcing preloader to complete");
    heroImageLoaded = true;
    tryHidePreloader();
  }, 5000);
  
  // When hero image loads
  heroImage.onload = () => {
    console.log("Hero image loaded");
    heroImageLoaded = true;
    tryHidePreloader();
  };
  
  // When hero image fails to load
  heroImage.onerror = () => {
    console.log("Hero image failed to load");
    heroImageLoaded = true; // Proceed anyway
    tryHidePreloader();
  };
  
  // Animate logo letters appearance - reduced duration
  preloaderTl.to(".logo-letter", {
    opacity: 1,
    y: 0,
    stagger: 0.1, // Reduced from 0.2
    duration: 0.6, // Reduced from 1
    ease: "power3.out"
  });
  
  // Animate logo letter underlines
  preloaderTl.to(".logo-letter::after", {
    width: "100%",
    duration: 0.5, // Reduced from 0.8
    stagger: 0.1, // Reduced from 0.2
    ease: "power2.out"
  }, "-=0.3"); // Faster overlap
  
  // Animate text appearance
  preloaderTl.to(".preloader-text", {
    opacity: 1,
    duration: 0.5, // Reduced from 0.8
    ease: "power2.out",
    onComplete: () => {
      // Start glitch effect after text appears - only once
      glitchEffect(false); // Pass false to not repeat
    }
  }, "-=0.3"); // Faster overlap
  
  // Animate tech icons
  preloaderTl.to(".preloader-tech-icons", {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.out"
  }, "-=0.2");
  
  // Animate each tech icon with a stagger
  preloaderTl.to(".preloader-tech-icons i", {
    scale: 1.2,
    color: "white",
    stagger: 0.1,
    duration: 0.3,
    repeat: 1,
    yoyo: true,
    ease: "power2.inOut"
  }, "-=0.3");
  
  // Function to create glitch effect
  function glitchEffect(repeat = true) {
    // Glitch the main text
    gsap.to(".preloader-text", {
      skewX: 2,
      duration: 0.1,
      repeat: 2, // Reduced from 5
      yoyo: true,
      ease: "power4.inOut"
    });
    
    // Show and animate the pseudo-elements
    gsap.to(".preloader-text::before", {
      opacity: 0.8,
      duration: 0.1,
      transform: "translate(-5px, 0)",
      repeat: 2, // Reduced from 5
      yoyo: true
    });
    
    gsap.to(".preloader-text::after", {
      opacity: 0.8,
      duration: 0.1,
      transform: "translate(5px, 0)",
      repeat: 2, // Reduced from 5
      yoyo: true
    });
    
    // Only repeat if specified
    if (repeat) {
      const delay = 1 + Math.random() * 1; // Reduced from 2 + random * 3
      gsap.delayedCall(delay, glitchEffect);
    }
  }
  
  // Animate dots
  preloaderTl.to(".dot", {
    opacity: 0.8,
    scale: 1.2,
    stagger: {
      each: 0.1, // Reduced from 0.2
      repeat: 2, // Limited repeats instead of -1 (infinite)
      yoyo: true
    },
    duration: 0.4, // Reduced from 0.6
    ease: "power2.inOut"
  }, "<");
  
  // Animate shapes
  preloaderTl.to(".preloader-shape", {
    scale: 1.2,
    opacity: 0.2,
    stagger: 0.1, // Reduced from 0.2
    duration: 1, // Reduced from 1.5
    ease: "power2.inOut",
    repeat: 1, // Limited repeats instead of -1 (infinite)
    yoyo: true
  }, "<");
  
  // Counter and progress bar animation
  let counter = { value: 0 };
  const counterElement = document.querySelector(".preloader-counter");
  const progressBar = document.querySelector(".preloader-progress-bar");
  
  preloaderTl.to(counter, {
    value: 100,
    duration: 1.8, // Reduced from 3
    ease: "power2.inOut",
    onUpdate: () => {
      const value = Math.round(counter.value);
      counterElement.textContent = `${value}%`;
      progressBar.style.width = `${value}%`;
    }
  }, "<0.2"); // Faster start
  
  // Final animation to hide preloader content
  preloaderTl.to(".preloader-content > *", {
    opacity: 0,
    y: -20,
    stagger: 0.05, // Reduced from 0.1
    duration: 0.5, // Reduced from 0.8
    ease: "power3.in",
    onComplete: () => {
      preloaderAnimationComplete = true;
      tryHidePreloader();
    }
  });
  
  // Prevent scrolling during preloader
  document.body.style.overflow = "hidden";
});

// Function to initialize page animations after preloader
function initPageAnimations() {
  // Initialize Lenis smooth scrolling
  initLenis();
  
  // Initialize and start marquee immediately
  const marqueeAnim = initMarquee();
  marqueeAnim.play().progress(0.5);
  
  // Create a timeline for the cinematic sequence
  const mainTl = gsap.timeline({delay: 0.1}); // Small delay to ensure clean transition
  
  // 1. Reveal the marquee opacity only (it's already moving)
  mainTl.to(".marquee_inner", {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out"
  })
  
  // 2. Reveal hero text lines sequentially
  .to(".hero-text h1", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.3,
    ease: "power3.out"
  }, "-=0.3")
  
  // 3. Finally reveal the hero image with a fade up
  .to(".hero-img", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power2.out"
  }, "-=0.7");
}

// Initialize Lenis smooth scrolling
function initLenis() {
  const lenis = new Lenis({
    lerp: 0.05,
  });
  
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

const lenis = new Lenis({
  lerp: 0.05,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(CustomEase);

CustomEase.create(
  "hop",
  "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
);

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
let isAnimating = false;

menuToggle.addEventListener("click", () => {
  if (isAnimating) return;
  if (menuToggle.classList.contains("closed")) {
    menuToggle.classList.remove("closed");
    menuToggle.classList.add("opened");
    isAnimating = true;

    // Enhanced open animation
    gsap.to(menu, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "hop",
      duration: 1.5,
      onStart: () => {
        menu.style.pointerEvents = "all";
      },
    });

    // Animate menu items
    gsap.from(".link, .social", {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
      delay: 0.5,
      onComplete: () => {
        isAnimating = false;
      },
    });
  } else {
    menuToggle.classList.remove("opened");
    menuToggle.classList.add("closed");
    isAnimating = true;

    // Animate menu items out
    gsap.to(".link, .social", {
      y: -100,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: "power2.in",
    });

    // Enhanced close animation
    gsap.to(menu, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      ease: "hop",
      duration: 1.5,
      delay: 0.3,
      onComplete: () => {
        menu.style.pointerEvents = "none";
        gsap.set(menu, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        });
        // Reset menu items position
        gsap.set(".link, .social", {
          clearProps: "all",
        });
        isAnimating = false;
      },
    });
  }
});

// Marquee
function initMarquee() {
  let currentScroll = 0;
  let isScrollingDown = true;
  let arrows = document.querySelectorAll(".arrow");

  // Set initial position but keep opacity 0
  gsap.set(".marquee_inner", { 
    xPercent: -50,
    opacity: 0,
    y: 0 // Reset y position since we don't need the slide up anymore
  });
  
  // Create the marquee animation
  const marqueeAnim = gsap.to(".marquee_part", {
    xPercent: -100,
    repeat: -1,
    duration: 15,
    ease: "none",
    paused: true
  });

  // Handle scroll direction
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > currentScroll) {
      isScrollingDown = true;
    } else {
      isScrollingDown = false;
    }
    
    // Smooth transition for direction change
    gsap.to(marqueeAnim, {
      timeScale: isScrollingDown ? 1 : -1,
      duration: 0.3,
      ease: "power2.out"
    });

    arrows.forEach((arrow) => {
      if (isScrollingDown) {
        arrow.classList.remove("active");
      } else {
        arrow.classList.add("active");
      }
    });

    currentScroll = window.pageYOffset;
  });
  
  return marqueeAnim;
}

// Parallax Image

gsap.utils.toArray(".parallax-img-container").forEach(function (container) {
  let image = container.querySelector("img");

  gsap.to(image, {
    y: () => image.offsetHeight - container.offsetHeight,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      scrub: true,
      pin: false,
      invalidateOnRefresh: true,
    },
  });
});

const parallaxText = gsap.utils.toArray(".parallax-text");

parallaxText.forEach((heading, index) => {
  gsap.to(heading, {
    yPercent: -50,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    ease: "none",
  });
});

gsap.to(".marquee-parallax", {
  yPercent: 10,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
  ease: "none",
});

const timelineSections = document.querySelectorAll(".timeline");
const totalSections = timelineSections.length;

gsap.to(".timeline", {
  xPercent:
    window.innerWidth < 700
      ? -(100 * (totalSections - 1) - 15)
      : -(100 * (totalSections - 1) - 25), // Calculate exact percentage based on number of sections
  ease: "none",
  scrollTrigger: {
    scroller: "body",
    trigger: "#timeline",
    scrub: 1.5,
    start: "top top",
    end: () => `+=${100 * totalSections}%`, // Dynamic end point based on number of sections
    pin: true,
    anticipatePin: 1,
  },
});

// Initialize Project Swiper
const projectSwiper = new Swiper('.project-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true, // Adds dynamic bullets that grow/shrink
        dynamicMainBullets: 3 // Number of bullets to show before/after current
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        hideOnClick: true, // Hides navigation on click
        disabledClass: 'swiper-button-disabled',
        lockClass: 'swiper-button-lock'
    },
    keyboard: {
        enabled: true, // Enables keyboard navigation
        onlyInViewport: true
    },
    breakpoints: {
        640: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});

// Add navigation visibility toggle on hover

// About Me Section Animations
gsap.from(".about-header h2", {
  scrollTrigger: {
    trigger: window.innerWidth < 768 ? ".about-header" : "#about-us",
    start: () => window.innerWidth < 768 ? "top 90%" : "top 80%",
    end: () => window.innerWidth < 768 ? "top 30%" : "top 20%",
    scrub: 1,
    toggleActions: "play none none reverse"
  },
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "none"
});

gsap.from(".about-header .line", {
  scrollTrigger: {
    trigger: window.innerWidth < 768 ? ".about-header" : "#about-us",
    start: () => window.innerWidth < 768 ? "top 90%" : "top 80%",
    end: () => window.innerWidth < 768 ? "top 30%" : "top 20%",
    scrub: 1.2,
    toggleActions: "play none none reverse"
  },
  scaleX: 0,
  duration: 1,
  ease: "none"
});

gsap.from(".about-text p", {
  scrollTrigger: {
    trigger: window.innerWidth < 768 ? ".about-header" : "#about-us",
    start: () => window.innerWidth < 768 ? "top 90%" : "top 80%",
    end: () => window.innerWidth < 768 ? "top 30%" : "top 20%",
    scrub: 0.8,
    toggleActions: "play none none reverse"
  },
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "none"
});

gsap.from(".about-img", {
  scrollTrigger: {
    trigger: "#about-us",
    start: () => window.innerWidth < 768 ? "top 90%" : "top 80%",
    end: () => window.innerWidth < 768 ? "top 30%" : "top 20%",
    scrub: 1.5,
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  duration: 1,
  ease: "none"
});
