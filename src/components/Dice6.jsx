import { useState, useEffect } from 'react';

function Dice6({ onBack }) {

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(null);
  const [countdown, setCountdown] = useState(3);

  /*
    Controla el contador regresivo
  */
  useEffect(() => {

    if (!rolling) return;

    setCountdown(3);

    const interval = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [rolling]);

  /*
    Simula números cambiando rápido
    mientras el dado "rueda"
  */
  useEffect(() => {

    if (!rolling) return;

    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * 6) + 1;
      setDisplayNumber(random);
    }, 100);

    return () => clearInterval(interval);

  }, [rolling]);

  const rollDice = () => {

    if (rolling) return;

    setRolling(true);
    setResult(null);

    const finalNumber = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {

      setResult(finalNumber);
      setDisplayNumber(finalNumber);

      setHistory(prev => {
        const updated = [finalNumber, ...prev];
        return updated.slice(0, 10);
      });

      setRolling(false);

    }, 3000);
  };

  return (
    <div className="dice6-container">

      {/* HEADER */}
      <header className="dice6-header">
        <h1>Juego: Dado de 6</h1>
      </header>

      <div className="dice6-layout">

        {/* BLOQUE JUEGO */}
        <div className="dice6-game">

          <button onClick={rollDice} disabled={rolling}>
            {rolling ? 'Rodando...' : 'Tirar'}
          </button>

          {rolling && (
            <>
              <div className="progress-bar">
                <div className="progress-fill short"></div>
              </div>
              <div className="countdown">
                {countdown}
              </div>
            </>
          )}

          <div className="dice6-result-area">
            <div className={`dice6-number ${result === 6 ? 'glow' : ''}`}>
              {displayNumber}
            </div>
          </div>

          <button className="back-btn" onClick={onBack}>
            Volver al menú
          </button>

        </div>

        {/* HISTORIAL */}
        <aside className="dice6-history">
          <h3>Historial (1–10)</h3>
          <ul>
            {Array.from({ length: 10 }).map((_, index) => {
              const value = history[index];
              return (
                <li key={index}>
                  <span>{index + 1}.</span>
                  <span>{value ? value : '-'}</span>
                </li>
              );
            })}
          </ul>
        </aside>

      </div>
    </div>
  );
}

export default Dice6;