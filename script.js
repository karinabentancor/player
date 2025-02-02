document.addEventListener('DOMContentLoaded', () => {
  const playButtons = document.querySelectorAll('.btn-dark');

  playButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const artistNumber = index + 1;
      const audioPath = `audio/artist${artistNumber}/placebo - karina bentancor.wav`;

      let audioPlayer = document.getElementById('audio-player');
      if (!audioPlayer) {
        audioPlayer = document.createElement('audio');
        audioPlayer.id = 'audio-player';
        document.body.appendChild(audioPlayer);
      }

      if (audioPlayer.src.includes(audioPath)) {
        if (!audioPlayer.paused) {
          audioPlayer.pause();
          button.textContent = "▶ Reproducir";
        } else {
          audioPlayer.play();
          button.textContent = "⏸ Pausar";
        }
      } else {
        playButtons.forEach((btn) => (btn.textContent = "▶ Reproducir"));
        audioPlayer.pause();
        audioPlayer.src = audioPath;
        audioPlayer.play();
        button.textContent = "⏸ Pausar";
      }

      audioPlayer.onended = () => {
        button.textContent = "▶ Reproducir";
      };
    });
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(function(card) {
    const artistTitle = card.querySelector('h3');

    artistTitle.addEventListener('click', function() {
      // Cambia el nombre del archivo según el artista
      const artistName = artistTitle.textContent.trim().toLowerCase().replace(/\s+/g, '');
      window.location.href = `${artistName}.html`;
    });
  });
});
