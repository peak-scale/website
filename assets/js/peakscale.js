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

  // ---------- Logo carousel (transform-based slider, prev/next + auto-advance) ----------
  document.querySelectorAll('[data-logo-carousel]').forEach(function (carousel) {
    const track = carousel.querySelector('[data-logo-track]');
    const viewport = carousel.querySelector('.logo-carousel__viewport');
    const prev = carousel.querySelector('[data-logo-prev]');
    const next = carousel.querySelector('[data-logo-next]');
    if (!track || !viewport) return;

    let offset = 0;

    function tileStep() {
      const tile = track.querySelector('.logo-tile');
      if (!tile) return 216;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      return tile.getBoundingClientRect().width + gap;
    }
    function maxOffset() {
      return Math.max(0, track.scrollWidth - viewport.clientWidth);
    }
    function apply() {
      track.style.transform = 'translateX(-' + offset + 'px)';
    }
    function nudge(dir) {
      const step = tileStep();
      const max = maxOffset();
      offset += dir * step;
      // Wrap at edges
      if (offset > max) offset = 0;
      else if (offset < 0) offset = max;
      apply();
    }

    if (prev) prev.addEventListener('click', function () { nudge(-1); });
    if (next) next.addEventListener('click', function () { nudge(1); });

    // Auto-advance, paused on hover / focus / reduced motion.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer = null;
    function start() { if (!timer && !reduced) timer = setInterval(function () { nudge(1); }, 3500); }
    function stop()  { if (timer) { clearInterval(timer); timer = null; } }
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);
    // Re-clamp on resize
    window.addEventListener('resize', function () {
      const max = maxOffset();
      if (offset > max) { offset = max; apply(); }
    });
    start();
  });
})();
