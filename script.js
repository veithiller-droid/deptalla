const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const preview = document.querySelector('.service-preview');
const previewImg = preview?.querySelector('img');
document.querySelectorAll('.service-row').forEach(row => {
  row.addEventListener('mouseenter', () => {
    if (!preview || !previewImg) return;
    previewImg.src = row.dataset.image;
    preview.classList.add('show');
  });
  row.addEventListener('mousemove', e => {
    if (!preview) return;
    preview.style.left = `${Math.min(window.innerWidth - 320, e.clientX + 24)}px`;
    preview.style.top = `${Math.min(window.innerHeight - 230, e.clientY + 24)}px`;
  });
  row.addEventListener('mouseleave', () => preview?.classList.remove('show'));
});

const imageBreak = document.querySelector('.image-break img');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (imageBreak && !reduced) {
  window.addEventListener('scroll', () => {
    const box = imageBreak.parentElement.getBoundingClientRect();
    if (box.bottom > 0 && box.top < window.innerHeight) {
      imageBreak.style.setProperty('--parallax', `${box.top * -0.06}px`);
    }
  }, { passive: true });
}


const hero = document.querySelector('.hero');
const powerSwitch = document.querySelector('#powerSwitch');
const powerLabel = powerSwitch?.querySelector('.power-label');
const ambientRange = document.querySelector('#ambientRange');
const ambientValue = document.querySelector('#ambientValue');

function setAmbient(value) {
  const n = Math.max(20, Math.min(100, Number(value) || 78));
  if (!hero) return;

  // 20 = kühl/dunkler, 100 = warm/hell.
  const t = (n - 20) / 80;
  const brightness = 0.48 + (t * 0.62);
  const saturation = 0.72 + (t * 0.42);
  const sepia = 0.02 + (t * 0.20);
  const hue = -12 + (t * 28);
  const dark = 0.76 - (t * 0.34);
  const glow = 0.12 + (t * 0.42);

  // Akzentfarbe wandert von kühlem Cyan/Grün zu warmem Gelb/Orange.
  const r = Math.round(80 + (t * 175));
  const g = Math.round(220 + (t * 25));
  const b = Math.round(255 - (t * 210));

  hero.style.setProperty('--hero-brightness', brightness.toFixed(2));
  hero.style.setProperty('--hero-saturation', saturation.toFixed(2));
  hero.style.setProperty('--hero-sepia', sepia.toFixed(2));
  hero.style.setProperty('--hero-hue', `${hue.toFixed(1)}deg`);
  hero.style.setProperty('--hero-dark', dark.toFixed(2));
  hero.style.setProperty('--glow-alpha', glow.toFixed(2));
  hero.style.setProperty('--ambient-color', `${r},${g},${b}`);

  if (ambientValue) ambientValue.textContent = `${n}%`;
}
ambientRange?.addEventListener('input', e => setAmbient(e.target.value));
setAmbient(ambientRange?.value || 78);

powerSwitch?.addEventListener('click', () => {
  if (!hero) return;
  const isOff = hero.classList.toggle('light-off');
  powerSwitch.setAttribute('aria-pressed', String(!isOff));
  if (powerLabel) powerLabel.textContent = isOff ? 'LICHT AUS' : 'LICHT AN';
});

function toggleProjectLight(card) {
  const lit = card.classList.toggle('is-lit');
  card.setAttribute('aria-pressed', String(lit));
}
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => toggleProjectLight(card));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleProjectLight(card);
    }
  });
});
