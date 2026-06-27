const header = document.querySelector('.site-header');
const nav = document.querySelector('.site-nav');
const navToggle = document.querySelector('.nav-toggle');
const yearSpans = document.querySelectorAll('[data-year]');

if (yearSpans.length) {
  const year = new Date().getFullYear();
  yearSpans.forEach((node) => {
    node.textContent = String(year);
  });
}

const onScroll = () => {
  if (!header) return;
  if (window.scrollY > 22) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
};

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  reveals.forEach((item) => observer.observe(item));
}

const heroCard = document.querySelector('.hero-card');
if (heroCard) {
  const handleMove = (event) => {
    const rect = heroCard.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    heroCard.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  };

  const handleLeave = () => {
    heroCard.style.transform = 'perspective(900px) rotateY(-6deg)';
  };

  heroCard.addEventListener('mousemove', handleMove);
  heroCard.addEventListener('mouseleave', handleLeave);
}

const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a').forEach((link) => {
  const href = link.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html')) {
    link.setAttribute('aria-current', 'page');
  }
});
