document.addEventListener('DOMContentLoaded', () => {

  // ── Audio player ─────────────────────────────────────────
  const audioPlayer = document.createElement('audio');
  audioPlayer.id = 'audio-player';
  document.body.appendChild(audioPlayer);

  const playButtons = document.querySelectorAll('.play-btn');

  playButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const path = button.getAttribute('data-audio-path');

      if (!path) return;

      if (audioPlayer.src.includes(path)) {
        if (!audioPlayer.paused) {
          audioPlayer.pause();
          button.textContent = '▶';
          button.classList.remove('playing');
        } else {
          audioPlayer.play();
          button.textContent = '⏸';
          button.classList.add('playing');
        }
      } else {
        playButtons.forEach((btn) => {
          btn.textContent = '▶';
          btn.classList.remove('playing');
        });
        audioPlayer.pause();
        audioPlayer.src = path;

        audioPlayer.onerror = () => {
          console.error('Error al cargar el archivo:', path);
          alert('No se pudo cargar el audio. Verificá la ruta y el archivo.');
          button.textContent = '▶';
          button.classList.remove('playing');
        };

        audioPlayer.play();
        button.textContent = '⏸';
        button.classList.add('playing');
      }

      audioPlayer.onended = () => {
        button.textContent = '▶';
        button.classList.remove('playing');
      };
    });
  });

  // ── Tabs ─────────────────────────────────────────────────
  const tabs = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('.section');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // ── Dropdown de usuario ──────────────────────────────────
  const avatarBtn = document.getElementById('avatarBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (avatarBtn && dropdownMenu) {
    avatarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      dropdownMenu.classList.remove('open');
    });
  }

  // ── Modal de shows ───────────────────────────────────────
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');

  const showCards = document.querySelectorAll('.show-card');

  showCards.forEach((card) => {
    card.addEventListener('click', () => {
      document.getElementById('m-band').textContent  = card.dataset.band;
      document.getElementById('m-date').textContent  = card.dataset.date + ' · ' + card.dataset.genre;
      document.getElementById('m-desc').textContent  = card.dataset.desc;
      document.getElementById('m-price').textContent = card.dataset.price;
      document.getElementById('m-avail').textContent = card.dataset.avail;
      document.getElementById('m-dur').textContent   = card.dataset.dur;
      modal.classList.add('open');
    });
  });

  // Cerrar modal con botón ✕
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  // Cerrar modal clickeando el overlay
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });

  // Cerrar modal con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.classList.remove('open');
    }
  });

});