export function setupNavigation() {
  const navToggle = document.querySelector('[aria-controls="primary-nav"]');
  const navOverlay = document.querySelector('.nav-overlay');

  function toggleNav() {
    const currentState = navToggle?.getAttribute('aria-expanded');
    navToggle?.setAttribute('aria-expanded', currentState === 'false' ? 'true' : 'false');
    navOverlay?.classList.toggle('show');
    document.body.classList.toggle('menu-open');
  }

  function closeNav() {
    navToggle?.setAttribute('aria-expanded', 'false');
    navOverlay?.classList.remove('show');
    document.body.classList.remove('menu-open');
  }

  navToggle?.addEventListener('click', toggleNav);

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-overlay a');
  navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });
}
