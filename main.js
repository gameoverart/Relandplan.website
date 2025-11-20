// 基本 Hero 進場動畫
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined") return;

  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroCta = document.querySelector(".hero-cta");

  if (heroTitle) {
    gsap.from(heroTitle, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
    });
  }

  if (heroSubtitle) {
    gsap.from(heroSubtitle, {
      y: 20,
      opacity: 0,
      delay: 0.15,
      duration: 0.9,
      ease: "power2.out",
    });
  }

  if (heroCta) {
    gsap.from(heroCta, {
      y: 20,
      opacity: 0,
      delay: 0.3,
      duration: 0.9,
      ease: "power2.out",
    });
  }

  // 滑動淡入：使用 IntersectionObserver + GSAP
  const fadeElems = document.querySelectorAll(".fade-in-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
          });
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  fadeElems.forEach((el) => observer.observe(el));

  // 浮動按鈕效果
  const floatButtons = document.querySelectorAll(".floating-btn");
  floatButtons.forEach((btn, i) => {
    gsap.to(btn, {
      y: -6,
      duration: 1.4,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      delay: i * 0.2,
    });
  });
});
