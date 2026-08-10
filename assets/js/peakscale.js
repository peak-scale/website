/* Peak Scale — minimal client JS.
   Header state, mobile menu toggle, testimonial carousel (chevrons + dots). */

(function () {
  'use strict';

  // ---------- Header that hides on the way down ----------
  // The header is `sticky`, so shifting it by the scroll delta (clamped to its
  // own height) makes it leave and come back at exactly the speed of the page,
  // as if it were part of the document flow.
  const header = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;
  let headerOffset = 0;

  function setHeaderOffset(offset) {
    headerOffset = offset;
    header.style.setProperty('--header-offset', offset + 'px');
  }

  function revealHeader() {
    setHeaderOffset(0);
  }

  function updateHeader() {
    const currentScrollY = Math.max(0, window.scrollY);
    const scrollDelta = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    // The open drawer stays anchored to the top.
    if (header.classList.contains('is-menu-open')) return revealHeader();

    setHeaderOffset(Math.min(0, Math.max(-header.offsetHeight, headerOffset - scrollDelta)));
  }

  if (header) {
    window.addEventListener('scroll', updateHeader, { passive: true });
    header.addEventListener('focusin', revealHeader);
  }

  // ---------- Hero media parallax ----------
  // Keep this intentionally restrained: the image travels at most 42px down as
  // its hero leaves the viewport. Motion-sensitive visitors keep the static
  // image declared in the markup.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const heroMedia = Array.from(document.querySelectorAll('.hero__media'));

  if (heroMedia.length && !reduceMotion.matches) {
    let parallaxFrame = null;

    heroMedia.forEach(function (media) { media.classList.add('is-parallax'); });

    function updateHeroParallax() {
      parallaxFrame = null;
      heroMedia.forEach(function (media) {
        const heroSection = media.closest('.hero');
        if (!heroSection) return;

        const bounds = heroSection.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -bounds.top / bounds.height));
        media.style.setProperty('--hero-parallax-offset', (progress * 42).toFixed(2) + 'px');
      });
    }

    function requestHeroParallax() {
      if (parallaxFrame === null) parallaxFrame = window.requestAnimationFrame(updateHeroParallax);
    }

    requestHeroParallax();
    window.addEventListener('scroll', requestHeroParallax, { passive: true });
    window.addEventListener('resize', requestHeroParallax);
  }

  // ---------- Mobile menu (pill drawer) ----------
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  function isOpen() { return !!menu && menu.classList.contains('is-open'); }
  function openMenu() {
    if (!menu) return;
    menu.classList.add('is-open');
    if (header) {
      header.classList.add('is-menu-open');
      revealHeader();
    }
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('is-open');
    if (header) header.classList.remove('is-menu-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    updateHeader();
  }
  function toggleMenu() { isOpen() ? closeMenu() : openMenu(); }

  if (menuToggle) menuToggle.addEventListener('click', toggleMenu);

  // Close when a menu link is followed.
  if (menu) menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // Close on Escape (returning focus to the toggle).
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) { closeMenu(); if (menuToggle) menuToggle.focus(); }
  });

  // Close when clicking outside the header.
  document.addEventListener('click', function (e) {
    if (isOpen() && !e.target.closest('.site-header')) closeMenu();
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

    const viewport = carousel.querySelector('.testimonial-carousel__viewport');
    // On touch the stylesheet turns the viewport into a native snap scroller
    // that shows every slide at once, so the dots have to follow the scroll
    // position instead of the one-slide-visible state below.
    const swipe = window.matchMedia('(hover: none) and (pointer: coarse)');

    let active = 0;
    function paintDots() {
      if (!dotsWrap) return;
      dotsWrap.querySelectorAll('button').forEach(function (b, idx) {
        b.classList.toggle('is-active', idx === active);
      });
    }
    function go(i) {
      active = (i + slides.length) % slides.length;
      if (swipe.matches) {
        const slide = slides[active];
        viewport.scrollTo({
          left: slide.offsetLeft - (viewport.clientWidth - slide.offsetWidth) / 2,
          behavior: 'smooth'
        });
      } else {
        slides.forEach(function (s, idx) {
          s.style.display = idx === active ? '' : 'none';
        });
      }
      paintDots();
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

    if (viewport) {
      let ticking = false;
      viewport.addEventListener('scroll', function () {
        if (ticking || !swipe.matches) return;
        ticking = true;
        requestAnimationFrame(function () {
          ticking = false;
          const center = viewport.scrollLeft + viewport.clientWidth / 2;
          let best = 0, bestDist = Infinity;
          slides.forEach(function (s, idx) {
            const dist = Math.abs(s.offsetLeft + s.offsetWidth / 2 - center);
            if (dist < bestDist) { bestDist = dist; best = idx; }
          });
          if (best !== active) { active = best; paintDots(); }
        });
      }, { passive: true });
    }

    function applyMode() {
      // The swipe layout needs every slide painted; `display` is only ours to
      // manage in the chevron layout.
      slides.forEach(function (s, idx) {
        s.style.display = swipe.matches || idx === active ? '' : 'none';
      });
    }
    applyMode();
    swipe.addEventListener('change', applyMode);
  });

  // ---------- Logo carousel (shuffled, infinite, transform-based) ----------
  document.querySelectorAll('[data-logo-carousel]').forEach(function (carousel) {
    const track = carousel.querySelector('[data-logo-track]');
    const viewport = carousel.querySelector('.logo-carousel__viewport');
    const prev = carousel.querySelector('[data-logo-prev]');
    const next = carousel.querySelector('[data-logo-next]');
    if (!track) return;

    // On touch devices the CSS turns the viewport into a native horizontal
    // scroller (swipeable, scroll-snapped) and pins the transform to none.
    // There the auto-advance has to move scrollLeft instead — otherwise it
    // writes a transform nothing renders and the strip sits still.
    const coarse = window.matchMedia('(hover: none) and (pointer: coarse)');
    function nativeScroll() { return !!viewport && coarse.matches; }

    // 1. Shuffle the source tiles in place (Fisher-Yates) so each visit
    //    sees customers in a different order.
    const originals = Array.from(track.children);
    for (let i = originals.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [originals[i], originals[j]] = [originals[j], originals[i]];
    }
    originals.forEach(function (t) { track.appendChild(t); });   // re-order

    // 2. Append a single clone of the (shuffled) set so the track is
    //    twice the width of one copy — this is what makes the wrap-around
    //    invisible: when we slide past the end of the originals, the
    //    second copy is already in view, and we instantly snap the
    //    transform back by one set-width without the user noticing.
    Array.from(track.children).forEach(function (tile) {
      const clone = tile.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.tabIndex = -1;
      track.appendChild(clone);
    });

    let offset = 0;
    const count = originals.length;

    function tileStep() {
      const tile = track.querySelector('.logo-tile');
      if (!tile) return 220;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      return tile.getBoundingClientRect().width + gap;
    }
    // Distance from the first original tile to its clone — i.e. the width of
    // exactly one copy of the set, gap included. Measured rather than derived
    // from scrollWidth so track padding (added in the touch layout) can't
    // skew it.
    function setWidth() {
      const first = track.children[0];
      const firstClone = track.children[count];
      if (!first || !firstClone) return track.scrollWidth / 2;
      return firstClone.offsetLeft - first.offsetLeft;
    }
    function apply() { track.style.transform = 'translateX(-' + offset + 'px)'; }

    // Set transform with no transition (used for the invisible wrap-snap).
    function snap(target) {
      track.style.transition = 'none';
      offset = target;
      apply();
      void track.offsetWidth;            // flush
      track.style.transition = '';
    }
    // Halt any in-flight transition by snapping to the currently-rendered
    // position. Otherwise on hover/click the track keeps sliding for up
    // to .5s and tiles slip out from under the cursor.
    function freezeAtRendered() {
      const m = new DOMMatrixReadOnly(getComputedStyle(track).transform);
      snap(-m.m41);
    }
    function nudge(dir) {
      const step = tileStep();
      // Going backwards from the start: invisibly jump forward by one
      // set-width to the mirror position on the second copy, then animate
      // backward from there. Looks like a normal leftward slide.
      if (dir < 0 && offset - step < 0) snap(offset + setWidth());
      offset += dir * step;
      apply();
    }

    // After every animated step, if we've slid past the first copy,
    // snap back by one set-width. The two copies are identical at the
    // boundary, so the snap is invisible.
    track.addEventListener('transitionend', function () {
      if (offset >= setWidth()) snap(offset - setWidth());
    });

    if (prev) prev.addEventListener('click', function () { freezeAtRendered(); nudge(-1); });
    if (next) next.addEventListener('click', function () { freezeAtRendered(); nudge(1); });

    // Native-scroll equivalent of the transform wrap: the two copies are
    // identical, so scrollLeft w and 0 show the same thing. Jumping either
    // way keeps the strip endless in both directions. Only ever called when
    // no scroll is in flight, so it can't cut off a swipe's momentum.
    function wrapScroll() {
      const w = setWidth();
      if (w <= 0) return;
      if (viewport.scrollLeft >= w) viewport.scrollLeft -= w;
      else if (viewport.scrollLeft <= 0) viewport.scrollLeft += w;
    }

    function advance() {
      if (nativeScroll()) {
        const w = setWidth();
        if (w > 0 && viewport.scrollLeft >= w) viewport.scrollLeft -= w;
        viewport.scrollBy({ left: tileStep(), behavior: reduced ? 'auto' : 'smooth' });
      } else {
        nudge(1);
      }
    }

    // Auto-advance, paused on hover / focus / touch / reduced motion.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer = null;
    let resumeTimer = null;
    function start() {
      clearTimeout(resumeTimer);
      if (!timer && !reduced) timer = setInterval(advance, 3500);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      if (!nativeScroll()) freezeAtRendered();
    }
    // A tap on a phone fires mouseenter without a matching mouseleave, which
    // would stop the strip for good — hover only pauses where hover exists.
    carousel.addEventListener('mouseenter', function () { if (!nativeScroll()) stop(); });
    carousel.addEventListener('mouseleave', function () { if (!nativeScroll()) start(); });
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);

    if (viewport) {
      // Hand the strip over to the user while they swipe, then take it back
      // once they've been idle for a moment.
      let idle = null;
      function resumeSoon() {
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(start, 2500);
      }
      viewport.addEventListener('touchstart', stop, { passive: true });
      viewport.addEventListener('touchend', resumeSoon, { passive: true });
      viewport.addEventListener('touchcancel', resumeSoon, { passive: true });
      viewport.addEventListener('scroll', function () {
        clearTimeout(idle);
        idle = setTimeout(function () { if (nativeScroll()) wrapScroll(); }, 200);
      }, { passive: true });
    }

    // Re-clamp on resize so we never end up beyond the new set-width.
    window.addEventListener('resize', function () {
      const w = setWidth();
      if (w > 0 && offset >= w) { offset -= w; apply(); }
    });
    start();
  });
})();
