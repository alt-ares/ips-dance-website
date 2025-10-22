import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hero split text animation with skew effect
 */
export function heroSplitText(
  element: HTMLElement | string,
  onComplete?: () => void
) {
  const chars = gsap.utils.toArray(
    `${typeof element === "string" ? element : ""} .char`
  );

  return gsap.from(chars, {
    duration: 1.2,
    opacity: 0,
    y: 100,
    rotationX: -90,
    skewX: 5,
    transformOrigin: "0% 50% -50",
    ease: "expo.out",
    stagger: 0.03,
    onComplete,
  });
}

/**
 * Scroll reveal animation with stagger
 */
export function scrollReveal(
  elements: HTMLElement[] | string,
  stagger: number = 0.04
) {
  const elementList = gsap.utils.toArray<HTMLElement>(elements);
  
  elementList.forEach((element, index) => {
    // Set initial state
    gsap.set(element, { opacity: 0, y: 60 });
    
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * stagger,
      ease: "power3.out",
    });
  });
}

/**
 * Parallax effect for images (8% movement)
 */
export function parallaxImages(selector: string) {
  const images = gsap.utils.toArray<HTMLElement>(selector);

  images.forEach((image) => {
    gsap.to(image, {
      scrollTrigger: {
        trigger: image,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      y: "-8%",
      ease: "none",
    });
  });
}

/**
 * Pin section during scroll
 */
export function pinSection(
  trigger: HTMLElement | string,
  duration?: number
) {
  return ScrollTrigger.create({
    trigger,
    start: "top top",
    end: duration ? `+=${duration}` : "bottom bottom",
    pin: true,
    pinSpacing: true,
  });
}

/**
 * Liquid card hover animation with tilt and glow
 */
export function liquidCardHover(card: HTMLElement) {
  const inner = card.querySelector(".liquid-inner");

  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });
    
    if (inner) {
      gsap.to(inner, {
        boxShadow: "0 0 30px rgba(232, 80, 2, 0.3)",
        duration: 0.3,
      });
    }
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    
    if (inner) {
      gsap.to(inner, {
        boxShadow: "0 0 0px rgba(232, 80, 2, 0)",
        duration: 0.3,
      });
    }
  });

  // Tilt effect
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });
}

/**
 * Show tile hover with gradient wipe - GPU optimized
 */
export function showTileHover(tile: HTMLElement) {
  const overlay = tile.querySelector(".tile-overlay");
  const content = tile.querySelector(".tile-content");

  // Set initial GPU acceleration
  gsap.set([overlay, content], {
    force3D: true,
    willChange: "transform, opacity"
  });

  tile.addEventListener("mouseenter", () => {
    if (overlay) {
      gsap.to(overlay, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.4,
        ease: "power2.out",
        force3D: true,
      });
    }
    
    if (content) {
      gsap.to(content, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        force3D: true,
      });
    }
  });

  tile.addEventListener("mouseleave", () => {
    if (overlay) {
      gsap.to(overlay, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.4,
        ease: "power2.out",
        force3D: true,
      });
    }
    
    if (content) {
      gsap.to(content, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        force3D: true,
      });
    }
  });
}

/**
 * Anchor transition with orange overlay
 */
export function anchorTransition(callback: () => void) {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: linear-gradient(120deg, #E85002 0%, #F16001 100%);
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
  `;
  
  // Add noise texture
  overlay.style.backgroundImage = `
    linear-gradient(120deg, #E85002 0%, #F16001 100%),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
  `;
  overlay.style.backgroundBlendMode = "overlay";

  document.body.appendChild(overlay);

  const tl = gsap.timeline({
    onComplete: () => {
      overlay.remove();
    },
  });

  tl.to(overlay, {
    opacity: 1,
    duration: 0.15,
    ease: "power2.in",
  })
    .call(callback)
    .to(overlay, {
      opacity: 0,
      duration: 0.15,
      ease: "power2.out",
    });
}

/**
 * Orange banner sweep animation
 */
export function orangeBannerSweep(banner: HTMLElement) {
  return gsap.fromTo(
    banner,
    {
      clipPath: "inset(0% 100% 0% 0%)",
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.5,
      ease: "power3.inOut",
      delay: 0.5,
    }
  );
}

/**
 * Counter animation
 */
export function animateCounter(
  element: HTMLElement,
  start: number,
  end: number,
  duration: number = 2
) {
  const obj = { val: start };
  
  return gsap.to(obj, {
    val: end,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.round(obj.val).toString();
    },
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}

/**
 * Stagger fade in
 */
export function staggerFadeIn(elements: HTMLElement[] | string, delay: number = 0) {
  const elementList = gsap.utils.toArray<HTMLElement>(elements);
  
  elementList.forEach((element, index) => {
    // Set initial state
    gsap.set(element, { opacity: 0, y: 30 });
    
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: delay + (index * 0.1),
      ease: "power2.out",
    });
  });
}

