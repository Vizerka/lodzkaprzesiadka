window.addEventListener("load", () => {
    const intro = document.getElementById("intro-brick");
    const content = document.getElementById("site-content");

    if (intro && content) {
        setTimeout(() => {
            intro.classList.add("hide");
            content.classList.add("show");
        }, 1500);
    }

    const header = document.querySelector(".site-header");
    const heroCard = document.querySelector(".hero .container.hero-content");

    if (!header || !heroCard) return;

    const updateHeaderStickyness = () => {
        const rect = heroCard.getBoundingClientRect();
        const headerHeight = header.offsetHeight || 0;

        if (rect.top <= headerHeight) {
            header.classList.add("unstuck");
        } else {
            header.classList.remove("unstuck");
        }
    };

    updateHeaderStickyness();

    window.addEventListener("scroll", updateHeaderStickyness, { passive: true });
});
//o kurwa działa xD