document.addEventListener('DOMContentLoaded', () => {
  const playButtons = document.querySelectorAll('.btn-dark');
  let audioPlayer = document.createElement('audio');
  audioPlayer.id = 'audio-player';
  document.body.appendChild(audioPlayer);

  playButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const albumPath = button.getAttribute('data-audio-path');
      console.log("Reproduciendo:", albumPath);

      if (audioPlayer.src.includes(albumPath)) {
        
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
        audioPlayer.src = albumPath;

        audioPlayer.onerror = () => {
          console.error("Error al cargar el archivo:", albumPath);
          alert("No se pudo cargar el audio. Verifica la ruta y el archivo.");
          button.textContent = "▶ Reproducir";
        };

        audioPlayer.play();
        button.textContent = "⏸ Pausar";
      }

      audioPlayer.onended = () => {
        button.textContent = "▶ Reproducir";
      };
    });
  });
});