// Countdown
function updateCountdown() {
  const target = new Date('2026-08-06T16:00:00');
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '0';
    document.getElementById('cd-hours').textContent = '0';
    document.getElementById('cd-mins').textContent = '0';
    document.getElementById('cd-secs').textContent = '0';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');

  const srEl = document.getElementById('countdown-sr-message');
  if (srEl) {
    const srText = `Contagem regressiva: Faltam ${days} dias, ${hours} horas e ${mins} minutos para o início do evento.`;
    if (srEl.textContent !== srText) {
      srEl.textContent = srText;
    }
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Nav scroll effect
const nav = document.querySelector('nav');
const navToggle = document.querySelector('.nav-hamburger');

const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.padding = '0.75rem 2.5rem';
  } else {
    nav.style.padding = '1rem 2.5rem';
  }

  if (backToTopButton) {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('is-visible');
    } else {
      backToTopButton.classList.remove('is-visible');
    }
  }
});

if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    navToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      navToggle.classList.remove('active');
    });
  });
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.artigo-card, .painel-item, .pat-benefit, .cota-pat-card, .benefit-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// PIX Clipboard Copy Utility
function bindCopyButtons() {
  document.querySelectorAll('.copy-key-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const key = button.getAttribute('data-key');
      const feedback = button.parentElement.querySelector('.copy-feedback');
      try {
        await navigator.clipboard.writeText(key);
        button.classList.add('copied');
        if (feedback) {
          feedback.textContent = 'Copiado!';
          feedback.classList.add('is-visible');
        }
        setTimeout(() => {
          button.classList.remove('copied');
          if (feedback) {
            feedback.textContent = '';
            feedback.classList.remove('is-visible');
          }
        }, 1800);
      } catch (error) {
        if (feedback) {
          feedback.textContent = 'Erro ao copiar';
          feedback.classList.add('is-visible');
        }
      }
    });
  });
}
bindCopyButtons();
