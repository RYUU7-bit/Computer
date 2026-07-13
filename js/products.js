// ===========================
//  PRODUCTS DATA
//  Each product has a guaranteed-working placeholder image
//  + a real Unsplash photo that loads if available
// ===========================

// Inline SVG icons per category (always render, no network needed)
const catSVG = {
  laptop: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" fill="none">
    <rect x="8" y="6" width="64" height="40" rx="4" fill="#334155"/>
    <rect x="12" y="10" width="56" height="32" rx="2" fill="#0ea5e9"/>
    <rect x="20" y="16" width="40" height="20" rx="1" fill="#1e40af" opacity=".5"/>
    <rect x="2" y="47" width="76" height="6" rx="3" fill="#475569"/>
    <rect x="28" y="47" width="24" height="3" rx="1.5" fill="#64748b"/>
  </svg>`,

  desktop: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" fill="none">
    <rect x="6" y="4" width="68" height="44" rx="4" fill="#1e293b"/>
    <rect x="10" y="8" width="60" height="36" rx="2" fill="#0ea5e9"/>
    <rect x="16" y="13" width="48" height="26" rx="1" fill="#1e40af" opacity=".5"/>
    <rect x="30" y="49" width="20" height="5" rx="2" fill="#475569"/>
    <rect x="20" y="54" width="40" height="3" rx="1.5" fill="#334155"/>
  </svg>`,

  accessory: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" fill="none">
    <rect x="8" y="20" width="64" height="22" rx="4" fill="#334155"/>
    <rect x="12" y="24" width="8" height="8" rx="1.5" fill="#0ea5e9"/>
    <rect x="22" y="24" width="8" height="8" rx="1.5" fill="#7c3aed"/>
    <rect x="32" y="24" width="8" height="8" rx="1.5" fill="#ea580c"/>
    <rect x="42" y="24" width="8" height="8" rx="1.5" fill="#16a34a"/>
    <rect x="52" y="24" width="16" height="8" rx="1.5" fill="#475569"/>
    <rect x="12" y="34" width="12" height="5" rx="1" fill="#475569"/>
    <rect x="26" y="34" width="8" height="5" rx="1" fill="#475569"/>
    <rect x="36" y="34" width="8" height="5" rx="1" fill="#475569"/>
    <rect x="46" y="34" width="8" height="5" rx="1" fill="#475569"/>
    <rect x="56" y="34" width="12" height="5" rx="1" fill="#475569"/>
  </svg>`,

  component: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" fill="none">
    <rect x="10" y="10" width="60" height="40" rx="3" fill="#1e293b"/>
    <rect x="16" y="16" width="22" height="14" rx="2" fill="#0ea5e9"/>
    <rect x="42" y="16" width="22" height="14" rx="2" fill="#7c3aed"/>
    <rect x="16" y="34" width="48" height="8" rx="2" fill="#334155"/>
    <rect x="20" y="37" width="6" height="2" rx="1" fill="#0ea5e9"/>
    <rect x="28" y="37" width="6" height="2" rx="1" fill="#0ea5e9"/>
    <rect x="36" y="37" width="6" height="2" rx="1" fill="#7c3aed"/>
    <rect x="44" y="37" width="6" height="2" rx="1" fill="#7c3aed"/>
    <rect x="52" y="37" width="6" height="2" rx="1" fill="#ea580c"/>
  </svg>`
};

// Product-specific labels for the SVG placeholder
const productEmoji = {
  1:  'LAPTOP',  2:  'APPLE',   3:  'DESKTOP', 4:  'KEYBOARD',
  5:  'MONITOR', 6:  'THINKPAD',7:  'ROG',     8:  'MOUSE',
  9:  'GPU',     10: 'RAM',     11: 'SSD',     12: 'HUB',
  13: 'GAMING',  14: 'CPU',     15: 'HEADSET', 16: 'MINI',
  17: 'PREDATOR',18: 'CURVED',  19: 'RX7800',  20: 'TOWER'
};

