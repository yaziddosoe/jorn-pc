/* ============================================================
   jorn's PC — cart.js
   Persistent cart engine + slide-in drawer + navbar badge +
   mailto checkout. Depends on data.js (window.JORN).
   ============================================================ */
(function () {
  'use strict';
  var JORN = window.JORN;
  var KEY = 'jornCart';
  var items = load();
  var drawer, backdrop, listEl, emptyEl, footEl, countEls = [];
  var toastTimer = null;

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {}
  }
  function uid() {
    return 'b' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }
  function emit() {
    window.dispatchEvent(new CustomEvent('jorn:cart', { detail: { count: api.count(), subtotal: api.subtotal() } }));
  }

  function changed() {
    save();
    if (countEls.length) {
      var n = api.count();
      for (var i = 0; i < countEls.length; i++) {
        countEls[i].textContent = n > 99 ? '99+' : String(n);
        countEls[i].classList.toggle('has', n > 0);
      }
    }
    if (drawer) render();
    emit();
  }

  var api = {
    add: function (o) {
      var line;
      if (o.kind === 'pc' || o.kind === 'acc') {
        var key = o.kind + ':' + o.id;
        line = null;
        for (var i = 0; i < items.length; i++) {
          if (items[i].lineId === key) { line = items[i]; break; }
        }
        if (line) { line.qty += o.qty || 1; }
        else {
          items.push({ lineId: key, kind: o.kind, id: o.id, name: o.name, chip: o.chip || '', unit: o.unit, accent: o.accent || '#5FC6EC', qty: o.qty || 1, meta: o.meta || null });
        }
      } else {
        items.push({ lineId: uid(), kind: 'build', id: o.id || uid(), name: o.name, chip: o.chip || '', unit: o.unit, accent: o.accent || '#ADDFF1', qty: 1, meta: o.meta || null, parts: o.parts || [] });
      }
      changed();
      api.open();
    },

    setQty: function (lineId, qty) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].lineId !== lineId) continue;
        qty = Math.max(0, Math.min(99, Math.floor(qty) || 0));
        if (qty === 0) { items.splice(i, 1); }
        else { items[i].qty = qty; }
        changed();
        return;
      }
    },

    remove: function (lineId) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].lineId !== lineId) continue;
        items.splice(i, 1);
        changed();
        return;
      }
    },

    clear: function () {
      items = [];
      changed();
    },

    count: function () {
      var n = 0;
      for (var i = 0; i < items.length; i++) n += items[i].qty;
      return n;
    },

    subtotal: function () {
      var s = 0;
      for (var i = 0; i < items.length; i++) s += items[i].unit * items[i].qty;
      return s;
    },

    items: function () { return items; },

    open: function () {
      if (!drawer) return;
      if (drawer.classList.contains('open')) render();
      drawer.classList.add('open');
      backdrop.classList.add('open');
      document.body.classList.add('body--locked');
      document.getElementById('cartFocusClose') && document.getElementById('cartFocusClose').focus();
    },

    close: function () {
      if (!drawer) return;
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.classList.remove('body--locked');
    },

    toggle: function () {
      if (drawer && drawer.classList.contains('open')) api.close();
      else api.open();
    },

    toast: function (msg) {
      var t = document.getElementById('cartToast');
      if (!t) return;
      t.textContent = msg;
      t.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2200);
    }
  };

  function money(n) { return JORN.money(n); }

  function thumbMarkup(line) {
    if (line.kind === 'build') {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4.5 4.5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a4.5 4.5 0 0 0 6.4-6.4l-2.6 2.6-2.4-.7-.7-2.4 2.7-2.5z"/></svg>';
    }
    if (line.kind === 'acc' && typeof line.id === 'string') {
      var cat = JORN.acc(line.id);
      if (cat) return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="' + JORN.accIcon[cat.cat] + '"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v10H4zM8 19h8M12 15v4M6 15v-4a7 7 0 0 1 12 0v4"/></svg>';
  }

  function rowMarkup(line) {
    var lineTotal = line.unit * line.qty;
    var chip = line.chip ? '<span class="d-item-chip">' + escapeHtml(line.chip) + '</span>' : '';
    return '<div class="d-item" style="--accent:' + line.accent + '">' +
      '<span class="d-item-thumb">' + thumbMarkup(line) + '</span>' +
      '<div class="d-item-main">' +
        '<b class="d-item-name">' + escapeHtml(line.name) + '</b>' + chip +
        '<div class="d-line-meta">' + (line.kind === 'build' ? '<span class="d-build-tag">Custom build</span>' : '') + '<span class="d-item-price">' + money(line.unit) + ' each</span></div>' +
      '</div>' +
      '<div class="d-item-side">' +
        '<div class="qty">' +
          '<button type="button" class="qty-btn" data-q="' + line.lineId + '" data-d="-1" aria-label="Decrease quantity">−</button>' +
          '<span class="qty-val">' + line.qty + '</span>' +
          '<button type="button" class="qty-btn" data-q="' + line.lineId + '" data-d="1" aria-label="Increase quantity">+</button>' +
        '</div>' +
        '<span class="d-item-total">' + money(lineTotal) + '</span>' +
        '<button type="button" class="d-item-remove" data-rm="' + line.lineId + '" aria-label="Remove">×</button>' +
      '</div>' +
    '</div>';
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function render() {
    countEls = Array.prototype.slice.call(document.querySelectorAll('.cart-count'));
    if (!listEl) return;
    if (items.length === 0) {
      listEl.innerHTML = '';
      emptyEl.classList.remove('hidden');
      footEl.classList.add('hidden');
    } else {
      emptyEl.classList.add('hidden');
      footEl.classList.remove('hidden');
      var html = '';
      for (var i = 0; i < items.length; i++) html += rowMarkup(items[i]);
      listEl.innerHTML = html;
    }
    var sub = document.getElementById('cartSub');
    if (sub) sub.textContent = money(api.subtotal());
    var t = document.getElementById('cartTotal');
    if (t) t.textContent = money(api.subtotal());
    var headCount = document.getElementById('cartHeadCount');
    if (headCount) headCount.textContent = '(' + api.count() + ')';
  }

  function checkout() {
    if (items.length === 0) return;
    var lines = ['PC BUILD ORDER — jorn\u2019s PC', '', 'Hi JORN team,'];
    lines.push('I\u2019m ready to place the order below:');
    lines.push('');
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      lines.push(it.qty + '\u00d7 ' + it.name + (it.chip ? '  [' + it.chip + ']' : '') + ' — ' + money(it.unit * it.qty));
    }
    lines.push('');
    lines.push('Subtotal: ' + money(api.subtotal()));
    lines.push('Delivery: free shipping');
    lines.push('Total: ' + money(api.subtotal()));
    lines.push('');
    lines.push('Please confirm availability and lead time. Thanks!');
    var href = 'mailto:' + JORN.company.email +
      '?subject=' + encodeURIComponent('Order request — JORN PC (' + money(api.subtotal()) + ')') +
      '&body=' + encodeURIComponent(lines.join('\n'));
    api.close();
    window.location.href = href;
  }

  function buildDrawer() {
    if (drawer) return;
    drawer = document.createElement('aside');
    drawer.className = 'cart-drawer';
    drawer.id = 'cartPanel';
    drawer.setAttribute('aria-label', 'Shopping cart');
    drawer.innerHTML =
      '<div class="d-head">' +
        '<h3>Your cart <span id="cartHeadCount"></span></h3>' +
        '<button type="button" class="d-close" id="cartFocusClose" aria-label="Close cart">×</button>' +
      '</div>' +
      '<div class="d-body">' +
        '<div class="d-list" id="dList"></div>' +
        '<div class="d-empty" id="dEmpty">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h15l-1.5 9h-12zM3 3h3"/><circle cx="9.5" cy="20" r="1.6"/><circle cx="17" cy="20" r="1.6"/></svg>' +
          '<b>Your cart is empty</b>' +
          '<span>Add a build, a part or an accessory and it lands here.</span>' +
        '</div>' +
      '</div>' +
      '<div class="d-foot" id="dFoot">' +
        '<div class="d-sub"><span>Subtotal</span><b id="cartSub">$0</b></div>' +
        '<div class="d-sub d-sub--note"><span>Shipping</span><span>Free</span></div>' +
        '<a class="btn btn--full" href="#" id="cartCheckout">Checkout  <span class="arrow">→</span></a>' +
        '<button type="button" class="d-clear" id="cartClear">Empty cart</button>' +
      '</div>';

    backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    backdrop.id = 'cartBackdrop';

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    listEl = drawer.querySelector('#dList');
    emptyEl = drawer.querySelector('#dEmpty');
    footEl = drawer.querySelector('#dFoot');

    backdrop.addEventListener('click', api.close);
    drawer.querySelector('#cartFocusClose').addEventListener('click', api.close);
    drawer.querySelector('#cartClear').addEventListener('click', api.clear);
    drawer.querySelector('#cartCheckout').addEventListener('click', function (e) { e.preventDefault(); checkout(); });

    drawer.addEventListener('click', function (e) {
      var dec = e.target.closest('[data-d]');
      var rm = e.target.closest('[data-rm]');
      if (dec) { api.setQty(dec.getAttribute('data-q'), parseInt(api.findQty(dec.getAttribute('data-q')), 10) + parseInt(dec.getAttribute('data-d'), 10)); }
      if (rm) { api.remove(rm.getAttribute('data-rm')); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') api.close();
    });
  }

  api.findQty = function (lineId) {
    for (var i = 0; i < items.length; i++) if (items[i].lineId === lineId) return items[i].qty;
    return 1;
  };

  function bindHeader() {
    document.querySelectorAll('.cart-bar').forEach(function (btn) {
      btn.addEventListener('click', function (e) { e.preventDefault(); api.toggle(); });
    });
  }

  function bindToast() {
    if (document.getElementById('cartToast')) return;
    var t = document.createElement('div');
    t.className = 'cart-toast';
    t.id = 'cartToast';
    document.body.appendChild(t);
  }

  function init() {
    if (!JORN) return;
    buildDrawer();
    bindHeader();
    bindToast();
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.JORN.cart = api;
  api.checkout = checkout;
})();