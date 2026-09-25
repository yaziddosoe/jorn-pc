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

  /* ---------- Build-Your-PC components — full categorized catalog ---------- */
  JORN.builder = [
    {
      key: 'cpu', label: 'Processor',
      items: [
        { id: 'cpu-7500f', name: 'AMD Ryzen 5 7500F', price: 179, chip: '6-core / 12-thread · 5.0GHz boost · AM5' },
        { id: 'cpu-7600x', name: 'AMD Ryzen 5 7600X', price: 229, chip: '6-core / 12-thread · 5.3GHz boost · AM5' },
        { id: 'cpu-7700x', name: 'AMD Ryzen 7 7700X', price: 329, chip: '8-core / 16-thread · 5.4GHz boost · AM5' },
        { id: 'cpu-7800x3d', name: 'AMD Ryzen 7 7800X3D', price: 449, chip: '8-core / 16-thread · 3D V-Cache · AM5' },
        { id: 'cpu-9800x3d', name: 'AMD Ryzen 7 9800X3D', price: 479, chip: '8-core / 16-thread · 3D V-Cache · AM5' },
        { id: 'cpu-9900x', name: 'AMD Ryzen 9 9900X', price: 499, chip: '12-core / 24-thread · 5.6GHz boost · AM5' },
        { id: 'cpu-9950x3d', name: 'AMD Ryzen 9 9950X3D', price: 749, chip: '16-core / 32-thread · 5.7GHz boost · AM5' },
        { id: 'cpu-i5-14600k', name: 'Intel Core i5-14600K', price: 289, chip: '14-core (6P+8E) / 20-thread · 5.3GHz · LGA1700' },
        { id: 'cpu-i7-14700k', name: 'Intel Core i7-14700K', price: 409, chip: '20-core (8P+12E) / 28-thread · 5.6GHz · LGA1700' },
        { id: 'cpu-i9-14900k', name: 'Intel Core i9-14900K', price: 589, chip: '24-core (8P+16E) / 32-thread · 6.0GHz · LGA1700' }
      ]
    },
    {
      key: 'gpu', label: 'Graphics card',
      items: [
        { id: 'gpu-rtx5060', name: 'NVIDIA GeForce RTX 5060', price: 319, chip: '8GB GDDR7 · 1080p esports' },
        { id: 'gpu-rtx5060ti', name: 'NVIDIA GeForce RTX 5060 Ti', price: 449, chip: '16GB GDDR7 · 1440p entry' },
        { id: 'gpu-rtx5070', name: 'NVIDIA GeForce RTX 5070', price: 549, chip: '12GB GDDR7 · 1440p high-refresh' },
        { id: 'gpu-rtx5070ti', name: 'NVIDIA GeForce RTX 5070 Ti', price: 799, chip: '16GB GDDR7 · 1440p/4K sweet spot' },
        { id: 'gpu-rtx5080', name: 'NVIDIA GeForce RTX 5080', price: 1099, chip: '16GB GDDR7 · 4K high-refresh' },
        { id: 'gpu-rtx5090', name: 'NVIDIA GeForce RTX 5090', price: 1499, chip: '32GB GDDR7 · 4K flagship' },
        { id: 'gpu-rx7600xt', name: 'AMD Radeon RX 7600 XT', price: 329, chip: '16GB GDDR6 · 1080p high' },
        { id: 'gpu-rx7800xt', name: 'AMD Radeon RX 7800 XT', price: 499, chip: '16GB GDDR6 · 1440p high' },
        { id: 'gpu-rx7900gre', name: 'AMD Radeon RX 7900 GRE', price: 549, chip: '16GB GDDR6 · 1440p max' },
        { id: 'gpu-rx9070', name: 'AMD Radeon RX 9070', price: 529, chip: '16GB GDDR6 · 1440p high-refresh' },
        { id: 'gpu-rx9070xt', name: 'AMD Radeon RX 9070 XT', price: 599, chip: '16GB GDDR6 · 4K ready' }
      ]
    },
    {
      key: 'ram', label: 'Memory',
      items: [
        { id: 'ram-d4-16', name: '16GB DDR4-3200', price: 45, chip: '2\u00d78GB · CL16' },
        { id: 'ram-d4-32', name: '32GB DDR4-3600 CL18', price: 75, chip: '2\u00d716GB · dual channel' },
        { id: 'ram-d5-16', name: '16GB DDR5-5600', price: 79, chip: '2\u00d78GB · XMP/EXPO ready' },
        { id: 'ram-d5-32', name: '32GB DDR5-6000 CL30', price: 139, chip: '2\u00d716GB · low latency' },
        { id: 'ram-d5-32rgb', name: '32GB DDR5-6000 CL30 RGB', price: 159, chip: '2\u00d716GB · addressable glow' },
        { id: 'ram-d5-32hi', name: '32GB DDR5-7200 CL34', price: 189, chip: '2\u00d716GB · extreme speed' },
        { id: 'ram-d5-64', name: '64GB DDR5-6000 CL30', price: 279, chip: '2\u00d732GB · heavy workloads' },
        { id: 'ram-d5-64rgb', name: '64GB DDR5-6200 CL32 RGB', price: 329, chip: '2\u00d732GB · streaming rigs' },
        { id: 'ram-d5-96', name: '96GB DDR5-6400 CL32', price: 419, chip: '2\u00d748GB · creator' },
        { id: 'ram-d5-128', name: '128GB DDR5-6000 CL30', price: 529, chip: '4\u00d732GB · workstation' }
      ]
    },
    {
      key: 'storage', label: 'Storage',
      items: [
        { id: 'ssd-500g3', name: '500GB NVMe Gen3', price: 39, chip: '3500MB/s read · OS drive' },
        { id: 'ssd-1g3', name: '1TB NVMe Gen3', price: 59, chip: '3500MB/s read · budget bulk' },
        { id: 'ssd-1sata', name: '1TB SATA SSD', price: 69, chip: '560MB/s read · legacy boards' },
        { id: 'ssd-1', name: '1TB NVMe Gen4', price: 109, chip: '7000MB/s read · system + games' },
        { id: 'ssd-2sata', name: '2TB SATA SSD', price: 119, chip: '560MB/s read · big archives' },
        { id: 'ssd-1g5', name: '1TB NVMe Gen5', price: 239, chip: '14000MB/s read · bleeding edge' },
        { id: 'ssd-2', name: '2TB NVMe Gen4', price: 189, chip: '7000MB/s read · full library' },
        { id: 'hdd-2', name: '2TB HDD 7200RPM', price: 59, chip: 'HDD · mass storage' },
        { id: 'ssd-2g5', name: '2TB NVMe Gen5', price: 389, chip: '14000MB/s read · flagship' },
        { id: 'hdd-4', name: '4TB HDD 7200RPM', price: 99, chip: 'HDD · backups & archives' },
        { id: 'ssd-4', name: '4TB NVMe Gen4', price: 379, chip: '7000MB/s read · creator library' },
        { id: 'ssd-8', name: '8TB NVMe Gen4', price: 649, chip: '7000MB/s read · everything on NVMe' }
      ]
    },
    {
      key: 'cooling', label: 'Cooling',
      items: [
        { id: 'cool-flow', name: 'JORN Flow', price: 35, chip: 'Low-profile 92mm · SFF builds' },
        { id: 'cool-air', name: 'JORN Airflow', price: 49, chip: 'Single-tower · quiet 120mm' },
        { id: 'cool-dual', name: 'JORN Torrent', price: 79, chip: 'Dual-tower · 120mm fans' },
        { id: 'cool-dual-e', name: 'JORN Torrent Elite', price: 109, chip: 'Dual-tower · 140mm fans' },
        { id: 'cool-aio-240', name: '240mm AIO liquid', price: 119, chip: '280W TDP · low-profile pump' },
        { id: 'cool-aio-240rgb', name: '240mm AIO RGB', price: 139, chip: '280W TDP · illuminated fans' },
        { id: 'cool-aio-280', name: '280mm AIO liquid', price: 159, chip: '320W TDP · high airflow' },
        { id: 'cool-aio-360', name: '360mm AIO liquid', price: 199, chip: 'Flagship heat load' },
        { id: 'cool-aio-420', name: '420mm AIO liquid', price: 249, chip: 'E-ATX towers · extreme TDP' },
        { id: 'cool-aio-360lcd', name: '360mm AIO · LCD pump', price: 289, chip: 'Live stats on the pump' }
      ]
    },
    {
      key: 'case', label: 'Case',
      items: [
        { id: 'case-air', name: 'JORN Airbite', price: 89, chip: 'Mesh mid-tower · airflow first' },
        { id: 'case-itx', name: 'JORN Micro', price: 129, chip: 'Compact ITX · SFF friendly' },
        { id: 'case-air-pro', name: 'JORN Airbite Pro', price: 129, chip: 'Mesh + 4 RGB fans included' },
        { id: 'case-vista', name: 'JORN Vista', price: 119, chip: 'Tempered glass · RGB ready' },
        { id: 'case-glacier', name: 'JORN Glacier', price: 119, chip: 'White glass · clean studio look' },
        { id: 'case-vista-e', name: 'JORN Vista Elite', price: 169, chip: 'Glass + front RGB bar' },
        { id: 'case-panorama', name: 'JORN Horizon', price: 159, chip: 'Panoramic glass · showcase angle' },
        { id: 'case-dual', name: 'JORN Split', price: 199, chip: 'Dual-chamber · clean cabling' },
        { id: 'case-tower', name: 'JORN Titan', price: 229, chip: 'Full tower · max clearance' },
        { id: 'case-bench', name: 'JORN Bench', price: 149, chip: 'Open testbed · tinker friendly' }
      ]
    },
    {
      key: 'psu', label: 'Power supply',
      items: [
        { id: 'psu-550', name: '550W 80+ Bronze', price: 59, chip: 'ATX · entry builds' },
        { id: 'psu-650', name: '650W 80+ Bronze', price: 69, chip: 'ATX · budget safe' },
        { id: 'psu-650g', name: '650W 80+ Gold', price: 99, chip: 'ATX · modular' },
        { id: 'psu-750g', name: '750W 80+ Gold', price: 119, chip: 'ATX · semi-modular' },
        { id: 'psu-850', name: '850W 80+ Gold', price: 129, chip: 'ATX 3.1 · modular' },
        { id: 'psu-850e', name: '850W 80+ Gold', price: 149, chip: 'ATX 3.0 · 12VHPWR' },
        { id: 'psu-1000g', name: '1000W 80+ Gold', price: 199, chip: 'ATX 3.1 · flagship GPUs' },
        { id: 'psu-1200', name: '1200W 80+ Platinum', price: 249, chip: 'ATX 3.1 · flagship headroom' },
        { id: 'psu-1200t', name: '1200W 80+ Titanium', price: 349, chip: 'ATX 3.1 · quietest class' },
        { id: 'psu-1600', name: '1600W 80+ Platinum', price: 429, chip: 'ATX 3.1 · extreme rigs' }
      ]
    },
    {
      key: 'motherboard', label: 'Motherboard',
      items: [
        { id: 'mobo-a620', name: 'ASRock A620M', price: 99, chip: 'micro-ATX · AM5 · DDR5' },
        { id: 'mobo-b650m', name: 'MSI B650M Mortar WiFi', price: 169, chip: 'micro-ATX · AM5 · PCIe 4.0' },
        { id: 'mobo-b650', name: 'MSI B650 Tomahawk WiFi', price: 189, chip: 'ATX · AM5 · PCIe 4.0' },
        { id: 'mobo-b650e', name: 'ASUS ROG Strix B650E-F', price: 249, chip: 'ATX · AM5 · PCIe 5.0 ready' },
        { id: 'mobo-x670', name: 'Gigabyte X670 Aorus Elite', price: 289, chip: 'ATX · AM5 · dual PCIe 5.0' },
        { id: 'mobo-x670e', name: 'ASRock X670E Taichi', price: 399, chip: 'E-ATX · AM5 · flagship VRM' },
        { id: 'mobo-x870e', name: 'ASUS ROG Crosshair X870E', price: 499, chip: 'E-ATX · AM5 · USB4 ready' },
        { id: 'mobo-b760', name: 'MSI B760 Tomahawk', price: 169, chip: 'ATX · LGA1700 · DDR5' },
        { id: 'mobo-z790', name: 'MSI Z790 Tomahawk WiFi', price: 299, chip: 'ATX · LGA1700 · overclocking' },
        { id: 'mobo-b860', name: 'MSI B860 Tomahawk WiFi', price: 199, chip: 'ATX · LGA1851 · Core Ultra' },
        { id: 'mobo-z890', name: 'ASUS ROG Strix Z890-E', price: 329, chip: 'ATX · LGA1851 · Core Ultra' },
        { id: 'mobo-z890h', name: 'ASUS ROG Maximus Z890 Hero', price: 499, chip: 'E-ATX · LGA1851 · flagship' }
      ]
    }
  ];

  JORN.presets = [
    { id: 'starter', label: 'Starter', chip: 'Solid 1080p', sel: { cpu: 'cpu-7500f', motherboard: 'mobo-b650', gpu: 'gpu-rtx5060', ram: 'ram-d5-16', storage: 'ssd-1', cooling: 'cool-air', case: 'case-air', psu: 'psu-650' } },
    { id: 'gaming', label: 'Gaming', chip: '1440p sweet spot', sel: { cpu: 'cpu-9800x3d', motherboard: 'mobo-x670', gpu: 'gpu-rtx5070ti', ram: 'ram-d5-32', storage: 'ssd-2', cooling: 'cool-aio-240', case: 'case-vista', psu: 'psu-850' } },
    { id: 'creator', label: 'Creator', chip: 'Heavy workloads', sel: { cpu: 'cpu-9950x3d', motherboard: 'mobo-x870e', gpu: 'gpu-rtx5080', ram: 'ram-d5-96', storage: 'ssd-4', cooling: 'cool-aio-360', case: 'case-tower', psu: 'psu-1200' } },
    { id: 'extreme', label: 'Extreme', chip: 'No-compromise 4K', sel: { cpu: 'cpu-i9-14900k', motherboard: 'mobo-z890h', gpu: 'gpu-rtx5090', ram: 'ram-d5-128', storage: 'ssd-2g5', cooling: 'cool-aio-360lcd', case: 'case-panorama', psu: 'psu-1200t' } }
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