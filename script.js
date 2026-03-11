
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');
const filterButtons = document.querySelectorAll('.filter-button');
const projects = document.querySelectorAll('.project-card');
const form = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');
const typingText = document.getElementById('typing-text');
const yearElement = document.getElementById('year');
const revealSections = document.querySelectorAll('.reveal');
const backToTop = document.getElementById('back-to-top');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    projects.forEach((project) => {
      const matches = filter === 'all' || project.dataset.category === filter;
      project.classList.toggle('hide', !matches);
    });
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    formMessage.textContent = 'Please fill in all required fields correctly.';
    return;
  }

  formMessage.textContent = 'Thanks! Your message has been submitted successfully.';
  form.reset();
});

const phrases = [
  'Java Full Stack Developer',
  'Final Year CSE Student',
  'Building impactful and scalable web apps'
];

let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];

  if (!deleting) {
    characterIndex += 1;
    typingText.textContent = currentPhrase.slice(0, characterIndex);

    if (characterIndex === currentPhrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1300);
      return;
    }
  } else {
    characterIndex -= 1;
    typingText.textContent = currentPhrase.slice(0, characterIndex);

    if (characterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = deleting ? 40 : 80;
  setTimeout(typeLoop, speed);
}

typeLoop();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

revealSections.forEach((section) => revealObserver.observe(section));

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 350);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

yearElement.textContent = String(new Date().getFullYear());
