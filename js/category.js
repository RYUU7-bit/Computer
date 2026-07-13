/* =====================================================
   CATEGORY PAGE — filter, search, sort
===================================================== */
const categoryContainer = document.getElementById('category-products');
const catIconCards      = document.querySelectorAll('.cat-icon-card');
const searchInput       = document.getElementById('product-search');
const sortSelect        = document.getElementById('sort-select');
const productCount      = document.getElementById('product-count');

let activeFilter = 'all';
let searchQuery  = '';
let sortOrder    = 'default';

function getSorted(arr) {
  const copy = [...arr];
  if (sortOrder === 'price-asc')  return copy.sort((a, b) => a.price - b.price);
  if (sortOrder === 'price-desc') return copy.sort((a, b) => b.price - a.price);
  if (sortOrder === 'name-asc')   return copy.sort((a, b) => a.name.localeCompare(b.name));
  return copy;
}

function renderProducts() {
  if (!categoryContainer) return;

  let list = activeFilter === 'all' ? [...products] : products.filter(p => p.category === activeFilter);

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.category.includes(q)
    );
  }

  list = getSorted(list);

  if (productCount) {
    productCount.textContent = `${list.length} product${list.length !== 1 ? 's' : ''}`;
  }

  categoryContainer.innerHTML = '';

  if (!list.length) {
    const msg = document.createElement('p');
    msg.style.cssText = 'text-align:center;color:var(--text-soft);padding:60px;grid-column:1/-1;font-size:1.05rem;';
    msg.textContent = '😕 No products found.';
    categoryContainer.appendChild(msg);
    return;
  }

  /* createProductCard now handles both add-to-cart click and modal click internally */
  list.forEach(p => categoryContainer.appendChild(createProductCard(p)));
}

/* ---- category filter buttons ---- */
catIconCards.forEach(card => {
  card.addEventListener('click', () => {
    catIconCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    activeFilter = card.dataset.filter;
    renderProducts();
  });
});

/* ---- live search ---- */
searchInput?.addEventListener('input', e => {
  searchQuery = e.target.value.trim();
  renderProducts();
});

/* ---- sort ---- */
sortSelect?.addEventListener('change', e => {
  sortOrder = e.target.value;
  renderProducts();
});

/* ---- URL param  (?filter=laptop) ---- */
const urlFilter = new URLSearchParams(window.location.search).get('filter');
if (urlFilter) {
  const match = document.querySelector(`.cat-icon-card[data-filter="${urlFilter}"]`);
  if (match) {
    catIconCards.forEach(c => c.classList.remove('active'));
    match.classList.add('active');
  }
  activeFilter = urlFilter;
}

renderProducts();
