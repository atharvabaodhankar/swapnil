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
      }
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
      }
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
      ease: "power2.in"
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
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
        });
        // Reset menu items position
        gsap.set(".link, .social", {
          clearProps: "all"
        });
        isAnimating = false;
      }
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

gsap.utils.toArray(".parallax-img-container").forEach(function(container) {
  let image = container.querySelector("img");

    gsap.to(image, {
      y: () => image.offsetHeight - container.offsetHeight,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        scrub: true,
        pin: false,
        markers: true,
        invalidateOnRefresh: true
      },
    }); 
});

// Split Text

