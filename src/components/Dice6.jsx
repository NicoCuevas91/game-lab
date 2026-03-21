import { useDice6Game } from '../hooks/useDice6Game';
import '../styles/components/dice6.css';

const PIP_LAYOUTS = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
};

function DiceFace({ value, rolling }) {
  const safeValue = value ?? 1;
  const activePips = PIP_LAYOUTS[safeValue] ?? PIP_LAYOUTS[1];

  return (
    <div className={`dice6-die ${rolling ? 'rolling' : ''}`}>
      {Array.from({ length: 9 }).map((_, index) => {
        const position = index + 1;
        const isActive = activePips.includes(position);

        return <span key={position} className={`dice6-pip ${isActive ? 'active' : ''}`}></span>;
      })}
    </div>
  );
}

function Dice6({ onBack }) {
  const {
    results,
    summary,
    history,
    rolling,
    displayNumber,
    countdown,
    diceCount,
    setDiceCount,
    revealSeconds,
    setRevealSeconds,
    rollDice,
  } = useDice6Game();

  const durationOptions = [
    { value: 0, label: 'Instantaneo' },
    { value: 1, label: '1 segundo' },
    { value: 3, label: '3 segundos' },
    { value: 6, label: '6 segundos' },
    { value: 15, label: '15 segundos' },
  ];

  const diceValuesToDisplay = rolling
    ? Array.from({ length: diceCount }, () => displayNumber)
    : (results.length > 0 ? results : [displayNumber]);

  return (
    <div className="dice6-container">

      {/* HEADER */}
      <header className="dice6-header">
        <h1>Juego: Dado de 6</h1>
      </header>

      <div className="dice6-layout">

        {/* BLOQUE JUEGO */}
        <div className="dice6-game">

          <div className="dice6-controls">
            <label>
              Cantidad
              <select
                value={diceCount}
                onChange={(event) => setDiceCount(Number(event.target.value))}
                disabled={rolling}
              >
                {Array.from({ length: 6 }, (_, index) => index + 1).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Tiempo
              <select
                value={revealSeconds}
                onChange={(event) => setRevealSeconds(Number(event.target.value))}
                disabled={rolling}
              >
                {durationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button onClick={rollDice} disabled={rolling}>
            {rolling ? 'Rodando...' : 'Tirar'}
          </button>

          {rolling && (
            <>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ animationDuration: `${revealSeconds}s` }}
                ></div>
              </div>
              <div className="countdown">
                {countdown}
              </div>
            </>
          )}

          <div className="dice6-result-area">
            <div className="dice6-dice-grid">
              {diceValuesToDisplay.map((value, index) => (
                <DiceFace key={`dice-face-${index}`} value={value} rolling={rolling} />
              ))}
            </div>
          </div>

          {summary && <h2>{summary}</h2>}

          {results.length > 0 && (
            <div className="dice6-results-list">
              {results.map((value, index) => (
                <div key={`${value}-${index}`} className="dice6-result-item">
                  <span>Dado {index + 1}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          )}

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