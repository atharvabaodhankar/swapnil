// Preloader Animation
document.addEventListener("DOMContentLoaded", () => {
  // Initialize GSAP timeline for preloader
  const preloaderTl = gsap.timeline();
  
  // Animate logo letters appearance
  preloaderTl.to(".logo-letter", {
    opacity: 1,
    y: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out"
  });
  
  // Animate logo letter underlines
  preloaderTl.to(".logo-letter::after", {
    width: "100%",
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  }, "-=0.5");
  
  // Animate text appearance
  preloaderTl.to(".preloader-text", {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    onComplete: () => {
      // Start glitch effect after text appears
      glitchEffect();
    }
  }, "-=0.5");
  
  // Function to create glitch effect
  function glitchEffect() {
    // Glitch the main text
    gsap.to(".preloader-text", {
      skewX: 2,
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: "power4.inOut"
    });
    
    // Show and animate the pseudo-elements
    gsap.to(".preloader-text::before", {
      opacity: 0.8,
      duration: 0.1,
      transform: "translate(-5px, 0)",
      repeat: 5,
      yoyo: true
    });
    
    gsap.to(".preloader-text::after", {
      opacity: 0.8,
      duration: 0.1,
      transform: "translate(5px, 0)",
      repeat: 5,
      yoyo: true
    });
    
    // Repeat the glitch effect randomly
    const delay = 2 + Math.random() * 3;
    gsap.delayedCall(delay, glitchEffect);
  }
  
  // Animate dots
  preloaderTl.to(".dot", {
    opacity: 0.8,
    scale: 1.2,
    stagger: {
      each: 0.2,
      repeat: -1,
      yoyo: true
    },
    duration: 0.6,
    ease: "power2.inOut"
  }, "<");
  
  // Animate shapes
  preloaderTl.to(".preloader-shape", {
    scale: 1.2,
    opacity: 0.2,
    stagger: 0.2,
    duration: 1.5,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true
  }, "<");
  
  // Counter and progress bar animation
  let counter = { value: 0 };
  const counterElement = document.querySelector(".preloader-counter");
  const progressBar = document.querySelector(".preloader-progress-bar");
  
  preloaderTl.to(counter, {
    value: 100,
    duration: 3,
    ease: "power2.inOut",
    onUpdate: () => {
      const value = Math.round(counter.value);
      counterElement.textContent = `${value}%`;
      progressBar.style.width = `${value}%`;
    }
  }, "<0.5");
  
  // Final animation to hide preloader
  preloaderTl.to(".preloader-content > *", {
    opacity: 0,
    y: -20,
    stagger: 0.1,
    duration: 0.8,
    ease: "power3.in"
  });
  
  // Create a reveal effect for the main content
  preloaderTl.to(".preloader", {
    y: "-100%",
    duration: 1.2,
    ease: "power4.inOut",
    onComplete: () => {
      // Enable scrolling and other interactions after preloader is gone
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden"; // Ensure horizontal scrolling stays disabled
      
      // Remove preloader from DOM after animation completes
      setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
      }, 300);
      
      // Initialize the rest of the page animations
      initPageAnimations();
    }
  });
  
  // Prevent scrolling during preloader
  document.body.style.overflow = "hidden";
});

// Function to initialize page animations after preloader
function initPageAnimations() {
  // Initialize Lenis smooth scrolling
  initLenis();
  
  // Add any other initialization code here
  // This ensures animations start after preloader is complete
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

function marquee() {
  let currentScroll = 0;
  let isScrollingDown = true;
  let arrows = document.querySelectorAll(".arrow");

  let tween = gsap
    .to(".marquee_part", {
      xPercent: -100,
      repeat: -1,
      duration: 10,
      ease: "linear",
    })
    .totalProgress(0.5);
  gsap.set(".marquee_inner", { xPercent: -50 });

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > currentScroll) {
      isScrollingDown = true;
    } else {
      isScrollingDown = false;
    }
    gsap.to(tween, {
      timeScale: isScrollingDown ? 1 : -1,
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
}
marquee();

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
    scrub: true,
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



