/* ============================================================
       INTRO / ACCESS CONTROL
       ============================================================ */
    const intro = document.getElementById('intro');
    const vault = document.getElementById('vault');
    const enterBtn = document.getElementById('enterBtn');
    const statusText = document.getElementById('status');
    const securityText = document.getElementById('securityText');
    let introReady = false;

    setTimeout(() => {
      if (securityText && statusText) {
        securityText.textContent = 'SECURITY CHECK • VERIFIED';
        statusText.textContent = 'SYSTEM READY';
        introReady = true;
      }
    }, 1100);

    function openPortfolio() {
      if (!introReady || !intro || !vault || !enterBtn) return;
      intro.classList.add('scanning');
      vault.classList.add('opening');
      statusText.textContent = 'ACCESS GRANTED';
      enterBtn.disabled = true;
      enterBtn.textContent = 'OPENING...';

      setTimeout(() => {
        intro.classList.add('hide');
        document.body.classList.add('entered');
        const home = document.getElementById('home');
        if (home) home.scrollIntoView({ behavior: 'smooth' });
      }, 1500);
    }

    if (enterBtn) enterBtn.addEventListener('click', openPortfolio);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && intro && !intro.classList.contains('hide')) {
        openPortfolio();
      }
    });
