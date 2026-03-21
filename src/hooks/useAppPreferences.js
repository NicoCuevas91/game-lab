import { useEffect, useState } from 'react';

const STORAGE_KEY = 'game-lab-preferences';

const DEFAULT_PREFERENCES = {
  theme: 'dark',
  uiScale: 'comfortable',
  widthMode: 'wide',
  musicEnabled: false,
  musicVolume: 0.35,
};

function sanitizePreferences(storedPreferences) {
  const nextPreferences = {
    ...DEFAULT_PREFERENCES,
    ...storedPreferences,
  };

  const validThemes = ['dark', 'light'];
  const validScales = ['compact', 'comfortable', 'spacious'];
  const validWidths = ['contained', 'wide', 'fluid'];

  if (!validThemes.includes(nextPreferences.theme)) {
    nextPreferences.theme = DEFAULT_PREFERENCES.theme;
  }

  if (!validScales.includes(nextPreferences.uiScale)) {
    nextPreferences.uiScale = DEFAULT_PREFERENCES.uiScale;
  }

  if (!validWidths.includes(nextPreferences.widthMode)) {
    nextPreferences.widthMode = DEFAULT_PREFERENCES.widthMode;
  }

  nextPreferences.musicEnabled = Boolean(nextPreferences.musicEnabled);

  if (typeof nextPreferences.musicVolume !== 'number' || Number.isNaN(nextPreferences.musicVolume)) {
    nextPreferences.musicVolume = DEFAULT_PREFERENCES.musicVolume;
  }

  nextPreferences.musicVolume = Math.min(Math.max(nextPreferences.musicVolume, 0), 1);

  return nextPreferences;
}

function loadStoredPreferences() {
  if (typeof window === 'undefined') {
    return DEFAULT_PREFERENCES;
  }

  try {
    const rawPreferences = window.localStorage.getItem(STORAGE_KEY);

    if (!rawPreferences) {
      return DEFAULT_PREFERENCES;
    }

    return sanitizePreferences(JSON.parse(rawPreferences));
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function useAppPreferences() {
  const [preferences, setPreferences] = useState(loadStoredPreferences);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }

    document.body.dataset.theme = preferences.theme;
    document.body.dataset.uiScale = preferences.uiScale;
    document.body.dataset.widthMode = preferences.widthMode;
  }, [preferences]);

  const updatePreferences = (patch) => {
    setPreferences((prev) => sanitizePreferences({ ...prev, ...patch }));
  };

  return {
    preferences,
    updatePreferences,
  };
}
