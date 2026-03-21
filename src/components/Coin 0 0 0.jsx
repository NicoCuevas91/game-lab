import { useState } from 'react';
import headImg from '../assets/coin-head.png';
import tailImg from '../assets/coin-tail.png';

function Coin({ onBack }) {

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [flipping, setFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);

  const tossCoin = () => {

    if (flipping) return;

    setFlipping(true);

    const random = Math.random() < 0.5 ? 'Cara' : 'Cruz';

    /*
      Paso 1:
      Reset instantáneo sin animación.
    */
    setRotation(0);

    /*
      Paso 2:
      Esperamos un frame para que el navegador
      registre el reset antes de animar.
    */
    requestAnimationFrame(() => {

      /*
        1080° = 3 vueltas completas
        +180° si es Cruz
      */
      const finalRotation =
        1080 + (random === 'Cruz' ? 180 : 0);

      setRotation(finalRotation);

      setTimeout(() => {

        setResult(random);

        setHistory(prev => {
          const updated = [random, ...prev];
          return updated.slice(0, 10);
        });

        setFlipping(false);

      }, 1000);

    });
  };

  return (
    <div className="coin-container">

      <header className="coin-header">
        <h1>Juego: Cara o Cruz</h1>
      </header>

      <div className="coin-layout">

        <div className="coin-game">

          <button onClick={tossCoin} disabled={flipping}>
            {flipping ? 'Girando...' : 'Tirar'}
          </button>

          <div className="coin-result-area">

            <div
              className="coin"
              style={{ transform: `rotateY(${rotation}deg)` }}
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
                  <span className="history-index">
                    {index + 1}.
                  </span>
                  <span className="history-value">
                    {value ? value : '-'}
                  </span>
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