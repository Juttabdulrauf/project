
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
});

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(r => io.observe(r));

const hero = document.querySelector('.hero-images');
if (hero) {
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const img1 = hero.querySelector('.img-1');
    const img2 = hero.querySelector('.img-2');
    img1.style.transform = `translate(${x * 12}px, ${y * 6}px) rotate(-3deg)`;
    img2.style.transform = `translate(${x * -10}px, ${y * -6}px) rotate(3deg)`;
  });
  hero.addEventListener('mouseleave', () => {
    const img1 = hero.querySelector('.img-1');
    const img2 = hero.querySelector('.img-2');
    img1.style.transform = '';
    img2.style.transform = '';
  });
}

document.querySelectorAll('.nav-list a').forEach(a => a.addEventListener('click', () => {
  if (nav.classList.contains('open')) {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
  }
}));
