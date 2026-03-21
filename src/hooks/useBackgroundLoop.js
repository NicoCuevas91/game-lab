import { useEffect, useRef } from 'react';

const LOOP_PATTERN = [
  { frequency: 261.63, duration: 0.34 },
  { frequency: 329.63, duration: 0.34 },
  { frequency: 392.0, duration: 0.34 },
  { frequency: 523.25, duration: 0.48 },
  { frequency: 392.0, duration: 0.34 },
  { frequency: 329.63, duration: 0.34 },
  { frequency: 293.66, duration: 0.48 },
  { frequency: 349.23, duration: 0.34 },
];

function playNote(audioContext, destination, frequency, startTime, duration) {
  const oscillator = audioContext.createOscillator();
  const overtone = audioContext.createOscillator();
  const noteGain = audioContext.createGain();

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(frequency, startTime);

  overtone.type = 'sine';
  overtone.frequency.setValueAtTime(frequency * 1.5, startTime);

  noteGain.gain.setValueAtTime(0.0001, startTime);
  noteGain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.04);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(noteGain);
  overtone.connect(noteGain);
  noteGain.connect(destination);

  oscillator.start(startTime);
  overtone.start(startTime);
  oscillator.stop(startTime + duration + 0.05);
  overtone.stop(startTime + duration + 0.05);
}

export function useBackgroundLoop(enabled, volume) {
  const audioContextRef = useRef(null);
  const masterGainRef = useRef(null);
  const schedulerRef = useRef(null);
  const nextNoteTimeRef = useRef(0);
  const noteIndexRef = useRef(0);

  const stopLoop = () => {
    if (schedulerRef.current) {
      window.clearInterval(schedulerRef.current);
      schedulerRef.current = null;
    }

    const audioContext = audioContextRef.current;
    const masterGain = masterGainRef.current;

    if (audioContext && masterGain) {
      masterGain.gain.cancelScheduledValues(audioContext.currentTime);
      masterGain.gain.setTargetAtTime(0.0001, audioContext.currentTime, 0.12);
    }
  };

  const ensureAudioGraph = () => {
    if (typeof window === 'undefined') {
      return null;
    }

    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) {
        return null;
      }

      const audioContext = new AudioContextClass();
      const masterGain = audioContext.createGain();

      masterGain.gain.value = 0.0001;
      masterGain.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      masterGainRef.current = masterGain;
    }

    return audioContextRef.current;
  };

  const scheduleNotes = () => {
    const audioContext = audioContextRef.current;
    const masterGain = masterGainRef.current;

    if (!audioContext || !masterGain) {
      return;
    }

    while (nextNoteTimeRef.current < audioContext.currentTime + 1.2) {
      const note = LOOP_PATTERN[noteIndexRef.current % LOOP_PATTERN.length];
      playNote(audioContext, masterGain, note.frequency, nextNoteTimeRef.current, note.duration);
      nextNoteTimeRef.current += note.duration;
      noteIndexRef.current += 1;
    }
  };

  useEffect(() => {
    const audioContext = audioContextRef.current;
    const masterGain = masterGainRef.current;

    if (!audioContext || !masterGain) {
      return;
    }

    masterGain.gain.cancelScheduledValues(audioContext.currentTime);
    masterGain.gain.setTargetAtTime(enabled ? Math.max(volume, 0.0001) : 0.0001, audioContext.currentTime, 0.12);
  }, [enabled, volume]);

  useEffect(() => {
    if (!enabled) {
      stopLoop();
      return undefined;
    }

    const audioContext = ensureAudioGraph();

    if (!audioContext) {
      return undefined;
    }

    const startLoop = async () => {
      await audioContext.resume();

      nextNoteTimeRef.current = audioContext.currentTime + 0.08;
      noteIndexRef.current = 0;
      scheduleNotes();

      if (!schedulerRef.current) {
        schedulerRef.current = window.setInterval(scheduleNotes, 250);
      }
    };

    void startLoop().catch(() => {
      // Browsers may require a user gesture before audio can start.
    });

    const resumeOnGesture = () => {
      void startLoop();
    };

    window.addEventListener('pointerdown', resumeOnGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', resumeOnGesture);
      stopLoop();
    };
  }, [enabled]);

  useEffect(() => {
    return () => {
      stopLoop();

      if (audioContextRef.current) {
        void audioContextRef.current.close();
        audioContextRef.current = null;
        masterGainRef.current = null;
      }
    };
  }, []);
}
