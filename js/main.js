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
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        filterButtons.forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        galleryItems.forEach(function (item) {
          var show = filter === 'all' || item.getAttribute('data-category') === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* 6. FOOTER YEAR */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
