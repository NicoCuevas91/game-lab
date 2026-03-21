import { useState, useEffect } from 'react';
import headImg from '../assets/coin-head.png';
import tailImg from '../assets/coin-tail.png';

function Coin({ onBack }) {

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [finalRotation, setFinalRotation] = useState(0);
  const [countdown, setCountdown] = useState(5);

  /*
    Control del contador regresivo
    Solo funciona cuando spinning = true
  */
  useEffect(() => {

    if (!spinning) return;

    setCountdown(5);

    const interval = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [spinning]);

  const tossCoin = () => {

    if (spinning) return;

    setSpinning(true);
    setResult(null);

    const random = Math.random() < 0.5 ? 'Cara' : 'Cruz';

    setTimeout(() => {

      const rotation = random === 'Cara' ? 0 : 180;

      setFinalRotation(rotation);
      setResult(random);

      setHistory(prev => {
        const updated = [random, ...prev];
        return updated.slice(0, 10);
      });

      setSpinning(false);

    }, 5000);
  };

  return (
    <div className="coin-container">

      <header className="coin-header">
        <h1>Juego: Cara o Cruz</h1>
      </header>

      <div className="coin-layout">

        <div className="coin-game">

          <button onClick={tossCoin} disabled={spinning}>
            {spinning ? 'Girando...' : 'Tirar'}
          </button>

          {/* Barra + contador */}
          {spinning && (
            <>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <div className="countdown">
                {countdown}
              </div>
            </>
          )}

          <div className="coin-result-area">
            <div
              className={`coin ${spinning ? 'spin' : ''}`}
              style={
                !spinning
                  ? { transform: `rotateY(${finalRotation}deg)` }
                  : {}
              }
            >
              <div className="coin-face front">
                <img src={headImg} alt="Cara" />
              </div>

              <div className="coin-face back">
                <img src={tailImg} alt="Cruz" />
              </div>
            </div>
          </div>

          {result && <h2>{result}</h2>}

          <button className="back-btn" onClick={onBack}>
            Volver al menú
          </button>

        </div>

        <aside className="coin-history">
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

export default Coin;