const products = [
  // ── LAPTOPS ──────────────────────────────────────────────
  {
    id: 1, name: "Dell XPS 15", category: "laptop", price: 1299,
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    desc: "15.6\" 4K OLED · Intel i7 · 16GB RAM · 512GB SSD", featured: true
  },
  {
    id: 2, name: "MacBook Air M3", category: "laptop", price: 1099,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    desc: "13.6\" Retina · Apple M3 · 8GB RAM · 256GB SSD", featured: true
  },
  {
    id: 6, name: "Lenovo ThinkPad X1", category: "laptop", price: 1499,
    img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80",
    desc: "14\" FHD · Intel i7 · 16GB RAM · Business grade", featured: false
  },
  {
    id: 13, name: "HP OMEN 16 Gaming", category: "laptop", price: 1349,
    img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80",
    desc: "16\" QHD 165Hz · RTX 4060 · AMD Ryzen 7 · 16GB", featured: false
  },
  {
    id: 17, name: "Acer Predator Helios", category: "laptop", price: 1599,
    img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    desc: "17.3\" QHD 240Hz · RTX 4070 · Intel i9 · 32GB", featured: false
  },

  // ── DESKTOPS ─────────────────────────────────────────────
  {
    id: 3, name: "HP Gaming PC", category: "desktop", price: 999,
    img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80",
    desc: "Intel i9 · RTX 4070 · 32GB RAM · 1TB NVMe SSD", featured: true
  },
  {
    id: 7, name: "ASUS ROG Desktop", category: "desktop", price: 1799,
    img: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=600&q=80",
    desc: "AMD Ryzen 9 · RTX 4080 · 64GB RAM · 2TB SSD", featured: false
  },
  {
    id: 16, name: "Mac Mini M4", category: "desktop", price: 699,
    img: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
    desc: "Apple M4 · 16GB RAM · 256GB SSD · Ultra-compact", featured: false
  },
  {
    id: 20, name: "Custom Gaming Tower", category: "desktop", price: 2199,
    img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&q=80",
    desc: "Intel i9-14900K · RTX 4090 · 64GB DDR5 · 4TB NVMe", featured: false
  },

  // ── ACCESSORIES ──────────────────────────────────────────
  {
    id: 4, name: "Mechanical Keyboard", category: "accessory", price: 89,
    img: "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=600&q=80",
    desc: "RGB backlit · Cherry MX Red · TKL layout", featured: true
  },
  {
    id: 5, name: "4K Gaming Monitor", category: "accessory", price: 449,
    img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80",
    desc: "27\" IPS · 144Hz · 1ms response · HDR400", featured: false
  },
  {
    id: 8, name: "Wireless Mouse", category: "accessory", price: 49,
    img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    desc: "Ergonomic · 3000 DPI · 12-month battery", featured: false
  },
  {
    id: 12, name: "USB-C Hub 7-in-1", category: "accessory", price: 39,
    img: "https://images.unsplash.com/photo-1625948515921-8d3c89a3b6de?w=600&q=80",
    desc: "HDMI 4K · 3× USB-A · SD Card · 100W PD", featured: false
  },
  {
    id: 15, name: "Gaming Headset", category: "accessory", price: 79,
    img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80",
    desc: "7.1 Surround · Noise-cancelling mic · 50mm drivers", featured: false
  },
  {
    id: 18, name: "Curved Gaming Monitor", category: "accessory", price: 379,
    img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&q=80",
    desc: "32\" VA Curved · 165Hz · FreeSync Premium", featured: false
  },

  // ── COMPONENTS ───────────────────────────────────────────
  {
    id: 9, name: "RTX 4070 GPU", category: "component", price: 599,
    img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&q=80",
    desc: "12GB GDDR6X · PCIe 4.0 · Ray Tracing · DLSS 3", featured: false
  },
  {
    id: 10, name: "32GB DDR5 RAM Kit", category: "component", price: 129,
    img: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&q=80",
    desc: "16GB×2 · 5600MHz · XMP 3.0 · Intel & AMD", featured: false
  },
  {
    id: 11, name: "1TB NVMe SSD", category: "component", price: 89,
    img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80",
    desc: "Samsung 990 Pro · 7450MB/s · PCIe Gen 4", featured: false
  },
  {
    id: 14, name: "Intel Core i9 CPU", category: "component", price: 419,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    desc: "14th Gen · 24 cores · 5.8GHz boost · LGA 1700", featured: false
  },
  {
    id: 19, name: "AMD Radeon RX 7800 XT", category: "component", price: 499,
    img: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=600&q=80",
    desc: "16GB GDDR6 · PCIe 4.0 · Ray Tracing · RDNA 3", featured: false
  }
];

