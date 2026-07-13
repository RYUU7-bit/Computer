/* =====================================================
   THEME
===================================================== */
const html = document.documentElement;

function getTheme() { return localStorage.getItem('tz-theme') || 'dark'; }
function applyTheme(t) {
  html.setAttribute('data-theme', t);
  localStorage.setItem('tz-theme', t);
  const icon  = t === 'dark' ? '☀️' : '🌙';
  const label = t === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  document.querySelectorAll('.theme-toggle').forEach(b => b.textContent = icon);
  document.querySelectorAll('.theme-toggle-full, #drawer-theme').forEach(b => b.textContent = label);
}
applyTheme(getTheme());
document.querySelectorAll('.theme-toggle, #drawer-theme').forEach(btn => {
  btn.addEventListener('click', () => applyTheme(getTheme() === 'dark' ? 'light' : 'dark'));
});

/* =====================================================
   CART STATE
===================================================== */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('tz-cart') || '[]'); } catch(e) { cart = []; }

function saveCart()      { localStorage.setItem('tz-cart', JSON.stringify(cart)); }
function cartTotal()     { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function cartItemCount() { return cart.reduce((s, i) => s + i.qty, 0); }

function updateCartCount() {
  const n = cartItemCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = n;
    el.style.display = n > 0 ? 'inline-flex' : 'inline-flex';
  });
}

/* ---- ADD TO CART ---- */
function addToCart(productId) {
  if (typeof products === 'undefined') return;
  const product = products.find(p => p.id === +productId);
  if (!product) return;

  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      id:    product.id,
      name:  product.name,
      price: product.price,
      img:   product.img || '',
      qty:   1
    });
  }
  saveCart();
  updateCartCount();
  renderCart();
  openCart();
}

