import { useState } from 'react';

function Dice20({ onBack }) {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (rolling) return;

    setRolling(true);
    setResult(null);

    let counter = 0;

    const interval = setInterval(() => {
      const tempNumber = Math.floor(Math.random() * 20) + 1;
      setResult(tempNumber);
      counter++;

      if (counter > 15) { // duración animación
        clearInterval(interval);

        const finalNumber = Math.floor(Math.random() * 20) + 1;
        setResult(finalNumber);

        setHistory(prev => {
          const updated = [finalNumber, ...prev];
          return updated.slice(0, 20); // límite 20 tiradas
        });

        setRolling(false);
      }
    }, 60);
  };

  return (
    <div className="dice20-container">

      <header className="dice20-header">
        <h1>Juego: Dado de 20 caras</h1>
      </header>

      <div className="dice20-layout">

        <div className="dice20-game">
          <button onClick={rollDice} disabled={rolling}>
            {rolling ? 'Rodando...' : 'Tirar'}
          </button>

          <div className="dice20-result-area">
            {result && (
              <div className={`dice20-result ${result === 20 ? 'critical' : ''}`}>
                {result}
              </div>
            )}
          </div>

          <button className="back-btn" onClick={onBack}>
            Volver al menú
          </button>
        </div>

        <aside className="dice20-history">
          <h3>Historial (últimas 20)</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index} className={item === 20 ? 'critical-history' : ''}>
                {item}
              </li>
            ))}
          </ul>
        </aside>

      </div>
    </div>
  );
}

export default Dice20;