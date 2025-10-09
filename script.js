// Mobile nav toggle
(function() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
    // Close menu when a link is clicked (mobile UX)
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }
})();

// Reveal on scroll
(function() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
})();

// Contact form handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  // Simulate form submission UX
  const btn = this.querySelector('button[type="submit"]');
  const prev = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Sending…';
  setTimeout(() => {
    document.getElementById('formMessage').textContent = `Thank you, ${name}! We have received your message.`;
    this.reset();
    btn.disabled = false;
    btn.textContent = prev;
  }, 600);
});

// (copy button block removed — no code cards on page)

// Theme toggle
(function() {
  const root = document.documentElement;
  const storageKey = 'ms-theme';
  const saved = localStorage.getItem(storageKey);
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem(storageKey, next);
  });
})();
