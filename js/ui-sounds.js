/* IRFANA.E UI SOUND LAYER
   ENTER/access sounds are separate from the quiet website interaction clicks.
*/
(() => {
  let ctx = null;

  function ensureAudio() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, duration, volume, type = 'sine', endFreq = null, delay = 0) {
    const audio = ensureAudio();
    if (!audio) return;
    const now = audio.currentTime + delay;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    const filter = audio.createBiquadFilter();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
    filter.type = 'lowpass';
    filter.frequency.value = 2800;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(filter).connect(gain).connect(audio.destination);
    osc.start(now);
    osc.stop(now + duration + 0.01);
  }

  function enterSequence() {
    const audio = ensureAudio();
    if (!audio) return;
    // Clean, audible futuristic ENTER click.
    tone(920, 0.075, 0.18, 'sine', 620);
    // Three restrained verification pings while the existing animation runs.
    tone(1250, 0.06, 0.075, 'sine', 1050, 0.20);
    tone(1450, 0.06, 0.075, 'sine', 1180, 0.48);
    tone(1600, 0.06, 0.075, 'sine', 1320, 0.76);
    // Soft access-granted confirmation near the end of the 1.5s opening animation.
    tone(660, 0.20, 0.12, 'sine', 880, 1.18);
  }

  function softClick() {
    tone(1050, 0.065, 0.16, 'sine', 720);
  }

  document.addEventListener('click', (event) => {
    const target = event.target.closest('button, a, [role="button"], input[type="button"], input[type="submit"]');
    if (!target) return;
    if (target.id === 'enterBtn') {
      enterSequence();
      return;
    }
    softClick();
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const target = document.activeElement;
    if (target && target.id === 'enterBtn') enterSequence();
  }, true);
})();
