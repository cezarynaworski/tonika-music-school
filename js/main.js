/* =====================================================================
   TONIKA MUSIC SCHOOL — MAIN SCRIPT
   ---------------------------------------------------------------------
   1. Sticky header shadow on scroll
   2. Mobile navigation toggle
   3. Highlight the current page in the menu
   4. Subtle reveal-on-scroll animations (IntersectionObserver)
   5. Gallery filters
  6. Footer year
   All features degrade gracefully if JavaScript is disabled.
   ===================================================================== */
(function () {
  'use strict';

  /*
   * BACKGROUND STARS
   * Adjust this number to change how many stars appear on every page.
   */
  var STAR_COUNT = 15;

  var sky = document.querySelector('.sky');
  if (sky) {
    sky.querySelectorAll('.star').forEach(function (star) { star.remove(); });

    var colors = ['#7967AC', '#5575B8', '#BEACD4'];
    var seed = 9173;
    function random() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }

    for (var starIndex = 0; starIndex < STAR_COUNT; starIndex += 1) {
      var star = document.createElement('span');
      var isLeft = starIndex % 2 === 0;
      var size = Math.round(12 + random() * 30);
      var gutterPosition = 1 + random() * 7;

      star.className = 'star';
      star.style.top = (4 + random() * 92).toFixed(2) + '%';
      star.style[isLeft ? 'left' : 'right'] = gutterPosition.toFixed(2) + 'vw';
      star.style.setProperty('--star-size', size + 'px');
      star.style.setProperty('--star-speed', (4 + random() * 5).toFixed(2) + 's');
      star.style.setProperty('--star-delay', (-random() * 6).toFixed(2) + 's');
      star.style.setProperty('--star-color', colors[Math.floor(random() * colors.length)]);
      sky.appendChild(star);
    }
  }

  /* 1. STICKY HEADER — add a shadow once the page is scrolled */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 2. MOBILE NAVIGATION */
  var toggle = document.querySelector('.nav-toggle');
  var navList = document.querySelector('.nav__list');
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      var open = navList.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    // Close the menu after choosing a link (mobile)
    navList.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navList.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    // Close with Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('is-open')) {
        navList.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* 3. CURRENT PAGE HIGHLIGHT — compares link href with the file name */
  var current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(function (link) {
    var target = link.getAttribute('href').split('#')[0];
    if (target === current) link.setAttribute('aria-current', 'page');
  });

  /* 4. REVEAL ON SCROLL — elements with [data-reveal] */
  var revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealItems.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach(function (el) { io.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* 5. GALLERY FILTERS — buttons with [data-filter], items with [data-category] */
  var filterButtons = document.querySelectorAll('.filter');
  var galleryItems = document.querySelectorAll('.gallery figure');
  if (filterButtons.length && galleryItems.length) {
    function applyFilter(filter, activeButton) {
      filterButtons.forEach(function (button) {
        var isActive = button === activeButton;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
      galleryItems.forEach(function (item) {
        var show = filter === 'all' || item.getAttribute('data-category') === filter;
        item.hidden = !show;
      });
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        applyFilter(filter, btn);
      });
    });

    var initialFilter = document.querySelector('.filter[data-filter="all"]') || filterButtons[0];
    applyFilter(initialFilter.getAttribute('data-filter'), initialFilter);
  }

  /* 6. FOOTER YEAR */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
