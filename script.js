/* ============================================
   HomeProMarketer.com — Global JS
   ============================================ */

/* --- Mobile Nav Toggle --- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const expanded = mobileNav.classList.contains('open');
    hamburger.setAttribute('aria-expanded', expanded);
  });
}

/* --- Active Nav Link --- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* --- Toast Notification --- */
function showToast(message, duration = 4000) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* --- Email Capture Form --- */
const emailForm = document.getElementById('emailCaptureForm');
if (emailForm) {
  emailForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = emailForm.querySelector('input[type="email"]').value;
    if (!email) return;
    // Simulate submission
    const btn = emailForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Sent! Check Your Inbox';
      btn.style.background = '#16a34a';
      showToast('🎉 Your free toolkit is on its way! Check your email.');
    }, 1200);
  });
}

/* --- Contact Form --- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#16a34a';
      contactForm.reset();
      showToast('Thanks! We\'ll get back to you within 24 hours.');
    }, 1200);
  });
}

/* --- Smooth scroll for anchor links --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (mobileNav) mobileNav.classList.remove('open');
    }
  });
});

/* --- Intersection Observer: fade-in on scroll --- */
const fadeEls = document.querySelectorAll(
  '.feature-card, .product-card, .testimonial-card, .stat-box, .step-card, .mock-card'
);
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    io.observe(el);
  });
}

/* --- Animated counter (stats) --- */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const isDecimal = el.dataset.count.includes('.');
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();
  const update = now => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

if ('IntersectionObserver' in window) {
  const countEls = document.querySelectorAll('[data-count]');
  const counterIO = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  countEls.forEach(el => counterIO.observe(el));
}
