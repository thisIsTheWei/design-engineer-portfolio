function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function updateActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a');

  let currentSectionId = '';

  sections.forEach((section) => {
    const sectionElement = section as HTMLElement;
    const sectionTop = sectionElement.offsetTop;
    const sectionHeight = sectionElement.clientHeight;
    if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `/#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
}

export function initScrollNavHighlight() {
  const debouncedUpdateActiveSection = debounce(updateActiveSection, 100);
  window.addEventListener('scroll', debouncedUpdateActiveSection);
  window.addEventListener('resize', debouncedUpdateActiveSection);

  // Initial call to set the active section on page load
  updateActiveSection();

  console.log('Scroll nav highlight initialized');
}