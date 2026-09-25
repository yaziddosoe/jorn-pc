(function () {
  'use strict';

  var reduced = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || false;
  var J = window.JORN;

  function sessGet(k) { try { return sessionStorage.getItem(k) === '1'; } catch (e) { return false; } }
  function sessSet(k) { try { sessionStorage.setItem(k, '1'); } catch (e) {} }
  function sessDel(k) { try { sessionStorage.removeItem(k); } catch (e) {} }

  /* ============================================================
     Preloader (v2 — status text)
     ============================================================ */
  var preloader = document.querySelector('.preloader');
  var loaderStatus = document.getElementById('loaderStatus');
  var arrivedViaCurtain = sessGet('jpcCurtain');

  function hideLoader(skipAnim) {
    if (!preloader) return;
    preloader.classList.add('done');
    setTimeout(function () {
      if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
    }, skipAnim ? 60 : 900);
  }

  if (preloader) {
    if (arrivedViaCurtain) {
      hideLoader(true);
    } else {
      var statuses = ['Booting systems', 'Loading shaders', 'Calibrating fans', 'Final checks'];
      var si = 0;
      var st = setInterval(function () {
        if (!preloader.classList.contains('done') && loaderStatus) {
          si = (si + 1) % statuses.length;
          loaderStatus.textContent = statuses[si];
        } else {
          clearInterval(st);
        }
      }, 900);
      window.addEventListener('load', function () { setTimeout(hideLoader, 500); });
      setTimeout(hideLoader, 4400);
    }
  }

  /* ---------- Page-switch hop curtain ---------- */
  var curtain = document.getElementById('pageCurtain');
  if (curtain) {
    if (arrivedViaCurtain) {
      sessDel('jpcCurtain');
      curtain.classList.add('no-anim', 'in');
      void curtain.offsetWidth;
      curtain.classList.remove('no-anim', 'in');
    }
    document.querySelectorAll('a[href]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (!href || a.target === '_blank' || a.hasAttribute('download')) return;
        if (/^(https?:|mailto:|tel:|#)/i.test(href)) return;
        e.preventDefault();
        sessSet('jpcCurtain');
        curtain.classList.add('in');
        setTimeout(function () { window.location.href = a.href; }, 340);
      });
    });
  }

  /* ============================================================
     Sticky header
     ============================================================ */
  var header = document.getElementById('siteHeader');
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        if (header) header.classList.toggle('scrolled', window.scrollY > 30);
      });
    }
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
    document.querySelectorAll('.nav-link').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('/').pop();
      if (href === path) a.classList.add('current');
    });
  })();

  /* ============================================================
     Floating particles
     ============================================================ */
  var stage = document.querySelector('[data-particles]');
  if (stage && !reduced) {
    for (var i = 0; i < 10; i++) {
      var p = document.createElement('span');
      p.className = 'float-part';
      var size = 3 + Math.random() * 5;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = (Math.random() * 100) + '%';
      p.style.setProperty('--drift', ((Math.random() - 0.5) * 90).toFixed(0) + 'px');
      var dur = (10 + Math.random() * 8).toFixed(1);
      p.style.animationDuration = dur + 's';
      p.style.animationDelay = (-Math.random() * dur).toFixed(1) + 's';
      stage.appendChild(p);
    }
  }

  var pStages = document.querySelectorAll('[data-particles]');
  if (pStages.length && 'IntersectionObserver' in window) {
    var pio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        en.target.classList.toggle('paused', !en.isIntersecting);
      });
    }, { threshold: 0 });
    pStages.forEach(function (el) { pio.observe(el); });
  }

  /* ============================================================
     Scroll reveal
     ============================================================ */
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
        var end = 1600, start = null;
        function step(ts) {
          if (!start) start = ts;
          var prog = Math.min((ts - start) / end, 1);
          var eased = 1 - Math.pow(1 - prog, 3);
          el.textContent = Number((target * eased).toFixed(0)).toLocaleString('en-US') + suffix;
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
      var opt = fd.get('topic') || 'General';
      var subject = encodeURIComponent('Website enquiry re: ' + opt + ' — ' + fd.get('name'));
      var body =
        'Name: ' + fd.get('name') + '\n' +
        'Email: ' + fd.get('email') + '\n' +
        'Topic: ' + opt + '\n' +
        'Budget: ' + (fd.get('budget') || 'Not set') + '\n\n' +
        'Message:\n' + (fd.get('message') || '—');
      window.location.href = 'mailto:hello@jornspc.example?subject=' + subject + '&body=' + encodeURIComponent(body);
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
        newsNote.textContent = 'Thanks for subscribing — we\u2019ll be in touch with build drops, deals and updates.';
        newsNote.style.color = 'var(--ice)';
      }
      newsForm.reset();
    });
  }

  /* ============================================================
     STORE LAYER — rendering + interactions
     ============================================================ */

  function head(str) {
    str = str || '';
    return str.indexOf('\u00B7') > -1 ? str.slice(0, str.indexOf('\u00B7')).trim() : str.trim();
  }
  function sub(str) {
    str = str || '';
    return str.indexOf('\u00B7') > -1 ? str.slice(str.indexOf('\u00B7') + 1).trim() : '';
  }
  function esc(str) {
    return String(str == null ? '' : str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function money(n) { return J.money(n); }

  /* ---------- Machine photos (real photography, bundled locally) ---------- */
  var SHOTS = {
    'jorn-titan': 'assets/pcs/titan.jpg',
    'jorn-elite': 'assets/pcs/elite.jpg',
    'jorn-core': 'assets/pcs/core.jpg'
  };
  function machineArt(pc, eager) {
    return '<img class="shot" src="' + (SHOTS[pc.id] || 'assets/pcs/hero.jpg') + '" alt="' + esc(pc.name) + '"' + (eager ? '' : ' loading="lazy"') + '>';
  }

  /* ---------- Store cards ---------- */
  function renderPCard(pc) {
    return '<article class="store-card" data-id="' + esc(pc.id) + '" style="--acc:' + esc(pc.accent) + '">' +
      '<div class="store-visual">' +
      '<span class="card-pill">' + esc(pc.tierName) + '</span>' +
      machineArt(pc) +
      '<span class="price-tag">' + money(pc.price) + '</span>' +
      '</div>' +
      '<div class="store-body">' +
      '<h3>' + esc(pc.name) + '</h3>' +
      '<span class="store-chip">' + esc(pc.chip) + '</span>' +
      '<p>' + esc(pc.short) + '</p>' +
      '<div class="store-actions">' +
      '<button type="button" class="btn" data-add-pc="' + esc(pc.id) + '">Add to cart</button>' +
      '<a class="btn btn--ghost" href="product.html?id=' + esc(pc.id) + '">Details</a>' +
      '</div>' +
      '</div></article>';
  }

  function storeInit() {
    var home = document.getElementById('storeHome');
    if (home) {
      home.innerHTML = J.pcs.filter(function (p) { return p.featured; }).map(renderPCard).join('');
    }
    var all = document.getElementById('storeAll');
    if (all) {
      all.innerHTML = J.pcs.map(renderPCard).join('');
    }
  }

  /* ---------- Accessories ---------- */
  function renderAccCard(acc) {
    return '<article class="acc-card" data-id="' + esc(acc.id) + '">' +
      '<div class="acc-visual">' +
      '<span class="acc-cat-badge">' + esc(J.accCatLabels[acc.cat] || acc.cat) + '</span>' +
      '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + (J.accIcon[acc.cat] || 'M4 5h16v10H4z') + '"/></svg>' +
      '</div>' +
      '<h3>' + esc(acc.name) + '</h3>' +
      '<span class="acc-chip">' + esc(acc.chip) + '</span>' +
      '<div class="acc-foot">' +
      '<span class="acc-price">' + money(acc.price) + '</span>' +
      '<button type="button" class="btn btn--sm acc-add" data-add-acc="' + esc(acc.id) + '">Add</button>' +
      '</div></article>';
  }

  function accessoriesInit() {
    var bar = document.getElementById('filterBar');
    if (!bar) return;
    var active = 'all';
    bar.innerHTML = '<button type="button" class="filter-chip active" data-cat="all">All</button>' +
      J.accCats.map(function (c) {
        return '<button type="button" class="filter-chip" data-cat="' + esc(c) + '">' + esc(J.accCatLabels[c] || c) + '</button>';
      }).join('');
    function paint() {
      var list = active === 'all'
        ? J.accessories
        : J.accessories.filter(function (a) { return a.cat === active; });
      document.getElementById('accGrid').innerHTML = list.map(renderAccCard).join('');
    }
    bar.addEventListener('click', function (e) {
      var chip = e.target.closest('.filter-chip');
      if (!chip) return;
      active = chip.getAttribute('data-cat');
      bar.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.toggle('active', c === chip); });
      paint();
    });
    paint();
  }

  /* ---------- Product detail page ---------- */
  function setText(id, txt) {
    var el = document.getElementById(id);
    if (el) el.textContent = txt;
  }
  function chipMarkup(pc) {
    var keys = ['cpu', 'gpu', 'ram', 'ssd'];
    var chips = [
      { key: 'cpu', label: head(pc.specs.CPU), sub: sub(pc.specs.CPU) },
      { key: 'gpu', label: head(pc.specs.GPU), sub: sub(pc.specs.GPU) },
      { key: 'ram', label: head(pc.specs.RAM), sub: sub(pc.specs.RAM) },
      { key: 'ssd', label: head(pc.specs.Storage), sub: sub(pc.specs.Storage) }
    ];
    return chips.map(function (c, i) {
      return '<span class="chip pd-chip-' + keys[i] + ' ' + (i % 2 ? 'alt' : '') + '" data-chip-key="' + c.key + '" aria-hidden="true">' +
        esc(c.label) + '<span><b>' + esc(c.sub) + '</b></span></span>';
    }).join('');
  }

  function productInit() {
    var wanted = document.getElementById('pdStage');
    if (!wanted) return;
    var params = new URLSearchParams(window.location.search);
    var pc = J.pc(params.get('id') || '');
    if (!pc) {
      window.location.href = 'products.html';
      return;
    }
    document.title = pc.name + ' \u2014 jorn\u2019s PC';
    setText('pdBreadcrumb', pc.name);
    setText('pdTier', pc.tierName);
    setText('pdStatus', pc.status);
    setText('pdName', pc.name);
    setText('pdTagline', pc.tagline);
    setText('pdShort', pc.short);
    setText('pdPrice', money(pc.price));
    setText('pdFhd', pc.perf.fhd + '');
    setText('pdQhd', pc.perf.qhd + '');
    setText('pdUhd', pc.perf.uhd + '');
    setText('pdBench', pc.perf.bench.toLocaleString('en-US'));
    setText('pdPerfTag', pc.status);

    wanted.insertAdjacentHTML('afterbegin', machineArt(pc, true) + chipMarkup(pc));

    function fill(id, val, den) {
      var bar = document.getElementById(id);
      if (bar) bar.style.setProperty('--p', (Math.max(Math.min(val / den, 1), 0.04) * 100).toFixed(0) + '%');
    }
    fill('pdFillFhd', pc.perf.scale[0], 500);
    fill('pdFillQhd', pc.perf.scale[1], 360);
    fill('pdFillUhd', pc.perf.scale[2], 200);

    var specs = pc.components;
    var specGrid = document.getElementById('pdSpecs');
    if (specGrid) {
      specGrid.innerHTML = Object.keys(specs).map(function (k, i) {
        return '<div class="sp-row" data-key="' + k.toLowerCase() + '"><dt>' + esc(k) + '</dt><dd><span class="dot"></span>' + esc(specs[k]) + '<b>' + esc(pc.specs[k]) + '</b></dd></div>';
      }).join('');
      specGrid.addEventListener('click', function (e) {
        var row = e.target.closest('.sp-row');
        if (!row) return;
        row.classList.toggle('hl');
        var chip = wanted.querySelector('.chip[data-chip-key="' + row.getAttribute('data-key') + '"]');
        if (chip) {
          chip.classList.add('chip-hl');
          setTimeout(function () { chip.classList.remove('chip-hl'); }, 1300);
        }
      });
    }

    var qty = 1;
    var qtyEl = document.getElementById('pdQty');
    function paintQty() { if (qtyEl) qtyEl.textContent = qty; }
    var minus = document.getElementById('pdMinus');
    var plus = document.getElementById('pdPlus');
    if (minus) minus.addEventListener('click', function () { qty = Math.max(1, qty - 1); paintQty(); });
    if (plus) plus.addEventListener('click', function () { qty = Math.min(99, qty + 1); paintQty(); });

    function toCartLine() {
      return { kind: 'pc', id: pc.id, name: pc.name, chip: pc.chip, unit: pc.price, accent: pc.accent, qty: qty };
    }
    var addBtn = document.getElementById('pdAdd');
    if (addBtn) addBtn.addEventListener('click', function () {
      J.cart.add(toCartLine());
      J.cart.toast('Added \u2014 ' + pc.name);
    });
    var buyBtn = document.getElementById('pdBuy');
    if (buyBtn) buyBtn.addEventListener('click', function () {
      J.cart.add(toCartLine());
      if (typeof J.cart.checkout === 'function') J.cart.checkout();
    });

    var accWrap = document.getElementById('pdAcc');
    if (accWrap) {
      var order = ['keyboard', 'mouse', 'monitor', 'headset', 'mousepad', 'rgb'];
      var picks = [];
      order.forEach(function (cat) {
        if (picks.length >= 3) return;
        var match = J.accessories.filter(function (a) { return a.cat === cat; })[0];
        if (match) picks.push(match);
      });
      if (picks.length < 3) {
        J.accessories.forEach(function (a) {
          if (picks.length >= 3) return;
          if (order.indexOf(a.cat) === -1 && picks.indexOf(a) === -1) picks.push(a);
        });
      }
      accWrap.innerHTML = picks.map(renderAccCard).join('');
    }
  }

  /* ---------- Builder ---------- */
  function builderInit() {
    var catsEl = document.getElementById('bCats');
    if (!catsEl) return;
    var cats = J.builder;

    document.getElementById('bPresets').innerHTML = J.presets.map(function (p) {
      return '<button type="button" class="preset-btn" data-preset="' + esc(p.id) + '">' + esc(p.label) + '<small>' + esc(p.chip) + '</small></button>';
    }).join('');

    catsEl.innerHTML = cats.map(function (cat, idx) {
      return '<details class="b-cat" ' + (idx === 0 ? 'open' : '') + '>' +
        '<summary class="b-cat-head" data-key="' + esc(cat.key) + '">' +
        '<h3><span class="bc-num">' + (idx + 1) + '</span>' + esc(cat.label) + '</h3>' +
        '<span class="chosen" data-chosen="' + esc(cat.key) + '">Pick one</span>' +
        '<span class="b-caret" aria-hidden="true"></span>' +
        '</summary>' +
        '<div class="b-cat-body">' +
        cat.items.map(function (it) {
          return '<button type="button" class="b-opt" data-cat="' + esc(cat.key) + '" data-item="' + esc(it.id) + '">' +
            '<span class="b-radio"></span>' +
            '<span class="b-meta"><span class="b-name">' + esc(it.name) + '</span><span class="b-chip">' + esc(it.chip) + '</span></span>' +
            '<span class="b-price">' + money(it.price) + '</span>' +
            '</button>';
        }).join('') +
        '</div></details>';
    }).join('');

    var state = {};
    var partsList = document.getElementById('bPartsList');
    var cdDiagram = document.getElementById('cdDiagram');
    var totalEl = document.getElementById('bTotal');
    var noteEl = document.getElementById('bTotalNote');
    var bAdd = document.getElementById('bAdd');

    function itemPrice(catKey) {
      var id = state[catKey];
      var it = id ? J.builderItem(catKey, id) : null;
      return it ? it.price : 0;
    }
    function items() {
      return cats.map(function (cat) {
        var id = state[cat.key];
        return { catKey: cat.key, cat: cat.label, item: state[cat.key] ? J.builderItem(cat.key, state[cat.key]) : null };
      });
    }
    function refresh() {
      var count = 0, total = 0;
      cats.forEach(function (cat) {
        var id = state[cat.key];
        var it = id ? J.builderItem(cat.key, id) : null;
        if (it) { count++; total += it.price; }
        var chosen = document.querySelector('[data-chosen="' + cat.key + '"]');
        if (chosen) chosen.textContent = it ? it.name : 'Pick one';
        document.querySelectorAll('.b-opt[data-cat="' + cat.key + '"]').forEach(function (o) {
          o.classList.toggle('sel', o.getAttribute('data-item') === id);
        });
      });
      if (totalEl) totalEl.textContent = money(total);
      if (noteEl) noteEl.textContent = count === cats.length ? ('All ' + cats.length + ' parts picked \u2014 free shipping on checkout') : (count + ' of ' + cats.length + ' parts selected');
      if (cdDiagram) {
        cdDiagram.classList.toggle('full', count >= 6);
        cdDiagram.querySelectorAll('.cd-slot').forEach(function (sl) {
          sl.classList.toggle('on', !!state[cats[+sl.getAttribute('data-idx')].key]);
        });
      }
      if (partsList) {
        var parts = items().filter(function (s) { return s.item; });
        partsList.innerHTML = parts.map(function (s) {
          return '<li><span>' + esc(s.cat) + '</span><b>' + esc(s.item.name) + ' <em>' + money(s.item.price) + '</em></b></li>';
        }).join('') || '<li><span>Nothing yet</span><b>Pick parts to get started</b></li>';
      }
      return total;
    }

    function applyPreset(p) {
      state = p.sel ? Object.assign({}, p.sel) : {};
      refresh();
    }

    catsEl.addEventListener('click', function (e) {
      var opt = e.target.closest('.b-opt');
      if (!opt) return;
      state[opt.getAttribute('data-cat')] = opt.getAttribute('data-item');
      refresh();
    });

    document.getElementById('bPresets').addEventListener('click', function (e) {
      var btn = e.target.closest('.preset-btn');
      if (!btn) return;
      var preset = J.presets.filter(function (p) { return p.id === btn.getAttribute('data-preset'); })[0];
      if (preset) applyPreset(preset);
      document.querySelectorAll('.preset-btn').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
    });

    var resetBtn = document.getElementById('bReset');
    if (resetBtn) resetBtn.addEventListener('click', function () {
      var gaming = J.presets.filter(function (p) { return p.id === 'gaming'; })[0];
      if (gaming) applyPreset(gaming);
      document.querySelectorAll('.preset-btn').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-preset') === 'gaming');
      });
      J.cart.toast('Reset to the balanced Gaming preset');
    });

    if (bAdd) bAdd.addEventListener('click', function () {
      var built = items().filter(function (s) { return s.item; });
      if (built.length < cats.length) {
        J.cart.toast('Pick all ' + cats.length + ' parts first');
        return;
      }
      var cpu = built.filter(function (s) { return s.catKey === 'cpu'; })[0];
      var gpu = built.filter(function (s) { return s.catKey === 'gpu'; })[0];
      var total = refresh();
      J.cart.add({
        kind: 'build',
        name: 'Custom build',
        chip: (cpu.item ? head(cpu.item.name) : 'CPU') + ' \u00B7 ' + (gpu.item ? head(gpu.item.name) : 'GPU'),
        unit: total,
        accent: '#ADDFF1',
        parts: built.map(function (s) { return { cat: s.cat, name: s.item.name, price: s.item.price }; })
      });
      J.cart.toast('Build config added to cart');
    });

    var gaming = J.presets.filter(function (p) { return p.id === 'gaming'; })[0];
    if (gaming) applyPreset(gaming);
    document.querySelectorAll('.preset-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-preset') === 'gaming');
    });
  }

  /* ---------- Add-to-cart delegation (works for any JS-rendered card) ---------- */
  document.addEventListener('click', function (e) {
    var pcBtn = e.target.closest('[data-add-pc]');
    if (pcBtn) {
      var pc = J.pc(pcBtn.getAttribute('data-add-pc'));
      if (pc) {
        J.cart.add({ kind: 'pc', id: pc.id, name: pc.name, chip: pc.chip, unit: pc.price, accent: pc.accent });
        J.cart.toast('Added \u2014 ' + pc.name);
      }
      return;
    }
    var accBtn = e.target.closest('[data-add-acc]');
    if (accBtn) {
      var acc = J.acc(accBtn.getAttribute('data-add-acc'));
      if (acc) {
        J.cart.add({ kind: 'acc', id: acc.id, name: acc.name, chip: acc.chip, unit: acc.price, accent: '#4CD7F6' });
        J.cart.toast('Added \u2014 ' + acc.name);
      }
    }
  });

  /* ============================================================
     JORN // REVEAL — scroll-staged unveil (home)
     ============================================================ */
  var revealSec = document.getElementById('reveal');
  if (revealSec) {
    try {
    var rvStage = document.getElementById('revealStage');
    var rvPc = document.getElementById('revealPc');
    var rvCta = document.getElementById('revealCta');
    var rvBar = document.getElementById('rvBar');
    var rvNum = document.getElementById('rvNum');
    var rvCap = document.getElementById('rvCap');
    var rvText = document.getElementById('rvText');
    var rvRgb = rvStage && rvStage.querySelector('.rv-rgb');

    var CAPS = [
      ['01', 'The machine'], ['02', 'Rotation'], ['03', 'RGB activation'],
      ['04', 'Camera in'], ['05', 'Fans spinning'], ['06', 'Under the glass'], ['07', 'Assembled']
    ];
    var FOCUS = ['cooler', 'ram', 'gpu', 'fans'];
    var FNAME = { cooler: 'CPU cooling', ram: 'RAM', gpu: 'GPU', fans: 'RGB fans' };

    function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
    function seg(a, b, t) { return clamp01((t - a) / (b - a)); }
    function ss(x) { return x * x * (3 - 2 * x); }

    function stageIndex(p) {
      if (p < 0.08) return 1;
      if (p < 0.34) return 2;
      if (p < 0.46) return 3;
      if (p < 0.60) return 4;
      if (p < 0.76) return 5;
      if (p < 0.94) return 6;
      return 7;
    }

    function drawReveal(p) {
      if (!rvStage) return;
      var op = ss(seg(0, 0.05, p));
      rvStage.style.opacity = String(op);
      rvStage.style.transition = 'none';

      var rotIn = ss(seg(0.08, 0.32, p));
      var rotOut = ss(seg(0.90, 0.98, p));
      var rot = 58 * rotIn - 58 * rotOut;

      var zoomIn = ss(seg(0.46, 0.60, p));
      var zoomOut = ss(seg(0.92, 1, p));
      var zoom = 1 + 0.55 * zoomIn - 0.27 * zoomOut;

      var panA = ss(seg(0.74, 0.80, p));
      var panB = ss(seg(0.90, 0.96, p));
      var angle = -16 * (panA - panB);

      var t6 = seg(0.76, 0.94, p);
      var focus = '';
      var fx = 0;
      if (t6 > 0 && t6 < 1) {
        var idx = Math.min(FOCUS.length - 1, Math.floor(t6 * FOCUS.length));
        focus = FOCUS[idx];
        var ft = clamp01((t6 * FOCUS.length - idx) / 1);
        fx = (['-34', '0', '30', '-2'][idx]) * ss(ft);
      }

      if (rvRgb) rvRgb.style.opacity = String(ss(seg(0.34, 0.46, p)));
      if (rvPc) rvPc.style.transform = 'translateX(' + fx.toFixed(2) + '%) rotateY(' + (rot + angle).toFixed(2) + 'deg) scale(' + zoom.toFixed(3) + ')';
      rvStage.setAttribute('data-spin', p >= 0.60 ? '1' : '0');
      rvStage.setAttribute('data-focus', focus);

      var st = stageIndex(p);
      if (rvNum) rvNum.textContent = '0' + st;
      if (rvCap) rvCap.textContent = st === 6 && focus ? 'Inside — ' + FNAME[focus] : CAPS[st - 1][1];
      if (rvBar) rvBar.style.height = (p * 100).toFixed(1) + '%';

      var on = p >= 0.965;
      if (rvCta) rvCta.classList.toggle('on', on);
      if (rvText) rvText.style.opacity = on ? '0' : '1';
    }

    if (reduced) {
      if (rvStage) rvStage.classList.add('rv-static');
      if (rvCta) rvCta.classList.add('on');
      if (rvText) rvText.style.opacity = '0';
      if (rvBar) rvBar.style.height = '100%';
      if (rvPc) rvPc.style.transform = 'scale(1.06)';
    } else {
      var rvTop = revealSec.offsetTop;
      var rvLen = 1;
      function rvMeasure() {
        rvTop = revealSec.offsetTop;
        rvLen = Math.max(1, revealSec.offsetHeight - window.innerHeight);
      }
      rvMeasure();
      var rvRaf = false;
      function rvOnScroll() {
        if (rvRaf) return;
        rvRaf = true;
        requestAnimationFrame(function () {
          rvRaf = false;
          drawReveal(clamp01((window.scrollY - rvTop) / rvLen));
        });
      }
      window.addEventListener('scroll', rvOnScroll, { passive: true });
      window.addEventListener('resize', function () {
        rvMeasure();
        rvOnScroll();
      }, { passive: true });
      drawReveal(clamp01((window.scrollY - rvTop) / rvLen));
    }
    } catch (err) {
      if (rvStage) rvStage.classList.add('rv-static');
    }
  }

  /* ---------- Boot order: render only what exists on this page ---------- */
  [storeInit, productInit, builderInit, accessoriesInit].forEach(function (fn) {
    try { fn(); }
    catch (err) {
      if (typeof console !== 'undefined' && console.warn) console.warn('jorn init skipped:', err && err.message);
    }
  });
})();