/* Peak Scale — only functional interaction: mobile navigation and testimonials. */

(function () {
  'use strict';

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const header = document.querySelector('.site-header');

  function menuIsOpen() {
    return Boolean(menu && menu.classList.contains('is-open'));
  }

  function setMenu(open) {
    if (!menu || !menuToggle) return;
    menu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    if (header) header.classList.toggle('is-menu-open', open);
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function () {
      setMenu(!menuIsOpen());
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuIsOpen()) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (menuIsOpen() && !event.target.closest('.site-header')) setMenu(false);
    });
  }

  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    const slides = Array.from(carousel.querySelectorAll('[data-slide]'));
    const dotsWrap = carousel.querySelector('[data-dots]');
    const prevButton = carousel.querySelector('[data-prev]');
    const nextButton = carousel.querySelector('[data-next]');

    if (!slides.length) return;

    if (slides.length === 1) {
      if (prevButton) prevButton.hidden = true;
      if (nextButton) nextButton.hidden = true;
      if (dotsWrap) dotsWrap.hidden = true;
      return;
    }

    let active = 0;

    function showSlide(index) {
      active = (index + slides.length) % slides.length;

      slides.forEach(function (slide, slideIndex) {
        slide.hidden = slideIndex !== active;
      });

      if (dotsWrap) {
        dotsWrap.querySelectorAll('button').forEach(function (dot, dotIndex) {
          const isActive = dotIndex === active;
          dot.classList.toggle('is-active', isActive);
          dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
      }
    }

    if (dotsWrap) {
      slides.forEach(function (_, index) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Slide ' + (index + 1));
        dot.addEventListener('click', function () { showSlide(index); });
        dotsWrap.appendChild(dot);
      });
    }

    if (prevButton) prevButton.addEventListener('click', function () { showSlide(active - 1); });
    if (nextButton) nextButton.addEventListener('click', function () { showSlide(active + 1); });

    showSlide(0);
  });
})();
