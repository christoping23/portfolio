const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const stored = localStorage.getItem('theme');
if (stored) root.setAttribute('data-theme', stored);
updateIcon();

themeToggle?.addEventListener('click', ()=>{
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon();
});

function updateIcon(){
  const isDark = root.getAttribute('data-theme') === 'dark';
  if (themeToggle) themeToggle.textContent = isDark ? '☀️' : '🌙';
}

// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// JSON-LD Person
const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Your Name',
  jobTitle: 'Etsy E-commerce Specialist',
  url: location.origin,
  sameAs: [
    'https://www.etsy.com/shop/your-shop',
    'https://www.linkedin.com/in/your-handle',
    'https://github.com/your-handle'
  ]
};
document.getElementById('ld-person').textContent = JSON.stringify(person);

// JSON-LD Products sample
const products = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'Product',
      name: 'Minimalist Gold Necklace',
      image: ['/images/product-1.webp'],
      description: 'Handmade minimalist gold necklace with SEO-optimized listing and professional photography.',
      brand: 'Your Shop',
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '310' },
      offers: { '@type': 'Offer', price: '39.00', priceCurrency: 'USD', availability: 'https://schema.org/InStock' }
    },
    {
      '@type': 'Product',
      name: 'Seasonal Mug',
      image: ['/images/product-2.webp'],
      description: 'Seasonal ceramic mug with campaign creative and optimized ads.',
      brand: 'Your Shop',
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '180' },
      offers: { '@type': 'Offer', price: '18.00', priceCurrency: 'USD', availability: 'https://schema.org/InStock' }
    }
  ]
};
document.getElementById('ld-products').textContent = JSON.stringify(products);


