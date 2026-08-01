(function () {
  'use strict';

  const chevronSvg = `
    <svg class="event-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `;

  function initConfig() {
    if (typeof WEDDING_CONFIG === 'undefined') return;

    document.title = WEDDING_CONFIG.coupleNames + ' — Wedding';

    const coupleEl = document.getElementById('couple-names');
    const dateEl = document.getElementById('wedding-date-display');
    const taglineEl = document.getElementById('tagline');
    const hashtagEl = document.getElementById('hashtag');
    const navLogo = document.querySelector('.nav-logo');

    if (coupleEl) coupleEl.textContent = WEDDING_CONFIG.coupleNames;
    if (dateEl) dateEl.textContent = WEDDING_CONFIG.weddingDateDisplay;
    if (taglineEl) taglineEl.textContent = WEDDING_CONFIG.tagline;
    if (hashtagEl) hashtagEl.textContent = WEDDING_CONFIG.hashtag;

    if (navLogo) {
      const initials = WEDDING_CONFIG.coupleNames
        .split('&')
        .map(function (part) { return part.trim().charAt(0).toUpperCase(); })
        .join(' & ');
      navLogo.textContent = initials || 'W';
    }

    const primaryMap = document.getElementById('primary-map');
    if (primaryMap && WEDDING_CONFIG.primaryMapEmbed) {
      primaryMap.src = WEDDING_CONFIG.primaryMapEmbed;
    }

    const rsvpButton = document.getElementById('rsvp-button');
    const rsvpIframe = document.getElementById('rsvp-iframe');
    if (WEDDING_CONFIG.rsvpFormUrl) {
      if (rsvpButton) rsvpButton.href = WEDDING_CONFIG.rsvpFormUrl;
      if (rsvpIframe) rsvpIframe.src = WEDDING_CONFIG.rsvpFormUrl + '?embedded=true';
    }
  }

  function renderEvents() {
    if (typeof EVENTS === 'undefined') return;

    const container = document.getElementById('event-accordion');
    if (!container) return;

    container.innerHTML = EVENTS.map(function (event) {
      const dateShort = event.date + (event.time && event.time !== 'TBD' ? ' · ' + event.time : '');

      return (
        '<details class="event-item" role="listitem" data-event-id="' + event.id + '">' +
          '<summary>' +
            '<div class="event-summary-left">' +
              '<span class="event-name">' + escapeHtml(event.name) + '</span>' +
              '<span class="event-date-short">' + escapeHtml(dateShort) + '</span>' +
            '</div>' +
            chevronSvg +
          '</summary>' +
          '<div class="event-body">' +
            '<div class="event-detail"><strong>Date</strong><span>' + escapeHtml(event.date) + '</span></div>' +
            '<div class="event-detail"><strong>Time</strong><span>' + escapeHtml(event.time) + '</span></div>' +
            '<div class="event-detail"><strong>Venue</strong><span>' + escapeHtml(event.venue) + '</span></div>' +
            '<div class="event-detail"><strong>Address</strong><span>' + escapeHtml(event.address) + '</span></div>' +
            '<div class="event-detail"><strong>Dress code</strong><span>' + escapeHtml(event.dressCode) + '</span></div>' +
            (event.notes ? '<div class="event-detail"><strong>Notes</strong><span>' + escapeHtml(event.notes) + '</span></div>' : '') +
            (event.mapEmbed ?
              '<a href="#map" class="event-map-link" data-map-target="' + event.id + '">View on map</a>' +
              '<div class="event-map-embed">' +
                '<iframe title="' + escapeHtml(event.name) + ' map" src="' + escapeHtml(event.mapEmbed) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>' +
              '</div>' : '') +
          '</div>' +
        '</details>'
      );
    }).join('');

    initAccordionBehavior();
    initMapLinks();
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function initAccordionBehavior() {
    const items = document.querySelectorAll('.event-item');

    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (item.open) {
          items.forEach(function (other) {
            if (other !== item && other.open) {
              other.open = false;
            }
          });
        }
      });
    });
  }

  function initMapLinks() {
    const mapLinks = document.querySelectorAll('[data-map-target]');
    const primaryMap = document.getElementById('primary-map');

    mapLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const eventId = link.getAttribute('data-map-target');
        const event = EVENTS.find(function (ev) { return ev.id === eventId; });

        if (event && event.mapEmbed && primaryMap) {
          primaryMap.src = event.mapEmbed;
        }
      });
    });
  }

  function initCountdown() {
    if (typeof WEDDING_CONFIG === 'undefined' || !WEDDING_CONFIG.weddingDate) return;

    const weddingDate = new Date(WEDDING_CONFIG.weddingDate + 'T00:00:00');
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    function update() {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '0';
        if (hoursEl) hoursEl.textContent = '0';
        if (minutesEl) minutesEl.textContent = '0';
        if (secondsEl) secondsEl.textContent = '0';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (daysEl) daysEl.textContent = String(days);
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
      toggle.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('is-open');
        toggle.classList.toggle('is-active', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
      });

      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('is-open');
          toggle.classList.remove('is-active');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initConfig();
    renderEvents();
    initCountdown();
    initNav();
  });
})();
