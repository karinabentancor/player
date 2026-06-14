document.addEventListener('DOMContentLoaded', () => {

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

  const modal = document.getElementById('modal');
  const modalInfo = document.getElementById('modal-info');
  const modalConfirm = document.getElementById('modal-confirm');
  const modalClose = document.getElementById('modalClose');
  const confirmClose = document.getElementById('confirmClose');
  const confirmDoneBtn = document.getElementById('confirm-done-btn');
  const modalBuyBtn = document.getElementById('modal-buy-btn');
  const counterMinus = document.getElementById('counter-minus');
  const counterPlus = document.getElementById('counter-plus');
  const counterVal = document.getElementById('counter-val');
  const mTotal = document.getElementById('m-total');

  let currentPrice = 0;
  let qty = 1;

  function updateTotal() {
    const base = currentPrice * qty;
    const total = couponApplied ? Math.round(base * 0.9) : base;
    mTotal.textContent = '$' + total.toLocaleString('es-UY');
  }

  counterMinus.addEventListener('click', () => {
    if (qty > 1) {
      qty--;
      counterVal.textContent = qty;
      updateTotal();
    }
  });

  counterPlus.addEventListener('click', () => {
    if (qty < 10) {
      qty++;
      counterVal.textContent = qty;
      updateTotal();
    }
  });

  const couponToggle = document.getElementById('coupon-toggle');
  const couponArrow = document.getElementById('coupon-arrow');
  const couponBox = document.getElementById('coupon-box');
  const couponMsg = document.getElementById('coupon-msg');
  const couponDigits = document.querySelectorAll('.coupon-digit');

  let couponApplied = false;
  const VALID_COUPON = '123456';

  couponToggle.addEventListener('click', () => {
    couponBox.classList.toggle('open');
    couponArrow.classList.toggle('open');
    if (couponBox.classList.contains('open')) {
      couponDigits[0].focus();
    }
  });

  couponDigits.forEach((input, i) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9]/g, '').slice(0, 1);
      if (input.value && i < couponDigits.length - 1) {
        couponDigits[i + 1].focus();
      }
      const code = Array.from(couponDigits).map(d => d.value).join('');
      if (code.length === 6) {
        if (code === VALID_COUPON && !couponApplied) {
          couponApplied = true;
          couponMsg.textContent = '10% de descuento aplicado';
          couponMsg.className = 'coupon-msg ok';
          updateTotal();
        } else if (code !== VALID_COUPON) {
          couponApplied = false;
          couponMsg.textContent = 'Cupón inválido';
          couponMsg.className = 'coupon-msg error';
          updateTotal();
        }
      } else {
        if (couponApplied) {
          couponApplied = false;
          updateTotal();
        }
        couponMsg.textContent = '';
        couponMsg.className = 'coupon-msg';
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && i > 0) {
        couponDigits[i - 1].focus();
      }
    });
  });

  const showCards = document.querySelectorAll('.show-card');

  showCards.forEach((card) => {
    card.addEventListener('click', () => {
      qty = 1;
      counterVal.textContent = '1';
      currentPrice = parseInt(card.dataset.price);
      couponApplied = false;
      couponBox.classList.remove('open');
      couponArrow.classList.remove('open');
      couponMsg.textContent = '';
      couponMsg.className = 'coupon-msg';
      couponDigits.forEach(d => d.value = '');

      document.getElementById('m-band').textContent  = card.dataset.band;
      document.getElementById('m-desc').textContent  = card.dataset.desc;
      document.getElementById('m-genre').textContent = card.dataset.genre;
      document.getElementById('m-date').textContent  = card.dataset.date;
      updateTotal();

      modalInfo.style.display = '';
      modalConfirm.style.display = 'none';
      modal.classList.add('open');
    });
  });

  modalBuyBtn.addEventListener('click', () => {
    document.getElementById('c-band').textContent  = document.getElementById('m-band').textContent;
    document.getElementById('c-date').textContent  = document.getElementById('m-date').textContent;
    document.getElementById('c-qty').textContent   = qty + (qty === 1 ? ' entrada' : ' entradas');
    document.getElementById('c-total').textContent = mTotal.textContent;

    modalInfo.style.display = 'none';
    modalConfirm.style.display = '';
  });

  function closeModal() {
    modal.classList.remove('open');
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (confirmClose) confirmClose.addEventListener('click', closeModal);
  if (confirmDoneBtn) confirmDoneBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

});