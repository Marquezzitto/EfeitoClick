document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializa Ícones Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Abas (Tabs) da seção de Soluções
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      button.classList.add('active');
      const activeContent = document.getElementById(targetTab);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });

  // 3. Revelação suave ao rolar a página
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // 4. Header: borda com brilho ao rolar
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 12) {
      header.style.borderBottomColor = 'rgba(53, 229, 255, 0.25)';
    } else {
      header.style.borderBottomColor = '';
    }
  });

  // =========================================================================
  // Camada de Segurança Frontend (Anti-Inspect & Anti-Copy Básico)
  // =========================================================================

  // Desativa o menu de contexto (Botão direito do mouse)
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Desativa atalhos comuns de inspeção (F12, Ctrl+U, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+S)
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.key.toLowerCase() === 'u') ||
      (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') ||
      (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') ||
      (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c') ||
      (e.ctrlKey && e.key.toLowerCase() === 's')
    ) {
      e.preventDefault();
      return false;
    }
  });
});