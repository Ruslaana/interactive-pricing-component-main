const slider = document.getElementById('slider');
const toggle = document.getElementById('toggle');
const price = document.getElementById('price');
const pageviews = document.getElementById('pageviews');
const cta = document.querySelector('.cta');

const pricing = [
  { views: '10K', price: 8 },
  { views: '50K', price: 12 },
  { views: '100K', price: 16 },
  { views: '500K', price: 24 },
  { views: '1M', price: 36 },
];

function animatePrice(from, to, duration = 500) {
  let start = null;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const val = Math.min(from + (to - from) * (progress / duration), to);
    price.textContent = `$${val.toFixed(2)}`;
    if (progress < duration) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}

function updateSliderBackground(percent) {
  slider.style.setProperty('--slider-percent', `${percent}%`);
}

function updateUI() {
  const index = parseInt(slider.value);
  const isYearly = toggle.checked;
  const basePrice = pricing[index].price;
  const finalPrice = isYearly ? basePrice * 0.75 : basePrice;

  pageviews.textContent = `${pricing[index].views} Pageviews`;
  const currentPrice = parseFloat(price.textContent.replace('$', '')) || 0;
  animatePrice(currentPrice, finalPrice);

  const percent = (index / (pricing.length - 1)) * 100;
  updateSliderBackground(percent);

  slider.setAttribute('aria-valuenow', index);
}

cta.addEventListener('click', e => {
  e.preventDefault();
  alert(
    `You selected the plan: ${pageviews.textContent} at price ${price.textContent}`,
  );
});

slider.addEventListener('input', updateUI);
toggle.addEventListener('change', updateUI);
window.addEventListener('DOMContentLoaded', updateUI);
