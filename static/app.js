// ======================
//  Bootstrap navbar: auto-close on link click (mobile)
// ======================
function initNav() {
  const collapseEl = document.getElementById("mainnav");
  if (!collapseEl) return;

  // bootstrap bundle defines window.bootstrap
  if (!window.bootstrap || !window.bootstrap.Collapse) return;

  const collapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });
  const toggler = document.querySelector(".navbar-toggler");

  const isMobile = () => toggler && window.getComputedStyle(toggler).display !== "none";

  collapseEl.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      if (isMobile()) collapse.hide();
    });
  });
}

// ======================
//  Sticky header (adds stronger shadow after hero scrolls under it)
// ======================
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  const heroPanel = document.querySelector(".hero .lp-panel");
  if (!header || !heroPanel) return;

  const update = () => {
    const rect = heroPanel.getBoundingClientRect();
    const headerHeight = header.offsetHeight || 0;
    if (rect.top <= headerHeight) header.classList.add("unstuck");
    else header.classList.remove("unstuck");
  };

  update();

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

// ======================
//  Intro fade (index only)
// ======================
function initIntro() {
  const intro = document.getElementById("intro-brick");
  const content = document.getElementById("site-content");
  if (!content) return;

  // Brak intro elementu = po prostu pokaż content
  if (!intro) {
    content.classList.add("show");
    return;
  }

  const isSameOriginReferrer = (() => {
    try {
      if (!document.referrer) return false; // traktujemy jako "zewnętrzne/nieznane"
      const ref = new URL(document.referrer);
      return ref.origin === window.location.origin;
    } catch {
      return false;
    }
  })();

  // Pokaż intro tylko przy wejściu "z zewnątrz/nieznanym" i tylko raz na sesję
  const alreadyShown = sessionStorage.getItem("lp_intro_shown") === "1";
  const shouldShow = !isSameOriginReferrer && !alreadyShown;

  if (!shouldShow) {
    // bez intro
    intro.classList.add("hide");
    content.classList.add("show");
    return;
  }

  sessionStorage.setItem("lp_intro_shown", "1");

  // normalne intro
  setTimeout(() => {
    intro.classList.add("hide");
    content.classList.add("show");
  }, 1500);
}

// ======================
//  Countdown (index only)
// ======================
function startCountdown() {
  const target = new Date("2026-05-30T10:00:00+02:00");

  const elDays = document.getElementById("cd-days");
  const elHours = document.getElementById("cd-hours");
  const elMins = document.getElementById("cd-mins");
  const elSecs = document.getElementById("cd-secs");
  const elSub = document.getElementById("cd-sub");

  if (!elDays || !elHours || !elMins || !elSecs) return;

  const pad2 = (n) => String(n).padStart(2, "0");

  function tick() {
    const now = new Date();
    let diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      elDays.textContent = "0";
      elHours.textContent = "00";
      elMins.textContent = "00";
      elSecs.textContent = "00";
      if (elSub) elSub.textContent = "Zaczynamy.";
      return;
    }

    const sec = Math.floor(diff / 1000);
    const days = Math.floor(sec / 86400);
    const hours = Math.floor((sec % 86400) / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    elDays.textContent = String(days);
    elHours.textContent = pad2(hours);
    elMins.textContent = pad2(mins);
    elSecs.textContent = pad2(secs);
  }

  tick();
  setInterval(tick, 1000);
}

// ======================
//  Copy-to-clipboard buttons (kontakt)
// ======================
function initClipboardCopy() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(text);
        const old = btn.textContent;
        btn.textContent = "Skopiowane ✓";
        setTimeout(() => (btn.textContent = old), 1200);
      } catch (e) {
        alert("Nie mogę skopiować automatycznie — skopiuj ręcznie: " + text);
      }
    });
  });
}

// ======================
//  Boot
// ======================
window.addEventListener("load", () => {
  initIntro();
  initNav();
  initStickyHeader();
});

document.addEventListener("DOMContentLoaded", () => {
  startCountdown();
  initClipboardCopy();
});
