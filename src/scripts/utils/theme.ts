// Initialize theme
const initTheme = () => {
  const theme = (() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  })();

  if (theme === 'light') {
    document.documentElement.classList.remove('theme-dark');
  } else {
    document.documentElement.classList.add('theme-dark');
  }

  localStorage.setItem('theme', theme || 'light');
};

// Toggle theme
const toggleTheme = () => {
  const element = document.documentElement;
  element.classList.toggle("theme-dark");

  const isDark = element.classList.contains("theme-dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

export { initTheme, toggleTheme };