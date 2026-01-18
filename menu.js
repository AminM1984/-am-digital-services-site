const toggle = document.querySelector('.nav-toggle');
const backdrop = document.querySelector('.menu-backdrop');
const navLinks = document.querySelectorAll('.site-nav a');

const closeMenu = () => {
  document.body.classList.remove('menu-open');
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
  }
};

if (toggle) {
  toggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

if (backdrop) {
  backdrop.addEventListener('click', closeMenu);
}

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
