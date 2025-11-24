// 漢堡選單開關
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    navToggle.classList.toggle("active");
  });

  // 點連結後自動收合（手機）
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.classList.remove("active");
    });
  });
}

// 子選單開關（主要給手機用）
const navSubParents = document.querySelectorAll(".nav-item.has-sub .nav-parent");

navSubParents.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const item = btn.closest(".nav-item");
    const isOpen = item.classList.contains("open");

    // 一次只開一個
    document.querySelectorAll(".nav-item.has-sub.open").forEach((i) => {
      i.classList.remove("open");
    });

    if (!isOpen) {
      item.classList.add("open");
    }
  });
});

// footer 年份
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// 語言切換：中 / EN / 日
const langSwitch = document.getElementById("langSwitch");
const bodyEl = document.body;

function applyLang(lang) {
  if (lang === "en") {
    bodyEl.classList.remove("lang-zh", "lang-ja");
    bodyEl.classList.add("lang-en");
  } else if (lang === "ja") {
    bodyEl.classList.remove("lang-zh", "lang-en");
    bodyEl.classList.add("lang-ja");
  } else {
    bodyEl.classList.remove("lang-en", "lang-ja");
    bodyEl.classList.add("lang-zh");
  }

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  try {
    localStorage.setItem("serein-lang", lang);
  } catch (e) {
    // ignore
  }
}

// 初始語言
let initialLang = "zh";
try {
  const saved = localStorage.getItem("serein-lang");
  if (saved === "en" || saved === "zh" || saved === "ja") {
    initialLang = saved;
  }
} catch (e) {}
applyLang(initialLang);

if (langSwitch) {
  langSwitch.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      applyLang(lang);
    });
  });
}
// Team page：成員經歷顯示更多 / 收起
const memberToggles = document.querySelectorAll(".member-toggle");

memberToggles.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".team-card");
    if (!card) return;
    card.classList.toggle("expanded");
  });
});
