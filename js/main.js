/* ============================================================
   jorn's PC — main.js
   Nav, typing, reveal, counters, tilt, particles, form, to-top
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Preloader ---------- */
  var loader = document.querySelector('.preloader');
  if (loader) {
    window.addEventListener('load', function () {
      setTimeout(function () { loader.classList.add('done'); }, 550);
    });
    setTimeout(function () { loader.classList.add('done'); }, 3200);
  }

  /* ---------- Sticky header ---------- */
  var header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
  if (header && window.scrollY > 30) header.classList.add('scrolled');

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Active nav link ---------- */
  (function () {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.nav-link');
    links.forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('/').pop();
      if (href === path) a.classList.add('current');
    });
  })();

  /* ---------- Typing effect ---------- */
  var typedEl = document.querySelector('[data-typing]');
  if (typedEl && !reduced) {
    var words = typedEl.getAttribute('data-typing').split('|');
    var wordIdx = 0, charIdx = 0, deleting = false;
    (function type() {
      var word = words[wordIdx];
      typedEl.textContent = word.substring(0, charIdx);
      var delay;
      if (!deleting) {
        charIdx++;
        if (charIdx === word.length + 1) {
          deleting = true;
          delay = 2100;
        } else delay = 75;
      } else {
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
          delay = 420;
        } else delay = 38;
      }
      setTimeout(type, delay);
    })();
  } else if (typedEl) {
    typedEl.textContent = typedEl.getAttribute('data-typing').split('|')[0];
  }

  /* ---------- Floating particles ---------- */
  var stage = document.querySelector('[data-particles]');
  if (stage && !reduced) {
    var n = 16;
    for (var i = 0; i < n; i++) {
      var p = document.createElement('span');
      p.className = 'float-part';
      var size = 4 + Math.random() * 8;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = (Math.random() * 100) + '%';
      p.style.setProperty('--drift', ((Math.random() - 0.5) * 120).toFixed(0) + 'px');
      var dur = (9 + Math.random() * 9).toFixed(1);
      p.style.animationDuration = dur + 's';
      p.style.animationDelay = (-Math.random() * dur).toFixed(1) + 's';
      stage.appendChild(p);
    }
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal, .stagger');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.classList.add('visible');
          var mini = el.querySelector('.mini-parts');
          if (mini) mini.setAttribute('data-on', 'true');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('visible');
      var mini = el.querySelector('.mini-parts');
      if (mini) mini.setAttribute('data-on', 'true');
    });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && !reduced) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        cio.unobserve(el);
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1600, start = null;
        function step(ts) {
          if (!start) start = ts;
          var prog = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - prog, 3);
          var val = (target * eased).toFixed(0);
          el.textContent = Number(val).toLocaleString('en-US') + suffix;
          if (prog < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    counters.forEach(function (c) {
      c.textContent = Number(c.getAttribute('data-count')).toLocaleString('en-US') + (c.getAttribute('data-suffix') || '');
    });
  }

  /* ---------- Card tilt ---------- */
  var tiltEls = document.querySelectorAll('.tilt');
  if (tiltEls.length && !reduced && window.matchMedia('(hover: hover)').matches) {
    tiltEls.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(950px) rotateY(' + (x * 9).toFixed(2) + 'deg) rotateX(' + (-y * 9).toFixed(2) + 'deg) translateY(-6px)';
        card.style.transition = 'transform .1s ease-out';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
      });
    });
  }

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Copy to clipboard ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () {
        var old = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.borderColor = 'var(--ice-bright)';
        setTimeout(function () {
          btn.textContent = old;
          btn.style.borderColor = '';
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else if (window.prompt) {
        window.prompt('Copy this address:', text);
        done();
      }
    });
  });

  /* ---------- Contact form -> mailto ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var subject = encodeURIComponent('Website enquiry from ' + (fd.get('name') || 'a visitor'));
      var body =
        'Name: ' + fd.get('name') + '\n' +
        'Email: ' + fd.get('email') + '\n' +
        'Topic: ' + fd.get('topic') + '\n' +
        'Budget: ' + fd.get('budget') + '\n\n' +
        'Message:\n' + fd.get('message');
      var mailto = 'mailto:hello@jornspc.example?subject=' + subject + '&body=' + encodeURIComponent(body);
      window.location.href = mailto;
      if (status) status.textContent = 'Opening your email app… (pre-filled with your message)';
      form.reset();
    });
  }

  /* ---------- Newsletter (demo) ---------- */
  var newsForm = document.getElementById('newsForm');
  var newsNote = document.getElementById('newsNote');
  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (newsNote) {
        newsNote.textContent = 'Thanks for subscribing — we’ll be in touch with build drops, deals and updates.';
        newsNote.style.color = 'var(--ice)';
      }
      newsForm.reset();
    });
  }

})();