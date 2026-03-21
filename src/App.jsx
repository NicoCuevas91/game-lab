import { useState } from 'react';
import Menu from './components/Menu';
import Coin from './components/Coin';
import Dice6 from './components/Dice6';
import Dice20 from './components/Dice20';
import AppMenus from './components/AppMenus';
import { useAppPreferences } from './hooks/useAppPreferences';
import { useBackgroundLoop } from './hooks/useBackgroundLoop';

const GAME_IDS = ['coin', 'dice6', 'dice20'];

function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [lastGame, setLastGame] = useState(null);
  const { preferences, updatePreferences } = useAppPreferences();

  useBackgroundLoop(preferences.musicEnabled, preferences.musicVolume);

  const handleNavigate = (nextGame) => {
    if (nextGame) {
      setLastGame(nextGame);
    }

    setCurrentGame(nextGame);
  };

  const handleBack = () => {
    handleNavigate(null);
  };

  const handleRandomGame = () => {
    const randomIndex = Math.floor(Math.random() * GAME_IDS.length);
    handleNavigate(GAME_IDS[randomIndex]);
  };

  const handleResumeLastGame = () => {
    if (!lastGame) return;

    handleNavigate(lastGame);
  };

  let content = <Menu onSelect={handleNavigate} />;

  if (currentGame === 'coin') {
    content = <Coin onBack={handleBack} />;
  }

  if (currentGame === 'dice6') {
    content = <Dice6 onBack={handleBack} />;
  }

  if (currentGame === 'dice20') {
    content = <Dice20 onBack={handleBack} />;
  }

  return (
    <div className="app-shell">
      <AppMenus
        currentGame={currentGame}
        lastGame={lastGame}
        preferences={preferences}
        onNavigate={handleNavigate}
        onRandomGame={handleRandomGame}
        onResumeLastGame={handleResumeLastGame}
        onPreferenceChange={updatePreferences}
      />
      <main className="app-content">
        {content}
      </main>
    </div>
  );
}

export default App;