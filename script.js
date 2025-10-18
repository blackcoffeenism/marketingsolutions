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

// Dynamic fade based on visibility percentage (items only)
(function() {
  const targets = document.querySelectorAll('.card, .project');
  if (!('IntersectionObserver' in window) || targets.length === 0) return;
  const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const r = Math.max(0, Math.min(1, entry.intersectionRatio || 0));
      entry.target.style.opacity = r.toFixed(3);
    });
  }, { threshold: thresholds });
  targets.forEach(el => io.observe(el));
})();

// Contact form handler (mailto to owner)
(function() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = (document.getElementById('name')?.value || '').trim();
    const email = (document.getElementById('email')?.value || '').trim();
    const message = (document.getElementById('message')?.value || '').trim();

    const btn = this.querySelector('button[type="submit"]');
    const prev = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Opening email...'; }

    const to = 'delimagerald9@gmail.com';
    const subject = `New contact from ${name || 'Website Visitor'} - 1infinity Marketing Solutions`;
    const bodyPlain = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyPlain)}`;

    // Open the user's email client with prefilled content
    window.location.href = mailto;

    const info = document.getElementById('formMessage');
    if (info) {
      info.textContent = 'Your email app should open with your message. If it does not, please email us at delimagerald9@gmail.com.';
    }

    // Restore button state shortly after
    setTimeout(() => { if (btn) { btn.disabled = false; btn.textContent = prev; } }, 800);
  });
})();

// Theme toggle
(function() {
  const root = document.documentElement;
  const storageKey = 'ms-theme';
  const saved = localStorage.getItem(storageKey);
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  // Initialize aria-pressed to reflect current theme
  const initial = root.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  btn.setAttribute('aria-pressed', initial === 'light' ? 'true' : 'false');
  btn.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      root.classList.add('theme-anim');
      setTimeout(() => root.classList.remove('theme-anim'), 320);
    }
    const current = root.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem(storageKey, next);
    btn.setAttribute('aria-pressed', next === 'light' ? 'true' : 'false');
  });
})();

// Header remains visible (auto-hide disabled per request)

// Ensure header is never hidden: remove any accidental `.is-hidden` class and
// guard against scripts that might add it later. This is a lightweight, safe
// protection and won't interfere with other behaviors.
(function() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  // Remove immediately if present
  header.classList.remove('is-hidden');
  // Observe attribute changes on the header and remove the class if added
  try {
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          if (header.classList.contains('is-hidden')) {
            header.classList.remove('is-hidden');
          }
        }
      }
    });
    mo.observe(header, { attributes: true, attributeFilter: ['class'] });
  } catch (e) {
    // MutationObserver may not be available in some old environments; do nothing
    // (header was already cleaned above)
  }
})();