// ===========================
//  BADGE STYLES
// ===========================
const catStyle = {
  laptop:    { bg: '#eff6ff', color: '#2563eb' },
  desktop:   { bg: '#f0fdf4', color: '#16a34a' },
  accessory: { bg: '#fff7ed', color: '#ea580c' },
  component: { bg: '#fdf4ff', color: '#9333ea' }
};

// ===========================
//  BUILD PLACEHOLDER (SVG + emoji + name)
//  shown instantly, replaced by photo when it loads
// ===========================
function buildPlaceholder(product) {
  const s = catStyle[product.category] || { bg: '#f1f5f9', color: '#475569' };
  const svg = catSVG[product.category] || '';
  const emoji = productEmoji[product.id] || '📦';
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${s.bg}"/>
          <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#g)"/>
      <text x="300" y="170" font-size="80" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
      <text x="300" y="260" font-family="Segoe UI,sans-serif" font-size="22" font-weight="700"
            fill="${s.color}" text-anchor="middle">${product.name}</text>
      <text x="300" y="295" font-family="Segoe UI,sans-serif" font-size="15"
            fill="#64748b" text-anchor="middle">${product.category.toUpperCase()}</text>
    </svg>
  `)}`;
}

// ===========================
//  RENDER PRODUCT CARD
// ===========================
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.category  = product.category;
  card.dataset.productId = product.id;

  const s  = catStyle[product.category] || { bg: '#f1f5f9', color: '#475569' };
  const ph = buildPlaceholder(product);

  /* image */
  const imgWrap = document.createElement('div');
  imgWrap.className = 'product-img';
  const img = document.createElement('img');
  img.alt     = product.name;
  img.loading = 'lazy';
  img.src     = product.img || ph;
  img.onerror = function () { this.onerror = null; this.src = ph; };
  imgWrap.appendChild(img);

  /* info */
  const info = document.createElement('div');
  info.className = 'product-info';

  const badge = document.createElement('span');
  badge.className = 'product-category';
  badge.style.background = s.bg;
  badge.style.color = s.color;
  badge.textContent = product.category;

  const nameEl = document.createElement('h3');
  nameEl.className = 'product-name';
  nameEl.textContent = product.name;

  const descEl = document.createElement('p');
  descEl.className = 'product-desc';
  descEl.textContent = product.desc;

  const footer = document.createElement('div');
  footer.className = 'product-footer';

  const priceEl = document.createElement('span');
  priceEl.className = 'product-price';
  priceEl.textContent = '$' + product.price.toLocaleString();

  /* ADD TO CART button — direct listener, no delegation */
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'btn-add-cart';
  addBtn.dataset.id = product.id;
  addBtn.textContent = 'Add to Cart';
  addBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (typeof addToCart === 'function') {
      addToCart(product.id);
    }
    this.textContent = '✓ Added!';
    this.style.background = '#22c55e';
    const self = this;
    setTimeout(() => { self.textContent = 'Add to Cart'; self.style.background = ''; }, 1500);
  });

  footer.append(priceEl, addBtn);
  info.append(badge, nameEl, descEl, footer);
  card.append(imgWrap, info);

  /* open modal when clicking the card (not the button) */
  card.addEventListener('click', function() {
    if (typeof openModal === 'function') openModal(product);
  });

  return card;
}
