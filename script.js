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
const heroImage = document.querySelector('.hero-image');
const heroOverlay = document.querySelector('.hero-overlay');
const powerSwitch = document.querySelector('#powerSwitch');
const powerLabel = powerSwitch?.querySelector('.power-label');
const ambientRange = document.querySelector('#ambientRange');
const ambientValue = document.querySelector('#ambientValue');

let lightOn = true;

function ambientRGB(t) {
  // cold blue/cyan -> neutral -> warm amber/orange
  const stops = [
    [55, 155, 255],
    [110, 235, 255],
    [230, 245, 210],
    [255, 205, 90],
    [255, 125, 45]
  ];
  const x = Math.max(0, Math.min(1, t)) * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(x));
  const f = x - i;
  return stops[i].map((v, k) => Math.round(v + (stops[i+1][k] - v) * f));
}

function renderLighting() {
  if (!hero) return;
  const n = Math.max(20, Math.min(100, Number(ambientRange?.value || 78)));
  const t = (n - 20) / 80;
  const [r,g,b] = ambientRGB(t);

  hero.style.setProperty('--ambient-color', `${r},${g},${b}`);
  hero.style.setProperty('--ambient-glow', lightOn ? String(0.42 + t * 0.48) : '0');

  // Global light state: the same control now drives the entire site.
  const root = document.documentElement;
  root.style.setProperty('--global-ambient', `${r},${g},${b}`);
  root.style.setProperty('--global-light', lightOn ? String(0.28 + t * 0.72) : '0.06');
  root.style.setProperty('--global-sat', lightOn ? String(0.72 + t * 0.38) : '0.18');
  root.style.setProperty('--global-warm', lightOn ? String((t * 0.34).toFixed(2)) : '0');
  root.style.setProperty('--global-panel', `rgba(${r},${g},${b},${lightOn ? (0.04 + t * 0.08).toFixed(2) : '0.01'})`);
  root.style.setProperty('--global-line', `rgba(${r},${g},${b},${lightOn ? (0.18 + t * 0.26).toFixed(2) : '0.06'})`);
  document.body.classList.toggle('global-light-off', !lightOn);

  if (ambientValue) ambientValue.textContent = `${n}%`;
  hero.classList.toggle('light-off', !lightOn);
  powerSwitch?.setAttribute('aria-pressed', String(lightOn));
  if (powerLabel) powerLabel.textContent = lightOn ? 'LICHT AN' : 'LICHT AUS';

  if (heroImage) {
    if (lightOn) {
      const brightness = 0.72 + t * 0.58;
      const saturation = 0.82 + t * 0.35;
      const sepia = t * 0.22;
      const hue = -18 + t * 35;
      heroImage.style.filter = `brightness(${brightness.toFixed(2)}) saturate(${saturation.toFixed(2)}) sepia(${sepia.toFixed(2)}) hue-rotate(${hue.toFixed(1)}deg)`;
      heroImage.style.opacity = '0.96';
    } else {
      heroImage.style.filter = 'brightness(.12) saturate(.15)';
      heroImage.style.opacity = '.40';
    }
  }

  if (heroOverlay) {
    if (lightOn) {
      const a1 = 0.70 - t * 0.32;
      const a2 = 0.48 - t * 0.26;
      heroOverlay.style.background = `linear-gradient(90deg, rgba(5,7,9,${a1.toFixed(2)}) 0%, rgba(${r},${g},${b},${(0.08 + t*0.12).toFixed(2)}) 58%, rgba(5,7,9,${a2.toFixed(2)}) 100%)`;
    } else {
      heroOverlay.style.background = 'rgba(0,0,0,.88)';
    }
  }
}

ambientRange?.addEventListener('input', renderLighting);
powerSwitch?.addEventListener('click', () => {
  lightOn = !lightOn;
  renderLighting();
});
renderLighting();


// V10 — each image can be switched back on independently, even when the master light is off.
function setLocalLight(zone, on) {
  const button = zone.querySelector('.local-light-switch');
  zone.classList.toggle('local-light-on', on);
  button?.setAttribute('aria-pressed', String(on));
  const label = button?.querySelector('span:last-child');
  if (label) label.textContent = on ? 'LICHT AUS' : 'LICHT AN';
}

document.querySelectorAll('.local-light-zone').forEach(zone => {
  const button = zone.querySelector('.local-light-switch');
  if (!button) return;
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    setLocalLight(zone, !zone.classList.contains('local-light-on'));
  });
});
