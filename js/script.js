document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', function() {
      siteNav.classList.toggle('active');
      this.textContent = siteNav.classList.contains('active') ? '✕' : '☰';
    });

    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        siteNav.classList.remove('active');
        if (menuToggle) menuToggle.textContent = '☰';
      });
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.work-item, .news-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});
