const observerOptions = {
  root: null,
  rootMargin: '0px 0px -30% 0px',
  threshold: 0.01
};

export function setupFadeInObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in--visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in:not(.fade-in--visible)');
  fadeElements.forEach((el) => observer.observe(el));

  return observer;
}