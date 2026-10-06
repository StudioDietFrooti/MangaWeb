// Audio player utility with Web Audio synthesizer fallback and HTML5 audio support

let currentAudio: HTMLAudioElement | null = null;
let audioContext: AudioContext | null = null;
let synthInterval: number | null = null;

export function stopCurrentAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
}

export function playSynthMelody(songName: string) {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioContext) {
      audioContext = new AudioCtx();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const pentatonicNotes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
    let noteIndex = 0;

    const playTone = (freq: number, duration: number) => {
      if (!audioContext) return;
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);

      gain.gain.setValueAtTime(0.12, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + duration);
    };

    if (synthInterval) clearInterval(synthInterval);

    // Initial chord
    playTone(261.63, 1.2);
    playTone(392.0, 1.5);

    synthInterval = window.setInterval(() => {
      const note = pentatonicNotes[noteIndex % pentatonicNotes.length];
      playTone(note, 0.8);
      noteIndex = (noteIndex + 1) % pentatonicNotes.length;
    }, 700);
  } catch (err) {
    console.warn('Web Audio playback note:', err);
  }
}

export function playAudioUrl(
  url: string,
  onEnded: () => void,
  onError: () => void
): HTMLAudioElement {
  stopCurrentAudio();
  const audio = new Audio(url);
  currentAudio = audio;
  audio.volume = 0.85;

  audio.onended = () => {
    onEnded();
  };

  audio.onerror = () => {
    onError();
  };

  audio.play().catch(() => {
    onError();
  });

  return audio;
}
