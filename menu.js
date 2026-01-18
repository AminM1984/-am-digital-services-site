const toggle = document.querySelector('.menu-toggle');
const backdrop = document.querySelector('.menu-backdrop');
const menuLinks = document.querySelectorAll('.site-menu a');

const closeMenu = () => {
  document.body.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false');
};

toggle.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

backdrop.addEventListener('click', closeMenu);
menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
