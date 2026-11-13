/* Peak Scale – minimal client JS.
   Header state, mobile menu toggle, testimonial carousel (chevrons + dots),
   customer logo strip (arrows, drag, auto-advance). */

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

  // ---------- Logo carousel (shuffled, infinite, native scroll) ----------
  // The viewport is a native snap scroller on every device (see site.css),
  // so touch and trackpad swipes need no JS. This adds the endless wrap,
  // the arrows, mouse drag and an auto-advance, all driven through
  // scrollLeft.
  document.querySelectorAll('[data-logo-carousel]').forEach(function (carousel) {
    const track = carousel.querySelector('[data-logo-track]');
    const viewport = carousel.querySelector('.logo-carousel__viewport');
    const prev = carousel.querySelector('[data-logo-prev]');
    const next = carousel.querySelector('[data-logo-next]');
    if (!track || !viewport) return;

    // 1. Shuffle the source tiles in place (Fisher-Yates) so each visit
    //    sees customers in a different order.
    const originals = Array.from(track.children);
    for (let i = originals.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [originals[i], originals[j]] = [originals[j], originals[i]];
    }
    originals.forEach(function (t) { track.appendChild(t); });   // re-order

    // 2. Append a single clone of the (shuffled) set so the track is
    //    twice the width of one copy – this is what makes the wrap-around
    //    invisible: the two copies are identical, so scrollLeft w and 0
    //    show the same thing and we can jump between them unnoticed.
    Array.from(track.children).forEach(function (tile) {
      const clone = tile.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.tabIndex = -1;
      track.appendChild(clone);
    });

    const count = originals.length;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function tileStep() {
      const tile = track.querySelector('.logo-tile');
      if (!tile) return 220;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      return tile.getBoundingClientRect().width + gap;
    }
    // Distance from the first original tile to its clone – i.e. the width of
    // exactly one copy of the set, gap included. Measured rather than derived
    // from scrollWidth so track padding (added in the touch layout) can't
    // skew it.
    function setWidth() {
      const first = track.children[0];
      const firstClone = track.children[count];
      if (!first || !firstClone) return track.scrollWidth / 2;
      return firstClone.offsetLeft - first.offsetLeft;
    }

    // Jumping by one set-width either way keeps the strip endless in both
    // directions. Only ever called when no scroll is in flight, so it can't
    // cut off a swipe's momentum. The resting range is (0, w]: the jump up
    // from 0 lands exactly on w, so wrapping back must need strictly more
    // than w, or each jump's scroll event would trigger the other one.
    function wrapScroll() {
      const w = setWidth();
      if (w <= 0) return;
      if (viewport.scrollLeft > w) viewport.scrollLeft -= w;
      else if (viewport.scrollLeft <= 0) viewport.scrollLeft += w;
    }

    // One tile forward (1) or back (-1), for the arrows and the auto-advance.
    // If the step would run off either end of the track, first jump
    // invisibly to the mirror position on the other copy.
    function step(dir) {
      const w = setWidth();
      const s = tileStep();
      if (w > 0 && dir > 0 && viewport.scrollLeft >= w) viewport.scrollLeft -= w;
      if (w > 0 && dir < 0 && viewport.scrollLeft - s < 0) viewport.scrollLeft += w;
      viewport.scrollBy({ left: dir * s, behavior: reduced ? 'auto' : 'smooth' });
    }

    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });

    // Auto-advance, paused on hover / focus / touch / drag / reduced motion.
    let timer = null;
    let resumeTimer = null;
    function start() {
      clearTimeout(resumeTimer);
      if (!timer && !reduced) timer = setInterval(function () { step(1); }, 3500);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    function resumeSoon() {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(start, 2500);
    }
    // Pointer events rather than mouseenter/leave: a tap on a phone fires
    // mouseenter without a matching mouseleave, which would stop the strip
    // for good. Hover only pauses for pointers that can actually hover.
    carousel.addEventListener('pointerenter', function (e) { if (e.pointerType !== 'touch') stop(); });
    carousel.addEventListener('pointerleave', function (e) { if (e.pointerType !== 'touch') start(); });
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);

    // Hand the strip over to the user while they swipe, then take it back
    // once they've been idle for a moment.
    viewport.addEventListener('touchstart', stop, { passive: true });
    viewport.addEventListener('touchend', resumeSoon, { passive: true });
    viewport.addEventListener('touchcancel', resumeSoon, { passive: true });

    // Mouse drag. Touch and trackpads scroll natively, but a mouse wheel only
    // scrolls vertically, so mouse users get grab-and-drag. The 5px threshold
    // keeps a plain click on a tile working as a link.
    let drag = null;
    let suppressClick = false;
    viewport.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { id: e.pointerId, x: e.clientX, left: viewport.scrollLeft, moved: false };
    });
    viewport.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved) {
        if (Math.abs(dx) < 5) return;
        drag.moved = true;
        viewport.setPointerCapture(e.pointerId);
        viewport.classList.add('is-dragging');
      }
      // Wrap mid-drag by shifting the drag origin one set-width, so the
      // strip stays endless under the cursor in both directions.
      const w = setWidth();
      let target = drag.left - dx;
      if (w > 0 && target < 0) { drag.left += w; target += w; }
      else if (w > 0 && target > w) { drag.left -= w; target -= w; }
      viewport.scrollLeft = target;
    });
    function endDrag(e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (drag.moved) {
        viewport.classList.remove('is-dragging');
        // The release would otherwise click whatever tile is under it.
        suppressClick = true;
        setTimeout(function () { suppressClick = false; }, 0);
      }
      drag = null;
    }
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    viewport.addEventListener('click', function (e) {
      if (suppressClick) { e.preventDefault(); e.stopPropagation(); }
    }, true);
    // Links and images are natively draggable; that would hijack the gesture.
    viewport.addEventListener('dragstart', function (e) { e.preventDefault(); });

    let idle = null;
    viewport.addEventListener('scroll', function () {
      clearTimeout(idle);
      idle = setTimeout(function () { if (!drag) wrapScroll(); }, 200);
    }, { passive: true });

    start();
  });
})();