/* ---- RENDER CART ---- */
function renderCart() {
  const container = document.getElementById('cart-items');
  const totalEl   = document.getElementById('cart-total');
  if (!container) return;

  if (!cart.length) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">🛒</div>
        <p>Your cart is empty</p>
        <span>Add some products to get started</span>
      </div>`;
    if (totalEl) totalEl.textContent = '$0';
    return;
  }

  container.innerHTML = '';

  cart.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'cart-item';

    /* thumbnail */
    const thumb = document.createElement('div');
    thumb.className = 'cart-thumb';
    const img = document.createElement('img');
    img.src = item.img || '';
    img.alt = item.name;
    img.onerror = function () {
      this.onerror = null;
      this.style.display = 'none';
      thumb.textContent = '📦';
    };
    thumb.appendChild(img);

    /* details */
    const details = document.createElement('div');
    details.className = 'cart-details';

    const nameEl = document.createElement('div');
    nameEl.className = 'cart-name';
    nameEl.textContent = item.name;

    const priceEl = document.createElement('div');
    priceEl.className = 'cart-price';
    priceEl.textContent = '$' + item.price.toLocaleString();

    /* qty row */
    const qtyRow = document.createElement('div');
    qtyRow.className = 'cart-qty-row';

    const btnMinus = document.createElement('button');
    btnMinus.type = 'button';
    btnMinus.className = 'cart-qty-btn';
    btnMinus.textContent = '−';
    btnMinus.setAttribute('aria-label', 'Decrease quantity');
    btnMinus.onclick = () => changeQty(idx, -1);

    const qtySpan = document.createElement('span');
    qtySpan.className = 'cart-qty-num';
    qtySpan.textContent = item.qty;

    const btnPlus = document.createElement('button');
    btnPlus.type = 'button';
    btnPlus.className = 'cart-qty-btn';
    btnPlus.textContent = '+';
    btnPlus.setAttribute('aria-label', 'Increase quantity');
    btnPlus.onclick = () => changeQty(idx, 1);

    qtyRow.append(btnMinus, qtySpan, btnPlus);
    details.append(nameEl, priceEl, qtyRow);

    /* subtotal */
    const subtotal = document.createElement('div');
    subtotal.className = 'cart-subtotal';
    subtotal.textContent = '$' + (item.price * item.qty).toLocaleString();

    /* remove button */
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'cart-remove-btn';
    removeBtn.innerHTML = '🗑';
    removeBtn.setAttribute('aria-label', 'Remove item');
    removeBtn.onclick = () => removeFromCart(idx);

    row.append(thumb, details, subtotal, removeBtn);
    container.appendChild(row);
  });

  if (totalEl) totalEl.textContent = '$' + cartTotal().toLocaleString();
}

function changeQty(idx, delta) {
  if (!cart[idx]) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart();
  updateCartCount();
  renderCart();
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  saveCart();
  updateCartCount();
  renderCart();
}

/* =====================================================
   CART PANEL OPEN / CLOSE
===================================================== */
function openCart() {
  document.getElementById('cart-panel')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cart-panel')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('cart-btn')?.addEventListener('click', openCart);
document.getElementById('cart-close')?.addEventListener('click', closeCart);
document.getElementById('cart-overlay')?.addEventListener('click', e => {
  if (e.target.id === 'cart-overlay') closeCart();
});

/* =====================================================
   MOBILE DRAWER
===================================================== */
function openDrawer() {
  document.getElementById('drawer')?.classList.add('open');
  document.getElementById('drawer-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  document.getElementById('drawer')?.classList.remove('open');
  document.getElementById('drawer-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('hamburger')?.addEventListener('click', openDrawer);
document.getElementById('drawer-close')?.addEventListener('click', closeDrawer);
document.getElementById('drawer-overlay')?.addEventListener('click', e => {
  if (e.target.id === 'drawer-overlay') closeDrawer();
});

/* =====================================================
   ESC KEY
===================================================== */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeCart(); closeDrawer(); }
});

/* =====================================================
   NAVBAR SHRINK ON SCROLL
===================================================== */
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  if (!nb) return;
  nb.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* =====================================================
   HERO SLIDESHOW
===================================================== */
(function initSlideshow() {
  const slides  = document.querySelectorAll('#slideshow .slide');
  const dots    = document.querySelectorAll('#slide-dots .dot');
  const prevBtn = document.getElementById('slide-prev');
  const nextBtn = document.getElementById('slide-next');
  if (!slides.length) return;

  let cur = 0, timer;

  function goTo(n) {
    slides[cur].classList.remove('active');
    dots[cur]?.classList.remove('active');
    cur = ((n % slides.length) + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur]?.classList.add('active');
  }
  function startAuto() { clearInterval(timer); timer = setInterval(() => goTo(cur + 1), 5000); }

  prevBtn?.addEventListener('click', () => { goTo(cur - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(cur + 1); startAuto(); });
  dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.index); startAuto(); }));

  let tx = 0;
  const ss = document.getElementById('slideshow');
  ss?.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  ss?.addEventListener('touchend', e => {
    const diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) { diff > 0 ? goTo(cur + 1) : goTo(cur - 1); startAuto(); }
  });

  startAuto();
})();

/* =====================================================
   CATEGORY HERO AUTO SLIDE
===================================================== */
(function initCatHero() {
  const slides = document.querySelectorAll('.cat-hero-slide');
  if (!slides.length) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 3500);
})();

/* =====================================================
   PRODUCT DETAIL MODAL
===================================================== */
const CAT_COLORS = {
  laptop:    { bg: '#eff6ff', color: '#2563eb' },
  desktop:   { bg: '#f0fdf4', color: '#16a34a' },
  accessory: { bg: '#fff7ed', color: '#ea580c' },
  component: { bg: '#fdf4ff', color: '#9333ea' }
};

function openModal(product) {
  const overlay = document.getElementById('modal-overlay');
  const body    = document.getElementById('modal-body');
  if (!overlay || !body) return;

  const s  = CAT_COLORS[product.category] || { bg: '#f1f5f9', color: '#475569' };
  const ph = (typeof buildPlaceholder === 'function')
    ? buildPlaceholder(product)
    : 'https://placehold.co/640x300/1e293b/94a3b8?text=' + encodeURIComponent(product.name);

  body.innerHTML = '';

  const mImg = document.createElement('img');
  mImg.className = 'modal-img';
  mImg.alt = product.name;
  mImg.src = product.img || ph;
  mImg.onerror = function () { this.onerror = null; this.src = ph; };

  const mInfo = document.createElement('div');
  mInfo.className = 'modal-info';

  const badge = document.createElement('span');
  badge.className = 'modal-cat';
  badge.textContent = product.category;
  badge.style.background = s.bg;
  badge.style.color = s.color;

  const nameEl = document.createElement('h2');
  nameEl.className = 'modal-name';
  nameEl.textContent = product.name;

  const descEl = document.createElement('p');
  descEl.className = 'modal-desc';
  descEl.textContent = product.desc;

  const priceEl = document.createElement('div');
  priceEl.className = 'modal-price';
  priceEl.textContent = '$' + product.price.toLocaleString();

  const actions = document.createElement('div');
  actions.className = 'modal-actions';

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'btn-primary';
  addBtn.textContent = '🛒 Add to Cart';
  addBtn.addEventListener('click', () => { addToCart(product.id); closeModal(); });

  const continueBtn = document.createElement('button');
  continueBtn.type = 'button';
  continueBtn.className = 'btn-secondary';
  continueBtn.textContent = 'Continue Shopping';
  continueBtn.addEventListener('click', closeModal);

  actions.append(addBtn, continueBtn);
  mInfo.append(badge, nameEl, descEl, priceEl, actions);
  body.append(mImg, mInfo);

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('modal-close')?.addEventListener('click', closeModal);
document.getElementById('modal-overlay')?.addEventListener('click', e => {
  if (e.target.id === 'modal-overlay') closeModal();
});

/* =====================================================
   FEATURED PRODUCTS — Home
===================================================== */
const featuredContainer = document.getElementById('featured-products');
if (featuredContainer && typeof products !== 'undefined') {
  products.filter(p => p.featured).forEach(p => featuredContainer.appendChild(createProductCard(p)));

  featuredContainer.addEventListener('click', e => {
    const addBtn = e.target.closest('.btn-add-cart');
    if (addBtn) {
      e.stopPropagation();
      addToCart(+addBtn.dataset.id);
      addBtn.textContent = '✓ Added!';
      addBtn.style.background = '#22c55e';
      setTimeout(() => { addBtn.textContent = 'Add to Cart'; addBtn.style.background = ''; }, 1500);
      return;
    }
    const card = e.target.closest('.product-card');
    if (card) {
      const pid = +card.dataset.productId;
      const p   = products.find(x => x.id === pid);
      if (p) openModal(p);
    }
  });
}

/* =====================================================
   STAT COUNTERS — About
===================================================== */
(function initStats() {
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const big    = target >= 1000;
      const end    = big ? target / 1000 : target;
      let cur = 0;
      const tick = setInterval(() => {
        cur += end / 50;
        if (cur >= end) { cur = end; clearInterval(tick); }
        el.textContent = Math.round(cur) + (big ? 'K+' : '+');
      }, 20);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
})();

/* =====================================================
   INIT
===================================================== */
updateCartCount();
renderCart();
