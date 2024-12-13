document.addEventListener('DOMContentLoaded', () => {
    const artistsLink = document.getElementById('artists-link');
    const homeContent = document.getElementById('home-content');
    const artistsContent = document.getElementById('artists-content');
  
    artistsLink.addEventListener('click', () => {
      homeContent.classList.remove('visible');
      homeContent.classList.add('hidden');
      artistsContent.classList.remove('hidden');
      artistsContent.classList.add('visible');
    });
  });
  