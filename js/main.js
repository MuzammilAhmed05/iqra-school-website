/**
 * IQRA English Medium School — Official Website
 * main.js
 *
 * Scope: mobile navigation only.
 * - Hamburger open / close
 * - aria-expanded state management
 * - Escape key to close
 * - Close when a nav link is clicked
 * - Focus management (into nav on open, back to toggle on close)
 * - Body scroll lock while menu is open
 */

(function () {
  'use strict';

  const navToggle  = document.getElementById('nav-toggle');
  const mobileNav  = document.getElementById('mobile-nav');
  const mobileLinks = mobileNav
    ? mobileNav.querySelectorAll('.mobile-nav-link')
    : [];

  /**
   * Open or close the mobile navigation overlay.
   * @param {boolean} open
   */
  function setMobileNavState(open) {
    if (!navToggle || !mobileNav) return;

    navToggle.setAttribute('aria-expanded', String(open));
    mobileNav.setAttribute('aria-hidden', String(!open));
    mobileNav.classList.toggle('is-open', open);

    // Prevent body scroll while nav is open
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) {
      // Move focus to first link when opening
      if (mobileLinks.length > 0) {
        mobileLinks[0].focus();
      }
    } else {
      // Return focus to toggle when closing
      navToggle.focus();
    }
  }

  // Toggle on button click
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      setMobileNavState(!isExpanded);
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      const isOpen = navToggle &&
        navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        setMobileNavState(false);
      }
    }
  });

  // Close when a mobile nav link is clicked
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setMobileNavState(false);
    });
  });

  // Close on outside click
  document.addEventListener('click', function (event) {
    const isOpen = navToggle &&
      navToggle.getAttribute('aria-expanded') === 'true';
    if (!isOpen) return;

    const header = document.querySelector('.site-header');
    const nav    = document.getElementById('mobile-nav');

    if (
      header && !header.contains(event.target) &&
      nav    && !nav.contains(event.target)
    ) {
      setMobileNavState(false);
    }
  });


  /* ------------------------------------------------------------------
     Scroll Reveal — IntersectionObserver
     Adds .is-visible to .reveal elements when they enter the viewport.
     CSS handles the actual transition (opacity + translate).
     prefers-reduced-motion: .reveal starts visible via the media query
     in CSS, so no motion occurs when that preference is active.
     ------------------------------------------------------------------ */

  var revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Stop observing once revealed — animation only happens once
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,   /* trigger when 12% of element is visible */
      rootMargin: '0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback: if IntersectionObserver unsupported, show everything */
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */

  var yearEls = document.querySelectorAll('.js-year');
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

}());
