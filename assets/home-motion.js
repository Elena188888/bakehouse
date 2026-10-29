const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;
let refreshFrame;

function isHomeRoute() {
  return !location.hash || location.hash === '#' || location.hash === '#/';
}

function clearMotion() {
  revealObserver?.disconnect();
  revealObserver = undefined;
  document.documentElement.classList.remove('bh-home-motion');
  document.querySelectorAll('.bh-reveal,.bh-visible,.bh-hero-motion,.bh-hero-item,.bh-title-line,.bh-motion-card,.bh-motion-image')
    .forEach(element => element.classList.remove('bh-reveal','bh-visible','bh-hero-motion','bh-hero-item','bh-title-line','bh-motion-card','bh-motion-image'));
}

function applyMotion() {
  cancelAnimationFrame(refreshFrame);
  refreshFrame = requestAnimationFrame(() => {
    if (!isHomeRoute()) {
      clearMotion();
      return;
    }

    const main = document.querySelector('main');
    const sections = main ? [...main.querySelectorAll('section')] : [];
    if (!sections.length) return;

    clearMotion();
    document.documentElement.classList.add('bh-home-motion');

    const hero = sections[0];
    hero.classList.add('bh-hero-motion');
    hero.querySelectorAll('h1,p,a').forEach((element, index) => {
      element.classList.add('bh-hero-item');
      element.style.setProperty('--bh-delay', `${Math.min(index, 4) * 90 + 80}ms`);
    });
    hero.querySelectorAll('h1 > span').forEach((line, index) => {
      line.classList.add('bh-title-line');
      line.style.setProperty('--bh-breath-delay', `${index * .42}s`);
    });
    hero.querySelectorAll('img').forEach(image => image.classList.add('bh-motion-image'));

    sections.slice(1).forEach((section, index) => {
      section.classList.add('bh-reveal');
      section.style.setProperty('--bh-section-delay', `${Math.min(index, 3) * 35}ms`);
    });

    main.querySelectorAll('a').forEach(link => {
      if (link.querySelector('h3')) link.classList.add('bh-motion-card');
    });

    if (reduceMotion.matches) {
      sections.forEach(section => section.classList.add('bh-visible'));
      return;
    }

    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('bh-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });

    sections.slice(1).forEach(section => revealObserver.observe(section));
  });
}

const rootObserver = new MutationObserver(() => applyMotion());
rootObserver.observe(document.getElementById('root'), { childList: true, subtree: true });
window.addEventListener('hashchange', applyMotion);
reduceMotion.addEventListener?.('change', applyMotion);
applyMotion();
