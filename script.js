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
