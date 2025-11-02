// Mobile nav toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');
const navIndicator = document.querySelector('.nav-indicator');
const navItems = document.querySelectorAll('.nav-link:not(.cta)');
const sections = document.querySelectorAll('main section[id]');
const heroArt = document.querySelector('.hero-art');

function updateIndicator(el){
  if(!navIndicator) return;
  if(!el){navIndicator.style.width='0';return}
  const rect = el.getBoundingClientRect();
  const parentRect = el.parentElement.getBoundingClientRect();
  const left = rect.left - parentRect.left;
  navIndicator.style.transform = `translateX(${left}px)`;
  navIndicator.style.width = `${rect.width}px`;
}

// set indicator to first link on load
if(navItems && navItems.length) updateIndicator(navItems[0]);

navItems.forEach(item=>{
  item.addEventListener('mouseenter', (e)=> updateIndicator(e.currentTarget));
  item.addEventListener('focus', (e)=> updateIndicator(e.currentTarget));
  item.addEventListener('click', ()=>{
    // close mobile nav on click
    if(navLinks) navLinks.classList.remove('open');
  });
});

// reset indicator when mouse leaves nav
const navLinksEl = document.querySelector('.nav-links');
if(navLinksEl) navLinksEl.addEventListener('mouseleave', ()=> updateIndicator(document.querySelector('.nav-link.active') || navItems[0]));

if(mobileToggle) mobileToggle.addEventListener('click', ()=>{
  const open = navLinks.classList.toggle('open');
  mobileToggle.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// sticky behavior: add subtle shadow when scrolled
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 18) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
});

// smooth scroll for nav anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
},{threshold:0.12});
reveals.forEach(r=>obs.observe(r));

// close mobile nav when clicking outside (for small screens)
window.addEventListener('click', (e)=>{
  if(!navLinks || !mobileToggle) return;
  if(navLinks.classList.contains('open') && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)){
    navLinks.classList.remove('open');
    mobileToggle.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded','false');
  }
});

// set footer year
document.getElementById('year').textContent = new Date().getFullYear();

// compute initial indicator after fonts load
window.addEventListener('load', ()=>{
  setTimeout(()=> updateIndicator(document.querySelector('.nav-link.active') || navItems[0]), 80);
});

// keyboard accessibility: allow Esc to close mobile nav
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') navLinks.classList.remove('open');
});

// Active link based on scroll position
const sectionObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = entry.target.id;
      document.querySelectorAll('.nav-link').forEach(l=> l.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if(activeLink) activeLink.classList.add('active');
      updateIndicator(activeLink || navItems[0]);
    }
  });
},{threshold:0.52});
sections.forEach(s=> sectionObserver.observe(s));

// set aria-expanded default
if(mobileToggle) mobileToggle.setAttribute('aria-expanded','false');

// hero art parallax (subtle)
if(heroArt){
  heroArt.addEventListener('mousemove', (e)=>{
    const rect = heroArt.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroArt.style.transform = `rotateY(${x * 3}deg) rotateX(${ -y * 3}deg)`;
  });
  heroArt.addEventListener('mouseleave', ()=> heroArt.style.transform = 'rotateY(0) rotateX(0)');
}
