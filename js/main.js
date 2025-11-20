// 簡易 i18n 字典
const I18N = {
  zh: {
    navHome: "首頁",
    navAbout: "關於計畫",
    navTickets: "票券方案",
    navGuide: "導覽路線",
    navShop: "選物市集",
    navTeam: "團隊介紹",

    heroTitle: "長治，再被看見。",
    heroSubtitle:
      "ReLAND 再地計畫，以青年導覽 × 數位科技 × 地方品牌化為核心，<br />把導覽變成一種可以被購買、被收藏，也能創造地方改變的旅程。",
    heroCtaPrimary: "預約導覽體驗",
    heroCtaSecondary: "了解計畫理念",

    mediaTitle: "導覽紀錄與影音",

    aboutTitle: "關於 ReLAND 再地計畫",
    aboutIntro:
      "ReLAND 以「重新降落在土地上」為意象，結合青年導覽、地方故事與數位工具，讓長治不再只是被路過的鄉鎮，而是值得專程前來、細細停留的地方。",

    teamTitle: "ReLAND 團隊介紹",
    teamIntro:
      "ReLAND 是由一群關心土地、熱愛設計與文化的青年所組成。我們相信，導覽不只是帶路，而是把地方的故事重新整理、說給更多人聽。",
    teamVtuberTitle: "虛擬導覽員 · 團隊成員之一",
    teamVtuberIntro:
      "除了線下導覽夥伴，虛擬導覽員田田也會在線上內容與未來互動系統中，作為 ReLAND 的另一個「說故事的出口」。",
  },

  en: {
    navHome: "Home",
    navAbout: "About",
    navTickets: "Tickets",
    navGuide: "Guide",
    navShop: "Shop",
    navTeam: "Team",

    heroTitle: "Changzhi, seen again.",
    heroSubtitle:
      "ReLAND is a youth-led local project that blends guided tours, digital tools, and local branding,<br />turning every journey into a story you can keep and share.",
    heroCtaPrimary: "Book a Tour",
    heroCtaSecondary: "Learn More",

    mediaTitle: "Tour Highlights & Media",

    aboutTitle: "About ReLAND",
    aboutIntro:
      "ReLAND stands for “re-landing” on the land. By combining youth-led tours, local storytelling, and digital tools, we invite people to pause, stay, and truly experience Changzhi.",

    teamTitle: "ReLAND Team",
    teamIntro:
      "ReLAND is formed by young people who care about land, design, and culture. We believe guiding is not just leading the way, but retelling local stories in a way people can connect with.",
    teamVtuberTitle: "Virtual Guide · Part of the Team",
    teamVtuberIntro:
      "Beyond on-site guides, our virtual guide Tien-Tien appears in online content and future interactive systems, becoming another storytelling channel for ReLAND.",
  },
};

function applyLang(lang) {
  const dict = I18N[lang];
  if (!dict) return;

  document.documentElement.setAttribute(
    "lang",
    lang === "zh" ? "zh-Hant" : "en"
  );

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!dict[key]) return;
    const value = dict[key];

    if (value.includes("<br")) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  localStorage.setItem("reland-lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  // 語系初始化
  const savedLang = localStorage.getItem("reland-lang") || "zh";
  applyLang(savedLang);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      applyLang(lang);
    });
  });

  // GSAP Hero 進場
  if (typeof gsap !== "undefined") {
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
  }

  // IntersectionObserver + GSAP：滑動淡入
  const fadeElems = document.querySelectorAll(".fade-in-up");
  if (typeof IntersectionObserver !== "undefined" && typeof gsap !== "undefined") {
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
  } else {
    fadeElems.forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    });
  }

  // 浮動按鈕效果
  if (typeof gsap !== "undefined") {
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
  }

  // === 漢堡選單 ===
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    });

    // 點 mobile menu 裡面的連結就關閉選單
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      });
    });
  }
});
