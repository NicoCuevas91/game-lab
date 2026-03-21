import { useDice20Game } from '../hooks/useDice20Game';
import '../styles/components/dice20.css';

function Dice20Die({ value, rolling }) {
  const number = value ?? 1;

  return (
    <div className={`dice20-die ${rolling ? 'rolling' : ''} ${number === 20 ? 'critical' : ''}`}>
      <span>{number}</span>
    </div>
  );
}

function Dice20({ onBack }) {
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
  } = useDice20Game();

  const durationOptions = [
    { value: 0, label: 'Instantaneo' },
    { value: 1, label: '1 segundo' },
    { value: 3, label: '3 segundos' },
    { value: 6, label: '6 segundos' },
    { value: 15, label: '15 segundos' },
  ];

  return (
    <div className="dice20-container">

      <header className="dice20-header">
        <h1>Juego: Dado de 20 caras</h1>
      </header>

      <div className="dice20-layout">

        <div className="dice20-game">
          <div className="dice20-controls">
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

          <div className="dice20-result-area">
            <Dice20Die value={displayNumber} rolling={rolling} />
          </div>

          {summary && <h2>{summary}</h2>}

          {results.length > 0 && (
            <div className="dice20-results-list">
              {results.map((value, index) => (
                <div key={`${value}-${index}`} className={`dice20-result-item ${value === 20 ? 'critical-history' : ''}`}>
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

        <aside className="dice20-history">
          <h3>Historial (últimas 20)</h3>
          <ul>
            {Array.from({ length: 20 }).map((_, index) => {
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

export default Dice20;