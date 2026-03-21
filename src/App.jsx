import { useState } from 'react';
import Menu from './components/Menu';
import Coin from './components/Coin';
import Dice6 from './components/Dice6';
import Dice20 from './components/Dice20';
import './styles/app.css';

function App() {
  const [currentGame, setCurrentGame] = useState(null);

  const handleBack = () => {
    setCurrentGame(null);
  };

  if (!currentGame) {
    return <Menu onSelect={setCurrentGame} />;
  }

  if (currentGame === 'coin') {
    return <Coin onBack={handleBack} />;
  }

  if (currentGame === 'dice6') {
    return <Dice6 onBack={handleBack} />;
  }

  if (currentGame === 'dice20') {
    return <Dice20 onBack={handleBack} />;
  }

  return null;
}

export default App;