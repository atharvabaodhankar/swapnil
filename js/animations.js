// GSAP Scroll Animations with Scrub Effect
document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Initialize Lenis for smooth scrolling if not already initialized
  if (typeof lenis === 'undefined') {
    const lenis = new Lenis({
      lerp: 0.05,
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
  }
  
  // ===== SKILLS SECTION ANIMATIONS =====
  function initSkillsAnimations() {
    // Animate skills header
    gsap.fromTo(".skills-header h2", 
      { 
        y: 50, 
        opacity: 0 
      }, 
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".skills-header",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate skill categories with stagger
    gsap.fromTo(".skill-category", 
      { 
        y: 100, 
        opacity: 0 
      }, 
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: ".skills-container",
          start: "top 80%",
          end: "top 40%",
          scrub: 1.5,
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate individual skill items with a nice cascade effect
    gsap.utils.toArray(".skill-category").forEach((category, index) => {
      const items = category.querySelectorAll(".skill-item, .skill-badge");
      
      gsap.fromTo(items, 
        { 
          x: -30, 
          opacity: 0 
        }, 
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: {
            trigger: category,
            start: "top 75%",
            end: "top 45%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }
  
  // ===== EDUCATION SECTION ANIMATIONS =====
  function initEducationAnimations() {
    // Animate education header
    gsap.fromTo(".education-header h2", 
      { 
        y: 50, 
        opacity: 0 
      }, 
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".education-header",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate education items
    gsap.utils.toArray(".education-item").forEach((item, index) => {
      // Animate the entire item
      gsap.fromTo(item, 
        { 
          y: 100, 
          opacity: 0 
        }, 
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 55%",
            scrub: 1.2,
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Animate the education logo
      gsap.fromTo(item.querySelector(".education-logo"), 
        { 
          opacity: 0 
        }, 
        {
          opacity: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Animate the education text elements
      const textElements = item.querySelectorAll(".education-text h3, .education-text h4, .education-text p");
      
      gsap.fromTo(textElements, 
        { 
          y: 30, 
          opacity: 0 
        }, 
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            end: "top 45%",
            scrub: 1.5,
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }
  
  // ===== CERTIFICATIONS SECTION ANIMATIONS =====
  function initCertificationsAnimations() {
    // Animate certifications header
    gsap.fromTo(".certifications-header h2", 
      { 
        y: 50, 
        opacity: 0 
      }, 
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".certifications-header",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate certification categories with stagger and different entrance directions
    gsap.utils.toArray(".cert-category").forEach((category, index) => {
      // Alternate entrance directions based on index
      const xOffset = index % 2 === 0 ? -50 : 50;
      
      // Animate the category heading
      gsap.fromTo(category.querySelector("h3"), 
        { 
          x: xOffset, 
          opacity: 0
        }, 
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: category,
            start: "top 85%",
            end: "top 65%",
            scrub: 1.2,
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Animate the icon in the heading with a rotation effect
      gsap.fromTo(category.querySelector("h3 i"), 
        { 
          rotation: -30,
          opacity: 0.5
        }, 
        {
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: category,
            start: "top 85%",
            end: "top 65%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Animate certification items with a staggered entrance
      const items = category.querySelectorAll(".cert-item");
      
      gsap.fromTo(items, 
        { 
          y: 80, 
          opacity: 0
        }, 
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          scrollTrigger: {
            trigger: category,
            start: "top 80%",
            end: "top 40%",
            scrub: 1.5,
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Animate the certification icons
      items.forEach((item) => {
        const icon = item.querySelector(".cert-icon i");
        
        gsap.fromTo(icon, 
          { 
            opacity: 0,
            rotation: -45
          }, 
          {
            opacity: 1,
            rotation: 0,
            duration: 1.2,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
              toggleActions: "play none none reverse"
            }
          }
        );
        
        // Animate the certification details with a staggered entrance
        const details = item.querySelectorAll(".cert-details h4, .cert-details p, .cert-details .endorsement");
        
        gsap.fromTo(details, 
          { 
            y: 20, 
            opacity: 0 
          }, 
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              end: "top 45%",
              scrub: 1.2,
              toggleActions: "play none none reverse"
            }
          }
        );
        
        // Add a special animation for the endorsement badge
        const endorsement = item.querySelector(".endorsement");
        if (endorsement) {
          gsap.fromTo(endorsement, 
            { 
              opacity: 0,
              x: -10
            }, 
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: item,
                start: "top 70%",
                end: "top 40%",
                scrub: 1,
                toggleActions: "play none none reverse"
              }
            }
          );
          
          // Add a subtle color change animation to the endorsement badges instead of scale
          gsap.to(endorsement, {
            color: "#4a90e2",
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              end: "bottom 20%",
              toggleActions: "play pause resume reset"
            }
          });
        }
      });
      
      // Add hover animations for certification items without scale
      items.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            y: -5,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            duration: 0.3
          });
          
          gsap.to(item.querySelector(".cert-icon i"), {
            rotation: 15,
            color: "#4a90e2",
            duration: 0.3
          });
        });
        
        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            y: 0,
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            duration: 0.3
          });
          
          gsap.to(item.querySelector(".cert-icon i"), {
            rotation: 0,
            color: "",
            duration: 0.3
          });
        });
      });
    });
    
    // Add a subtle parallax effect to the entire certifications container
    gsap.fromTo(".certifications-container", 
      {
        y: 30
      }, 
      {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: "#certifications",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          toggleActions: "play none none reverse"
        }
      }
    );
  }
  
  // ===== PROJECTS SECTION ANIMATIONS =====
  function initProjectsAnimations() {
    // Animate projects header
    gsap.fromTo(".projects-header h2", 
      { 
        y: 50, 
        opacity: 0 
      }, 
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate the project swiper container
    gsap.fromTo(".project-swiper", 
      { 
        y: 100, 
        opacity: 0 
      }, 
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: ".project-swiper",
          start: "top 80%",
          end: "top 40%",
          scrub: 1.5,
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate individual project slides when they come into view
    gsap.utils.toArray(".swiper-slide").forEach((slide) => {
      gsap.fromTo(slide, 
        { 
          opacity: 0.5,
          y: 30
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: slide,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Animate project content elements
      const contentElements = slide.querySelectorAll(".project-title, .project-description, .project-tech, .project-links");
      
      gsap.fromTo(contentElements, 
        { 
          y: 30, 
          opacity: 0 
        }, 
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: slide,
            start: "top 75%",
            end: "top 45%",
            scrub: 1.2,
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }
  
  // ===== CONTACT SECTION ANIMATIONS =====
  function initContactAnimations() {
    // Animate contact header
    gsap.fromTo(".contact-header h2", 
      { 
        y: 50, 
        opacity: 0 
      }, 
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".contact-header",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate the gradient text in the header separately for a special effect
    gsap.fromTo(".contact-header .gradient-text", 
      { 
        backgroundPosition: "0% 50%" 
      }, 
      {
        backgroundPosition: "100% 50%",
        duration: 2,
        scrollTrigger: {
          trigger: ".contact-header",
          start: "top 80%",
          end: "bottom 50%",
          scrub: 2,
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate contact form
    gsap.fromTo(".contact-form", 
      { 
        y: 100, 
        opacity: 0 
      }, 
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
          end: "top 40%",
          scrub: 1.5,
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate form inputs with stagger
    const formElements = document.querySelectorAll(".input-wrapper");
    
    gsap.fromTo(formElements, 
      { 
        y: 50, 
        opacity: 0 
      }, 
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 75%",
          end: "top 45%",
          scrub: 1.2,
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate submit button with a special effect
    gsap.fromTo(".submit-btn", 
      { 
        opacity: 0 
      }, 
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".submit-btn",
          start: "top 85%",
          end: "top 65%",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate contact info section
    gsap.fromTo(".contact-info", 
      { 
        x: 50, 
        opacity: 0 
      }, 
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 80%",
          end: "top 50%",
          scrub: 1.5,
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate contact info items with stagger
    const infoItems = document.querySelectorAll(".contact-info-item");
    
    gsap.fromTo(infoItems, 
      { 
        y: 30, 
        opacity: 0 
      }, 
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 75%",
          end: "top 45%",
          scrub: 1.2,
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animate social links with a special hover effect
    const socialLinks = document.querySelectorAll(".social-link");
    
    gsap.fromTo(socialLinks, 
      { 
        opacity: 0 
      }, 
      {
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".social-links",
          start: "top 85%",
          end: "top 65%",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      }
    );
  }
  
  // ===== FOOTER ANIMATIONS =====
  function initFooterAnimations() {
    // Animate the remaining wave with a subtle effect
    gsap.fromTo("#wave1", 
      {
        opacity: 0.5,
        scale: 0.95
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: ".footer",
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate footer brand heading with a slide-up effect
    gsap.fromTo(".footer-brand h3", 
      {
        y: 25, 
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        scrollTrigger: {
          trigger: ".footer-content",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate footer brand paragraph with a fade-in effect
    gsap.fromTo(".footer-brand p", 
      {
        y: 15, 
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: ".footer-content",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate footer links headings with a fade-in effect
    gsap.fromTo(".footer-links h4", 
      {
        y: 15, 
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        scrollTrigger: {
          trigger: ".footer-links",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate footer links list items with a staggered entrance
    const footerLinks = document.querySelectorAll(".footer-links ul li");
    gsap.fromTo(footerLinks, 
      {
        x: -15,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".footer-links",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Add a subtle hover effect to footer links
    footerLinks.forEach(link => {
      const anchor = link.querySelector('a');
      const icon = link.querySelector('i');
      
      link.addEventListener("mouseenter", () => {
        gsap.to(anchor, {
          color: "#4a90e2",
          duration: 0.3
        });
        gsap.to(icon, {
          x: 3,
          color: "#4a90e2",
          duration: 0.3
        });
      });
      
      link.addEventListener("mouseleave", () => {
        gsap.to(anchor, {
          color: "",
          duration: 0.3
        });
        gsap.to(icon, {
          x: 0,
          color: "",
          duration: 0.3
        });
      });
    });
    
    // Animate copyright text with a simple fade-in
    gsap.fromTo(".footer-bottom p", 
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".footer-bottom",
          start: "top 95%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate social icons with a staggered fade-in
    const socialIcons = document.querySelectorAll(".footer-social a");
    gsap.fromTo(socialIcons, 
      {
        y: 10,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".footer-social",
          start: "top 95%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Add hover effect to social icons
    socialIcons.forEach(icon => {
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          y: -3,
          color: "#4a90e2",
          duration: 0.3
        });
      });
      
      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          y: 0,
          color: "",
          duration: 0.3
        });
      });
    });
  }
  
  // Initialize all section animations
  initSkillsAnimations();
  initEducationAnimations();
  initCertificationsAnimations();
  initProjectsAnimations();
  initContactAnimations();
  initFooterAnimations();
});