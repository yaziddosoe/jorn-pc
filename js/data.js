/* ============================================================
   jorn's PC — data.js
   Product catalog: finished PCs, builder components, presets,
   accessories. Pure data, no side effects.
   ============================================================ */
(function () {
  'use strict';
  var JORN = window.JORN = window.JORN || {};

  JORN.company = {
    email: 'hello@jornspc.example',
    phone: '(+31) 40 000 00 00',
    discord: 'discord.gg/jornspc'
  };

  /* ---------- Ready-built PCs ---------- */
  JORN.pcs = [
    {
      id: 'jorn-titan',
      name: 'JORN TITAN',
      tierName: 'Extreme',
      tagline: 'The machine at the top. Pure speed.',
      accent: '#9F7BEA',
      price: 4299,
      short: 'Extreme performance — 4K and beyond',
      chip: 'RTX 5090 · Ryzen 9 · 64GB',
      featured: true,
      warranty: 2,
      status: 'Performance Mode',
      specs: {
        CPU: 'AMD Ryzen 9 9950X3D · 16-core / 32-thread',
        GPU: 'NVIDIA GeForce RTX 5090 · 32GB GDDR7',
        RAM: '64GB DDR5-6000 CL30 (2\u00d732)',
        Storage: '4TB NVMe Gen4 (2\u00d72TB)',
        Cooling: '360mm AIO · quad-loop airflow',
        Case: 'JORN Titan chassis · tempered glass',
        PSU: '1200W ATX 3.1 · 80+ Platinum',
        OS: 'Windows 11 Pro'
      },
      perf: {
        tag: 'Performance Mode',
        scale: [490, 330, 175],
        fhd: '~490 FPS', qhd: '~330 FPS', uhd: '~175 FPS',
        bench: 19800
      },
      components: ['CPU', 'GPU', 'RAM', 'Storage', 'Cooling', 'Case', 'PSU']
    },
    {
      id: 'jorn-elite',
      name: 'JORN ELITE',
      tierName: 'High-end',
      tagline: 'High refresh. High detail. No drama.',
      accent: '#4CD7F6',
      price: 2299,
      short: 'High-end gaming — 1440p high-refresh',
      chip: 'RTX 5070 Ti · Ryzen 7 · 32GB',
      featured: true,
      warranty: 2,
      status: 'Balanced Mode',
      specs: {
        CPU: 'AMD Ryzen 7 9800X3D · 8-core / 16-thread',
        GPU: 'NVIDIA GeForce RTX 5070 Ti · 16GB GDDR7',
        RAM: '32GB DDR5-6000 CL30 (2\u00d716)',
        Storage: '2TB NVMe Gen4',
        Cooling: '240mm AIO',
        Case: 'JORN Eclipse · tempered glass',
        PSU: '850W ATX 3.1 · 80+ Gold',
        OS: 'Windows 11 Home'
      },
      perf: {
        tag: 'Balanced Mode',
        scale: [330, 210, 110],
        fhd: '~330 FPS', qhd: '~210 FPS', uhd: '~110 FPS',
        bench: 13500
      },
      components: ['CPU', 'GPU', 'RAM', 'Storage', 'Cooling', 'Case', 'PSU']
    },
    {
      id: 'jorn-core',
      name: 'JORN CORE',
      tierName: 'Everyday',
      tagline: 'Everything you need. Nothing extra.',
      accent: '#9CC8D9',
      price: 1299,
      short: 'Everyday gaming & work — esports ready',
      chip: 'RTX 5060 · Ryzen 5 · 16GB',
      featured: true,
      warranty: 2,
      status: 'Silent Mode',
      specs: {
        CPU: 'AMD Ryzen 5 7600X · 6-core / 12-thread',
        GPU: 'NVIDIA GeForce RTX 5060 · 8GB GDDR7',
        RAM: '16GB DDR5-5600 (2\u00d78)',
        Storage: '1TB NVMe Gen4',
        Cooling: 'Airflow tower cooler',
        Case: 'JORN Airbite · mesh mid-tower',
        PSU: '650W ATX 3.1 · 80+ Bronze',
        OS: 'Windows 11 Home'
      },
      perf: {
        tag: 'Silent Mode',
        scale: [200, 120, 60],
        fhd: '~200 FPS', qhd: '~120 FPS', uhd: '~60 FPS',
        bench: 6800
      },
      components: ['CPU', 'GPU', 'RAM', 'Storage', 'Cooling', 'Case', 'PSU']
    }
  ];

  /* ---------- Build-Your-PC components ---------- */
  JORN.builder = [
    {
      key: 'cpu', label: 'Processor',
      items: [
        { id: 'cpu-flux', name: 'AMD Ryzen 5 7600X', price: 229, chip: '6-core / 12-thread · 5.3GHz boost' },
        { id: 'cpu-glide', name: 'AMD Ryzen 7 9800X3D', price: 479, chip: '8-core / 16-thread · 3D V-Cache' },
        { id: 'cpu-one', name: 'AMD Ryzen 9 9950X3D', price: 749, chip: '16-core / 32-thread · 5.7GHz boost' }
      ]
    },
    {
      key: 'gpu', label: 'Graphics card',
      items: [
        { id: 'gpu-flux', name: 'NVIDIA GeForce RTX 5060', price: 319, chip: '8GB GDDR7 · 1080p esports' },
        { id: 'gpu-glide', name: 'NVIDIA GeForce RTX 5070 Ti', price: 799, chip: '16GB GDDR7 · 1440p high-refresh' },
        { id: 'gpu-one', name: 'NVIDIA GeForce RTX 5090', price: 1499, chip: '32GB GDDR7 · 4K flagship' }
      ]
    },
    {
      key: 'ram', label: 'Memory',
      items: [
        { id: 'ram-16', name: '16GB DDR5-5600', price: 79, chip: '2\u00d78GB · XMP ready' },
        { id: 'ram-32', name: '32GB DDR5-6000 CL30', price: 139, chip: '2\u00d716GB · low latency' },
        { id: 'ram-64', name: '64GB DDR5-6000 CL30', price: 279, chip: '2\u00d732GB · heavy workloads' }
      ]
    },
    {
      key: 'storage', label: 'Storage',
      items: [
        { id: 'ssd-1', name: '1TB NVMe Gen4', price: 109, chip: '7000MB/s read · system + games' },
        { id: 'ssd-2', name: '2TB NVMe Gen4', price: 189, chip: '7000MB/s read · full library' },
        { id: 'ssd-4', name: '4TB NVMe Gen4 (2\u00d72TB)', price: 379, chip: 'Raid-light dual drive' }
      ]
    },
    {
      key: 'cooling', label: 'Cooling',
      items: [
        { id: 'cool-air', name: 'JORN Airflow tower', price: 69, chip: 'Single-tower · quiet 120mm' },
        { id: 'cool-aio-240', name: '240mm AIO liquid', price: 139, chip: '280W TDP · low-profile pump' },
        { id: 'cool-aio-360', name: '360mm AIO liquid', price: 219, chip: 'Flagship heat load' }
      ]
    },
    {
      key: 'case', label: 'Case',
      items: [
        { id: 'case-air', name: 'JORN Airbite', price: 109, chip: 'Mesh mid-tower · airflow first' },
        { id: 'case-glass', name: 'JORN Vista', price: 149, chip: 'Tempered glass · RGB ready' },
        { id: 'case-tower', name: 'JORN Titan', price: 259, chip: 'Full tower · max clearance' }
      ]
    },
    {
      key: 'psu', label: 'Power supply',
      items: [
        { id: 'psu-650', name: '650W 80+ Bronze', price: 79, chip: 'ATX 3.1 · budget safe' },
        { id: 'psu-850', name: '850W 80+ Gold', price: 129, chip: 'ATX 3.1 · modular' },
        { id: 'psu-1200', name: '1200W 80+ Platinum', price: 249, chip: 'ATX 3.1 · flagship headroom' }
      ]
    }
  ];

  JORN.presets = [
    { id: 'starter', label: 'Starter', chip: 'Solid 1080p', sel: { cpu: 'cpu-flux', gpu: 'gpu-flux', ram: 'ram-16', storage: 'ssd-1', cooling: 'cool-air', case: 'case-air', psu: 'psu-650' } },
    { id: 'gaming', label: 'Gaming', chip: '1440p sweet spot', sel: { cpu: 'cpu-glide', gpu: 'gpu-glide', ram: 'ram-32', storage: 'ssd-2', cooling: 'cool-aio-240', case: 'case-glass', psu: 'psu-850' } },
    { id: 'creator', label: 'Creator', chip: 'Heavy workloads', sel: { cpu: 'cpu-one', gpu: 'gpu-glide', ram: 'ram-64', storage: 'ssd-4', cooling: 'cool-aio-360', case: 'case-tower', psu: 'psu-1200' } }
  ];

  /* ---------- Accessories ---------- */
  JORN.accCats = ['keyboard', 'mouse', 'monitor', 'headset', 'mousepad', 'rgb'];

  JORN.accCatLabels = {
    keyboard: 'Keyboards',
    mouse: 'Mice',
    monitor: 'Monitors',
    headset: 'Headsets',
    mousepad: 'Mousepads',
    rgb: 'RGB & Desk'
  };

  JORN.accessories = [
    { id: 'kb-nexus87', name: 'JORN Nexus 87', cat: 'keyboard', price: 149, chip: 'Gasket · hot-swap · 87 keys' },
    { id: 'kb-drift65', name: 'JORN Drift 65', cat: 'keyboard', price: 119, chip: 'Compact 65% · wireless' },
    { id: 'kb-slab1800', name: 'JORN Slab 1800', cat: 'keyboard', price: 129, chip: 'Full layout · clamp pad' },
    { id: 'ms-strike', name: 'JORN Strike X2', cat: 'mouse', price: 89, chip: '58g · 26K sensor' },
    { id: 'ms-haul', name: 'JORN Haul Pro', cat: 'mouse', price: 129, chip: 'Ergo · charging dock' },
    { id: 'ms-nimble', name: 'JORN Nimble', cat: 'mouse', price: 39, chip: 'Wireless daily driver' },
    { id: 'mo-a27', name: 'JORN A27 240Hz', cat: 'monitor', price: 429, chip: '27\u2033 IPS · 240Hz' },
    { id: 'mo-u32', name: 'JORN U32 4K', cat: 'monitor', price: 649, chip: '32\u2033 IPS · 144Hz · HDR600' },
    { id: 'mo-o27', name: 'JORN O27 OLED', cat: 'monitor', price: 899, chip: '27\u2033 OLED · 360Hz' },
    { id: 'hs-amp', name: 'JORN Amp', cat: 'headset', price: 99, chip: 'Open-back · detachable mic' },
    { id: 'hs-isolate', name: 'JORN Isolate', cat: 'headset', price: 79, chip: 'Closed-back · ANC' },
    { id: 'hs-pulse', name: 'JORN Pulse Buds', cat: 'headset', price: 59, chip: 'Low-latency 2.4GHz' },
    { id: 'mp-3xl', name: 'JORN Pad 3XL', cat: 'mousepad', price: 45, chip: '990\u00d7420mm · stitched' },
    { id: 'mp-glass', name: 'JORN Glass Slab', cat: 'mousepad', price: 59, chip: 'Tempered glass base' },
    { id: 'mp-edition', name: 'JORN Coast XL', cat: 'mousepad', price: 34, chip: 'Speed-cloth · water repellant' },
    { id: 'rgb-plaid', name: 'JORN Plaid Light Kit', cat: 'rgb', price: 69, chip: '2m addressable strip' },
    { id: 'rgb-halo', name: 'JORN Halo Ring', cat: 'rgb', price: 24, chip: 'Monitor backlight ring' },
    { id: 'rgb-desk', name: 'JORN Desk Glow', cat: 'rgb', price: 89, chip: 'Undercabinet light bar' }
  ];

  JORN.accIcon = {
    keyboard: 'M3 7h18v8h-4l-2 3h-6l-2-3H3z',
    mouse: 'M12 3a6 6 0 0 0-6 6v6a6 6 0 0 0 12 0V9a6 6 0 0 0-6-6zM12 3v9',
    monitor: 'M4 5h16v10H4zM8 19h8M12 15v4',
    headset: 'M4 14v-3a8 8 0 0 1 16 0v3M4 14h3l1 4H4zM20 14h-3l-1 4h4z',
    mousepad: 'M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM8 15v3M13 15v3M18 15v3',
    rgb: 'M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1'
  };

  JORN.money = function (n) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  };

  JORN.pc = function (id) {
    for (var i = 0; i < JORN.pcs.length; i++) { if (JORN.pcs[i].id === id) return JORN.pcs[i]; }
    return null;
  };

  JORN.acc = function (id) {
    for (var i = 0; i < JORN.accessories.length; i++) { if (JORN.accessories[i].id === id) return JORN.accessories[i]; }
    return null;
  };

  JORN.builderItem = function (key, id) {
    for (var i = 0; i < JORN.builder.length; i++) {
      if (JORN.builder[i].key !== key) continue;
      for (var j = 0; j < JORN.builder[i].items.length; j++) {
        if (JORN.builder[i].items[j].id === id) return JORN.builder[i].items[j];
      }
    }
    return null;
  };
})();