/* Peak Scale — minimal client JS.
   Mobile menu toggle, testimonial carousel (chevrons + dots). */

(function () {
  'use strict';

  // ---------- Mobile menu ----------
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const menuClose = document.querySelector('[data-menu-close]');

  function openMenu() {
    if (!menu) return;
    menu.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    const firstLink = menu.querySelector('a');
    if (firstLink) firstLink.focus();
  }
  function closeMenu() {
    if (!menu) return;
    menu.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (menuToggle) menuToggle.focus();
  }

  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && !menu.hasAttribute('hidden')) closeMenu();
  });

  // ---------- Testimonial carousel ----------
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    const slides = carousel.querySelectorAll('[data-slide]');
    const dotsWrap = carousel.querySelector('[data-dots]');
    const prevBtn = carousel.querySelector('[data-prev]');
    const nextBtn = carousel.querySelector('[data-next]');
    if (slides.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (dotsWrap) dotsWrap.style.display = 'none';
      return;
    }

    let active = 0;
    function go(i) {
      active = (i + slides.length) % slides.length;
      slides.forEach(function (s, idx) {
        s.style.display = idx === active ? '' : 'none';
      });
      if (dotsWrap) {
        dotsWrap.querySelectorAll('button').forEach(function (b, idx) {
          b.classList.toggle('is-active', idx === active);
        });
      }
    }
    if (dotsWrap) {
      slides.forEach(function (_, idx) {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Slide ' + (idx + 1));
        if (idx === 0) b.classList.add('is-active');
        b.addEventListener('click', function () { go(idx); });
        dotsWrap.appendChild(b);
      });
    }
    if (prevBtn) prevBtn.addEventListener('click', function () { go(active - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(active + 1); });
    slides.forEach(function (s, idx) { if (idx !== 0) s.style.display = 'none'; });
  });
})();
