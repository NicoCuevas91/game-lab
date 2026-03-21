import headImg from '../assets/coin-head.jpg';
import tailImg from '../assets/coin-tail.jpg';
import headPngImg from '../assets/coin-head.png';
import tailPngImg from '../assets/coin-tail.png';
import cara10CentArg from '../assets/cara-10-cent-argentina-CGPT.png';
import cara5AustralesArg from '../assets/cara-5-australes-argentina-CGPT.png';
import cara5CentArg from '../assets/cara-5-cent-argentina-CGPT.png';
import cara50CentArg from '../assets/cara-50-cent-argentina-CGPT.png';
import cruz10CentArg from '../assets/cruz-10-cent-argentina-CGPT.png';
import cruz5AustralesArg from '../assets/cruz-5-australes-argentina-CGPT.png';
import cruz5CentArg from '../assets/cruz-5-cent-argentina-CGPT.png';
import cruz50CentArg from '../assets/cruz-50-cent-argentina-CGPT.png';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useCoinGame } from '../hooks/useCoinGame';
import '../styles/components/coin.css';

function CoinOptionCard({ option, isChecked, onToggle, disabled }) {
  const [showTail, setShowTail] = useState(false);
  const [hovering, setHovering] = useState(false);
  const flipTimerRef = useRef(null);
  const leaveTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(flipTimerRef.current);
      clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(leaveTimerRef.current);
    setHovering(true);
    setShowTail(false);
    flipTimerRef.current = setTimeout(() => setShowTail(true), 3500);
  };

  const handleMouseLeave = () => {
    clearTimeout(flipTimerRef.current);
    setHovering(false);
    leaveTimerRef.current = setTimeout(() => setShowTail(false), 150);
  };

  return (
    <button
      type="button"
      className={`coin-option ${isChecked ? 'active' : ''}`}
      onClick={() => onToggle(option.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      aria-pressed={isChecked}
    >
      <div className="coin-option-img-wrap">
        <img
          className="coin-option-img"
          src={showTail ? option.tailSrc : option.headSrc}
          alt={showTail ? 'Cruz' : 'Cara'}
        />
        {hovering && !showTail && (
          <div className="coin-option-preview-bar">
            <div className="coin-option-preview-fill" />
          </div>
        )}
      </div>
      <span className={`coin-option-check ${isChecked ? 'visible' : ''}`}>✓</span>
      <span className="coin-option-label">{option.label}</span>
    </button>
  );
}

function Coin({ onBack }) {
  const {
    results,
    summary,
    history,
    spinning,
    countdown,
    coinCount,
    setCoinCount,
    revealSeconds,
    setRevealSeconds,
    tossCoin,
  } = useCoinGame();

  const [selectedCoinIds, setSelectedCoinIds] = useState(['classic']);
  const [displayCoinTypeIds, setDisplayCoinTypeIds] = useState(['classic']);

  const coinOptions = useMemo(
    () => [
      { id: 'classic',         label: 'Clasica 1P',  headSrc: headImg,            tailSrc: tailImg },
      { id: 'classic-png',     label: 'Clasica PNG', headSrc: headPngImg,         tailSrc: tailPngImg },
      { id: 'arg-5-australes', label: '5 australes', headSrc: cara5AustralesArg,  tailSrc: cruz5AustralesArg },
      { id: 'arg-5-cent',      label: '5 centavos',  headSrc: cara5CentArg,       tailSrc: cruz5CentArg },
      { id: 'arg-50-cent',     label: '50 centavos', headSrc: cara50CentArg,      tailSrc: cruz50CentArg },
      { id: 'arg-10-cent',     label: '10 centavos', headSrc: cara10CentArg,      tailSrc: cruz10CentArg },
    ],
    []
  );

  const durationOptions = [
    { value: 0,  label: '0s' },
    { value: 1,  label: '1s' },
    { value: 3,  label: '3s' },
    { value: 6,  label: '6s' },
    { value: 15, label: '15s' },
  ];

  const isMultiType = selectedCoinIds.length >= 2;

  const handleCoinToggle = (coinId) => {
    const isSelected = selectedCoinIds.includes(coinId);
    if (isSelected) {
      if (selectedCoinIds.length === 1) return;
      const next = selectedCoinIds.filter((id) => id !== coinId);
      setSelectedCoinIds(next);
      if (next.length === 1 && coinCount > 6) setCoinCount(6);
    } else {
      const next = [...selectedCoinIds, coinId];
      setSelectedCoinIds(next);
      if (coinCount < next.length) setCoinCount(next.length);
    }
  };

  const handleToss = () => {
    const safeIds = selectedCoinIds.length > 0 ? selectedCoinIds : ['classic'];
    const types = Array.from({ length: coinCount }, (_, i) => safeIds[i % safeIds.length]);
    setDisplayCoinTypeIds(types);
    tossCoin();
  };

  const displayedOutcomes = spinning
    ? Array.from({ length: displayCoinTypeIds.length || coinCount }, () => null)
    : (results.length > 0 ? results : [null]);
  const coinTypesForDisplay =
    spinning || results.length > 0
      ? (displayCoinTypeIds.length > 0 ? displayCoinTypeIds : ['classic'])
      : ['classic'];

  return (
    <div className="coin-container">

      <header className="coin-header">
        <h1>Juego: Cara o Cruz</h1>
      </header>

      <div className="coin-layout">

        <div className="coin-game">

          <div className="coin-controls">
            <div className="coin-controls-group">
              <p>
                Moneda
                <span className="coin-controls-hint"> — pasá el mouse para ver el reverso</span>
              </p>
              <div className="coin-options-grid">
                {coinOptions.map((option) => (
                  <CoinOptionCard
                    key={option.id}
                    option={option}
                    isChecked={selectedCoinIds.includes(option.id)}
                    onToggle={handleCoinToggle}
                    disabled={spinning}
                  />
                ))}
              </div>
            </div>

            <div className="coin-controls-row">
              <div className="coin-controls-group">
                {isMultiType ? (
                  <>
                    <p>Cantidad de monedas</p>
                    <div className="coin-count-control">
                      <button
                        type="button"
                        className="coin-count-btn"
                        onClick={() => setCoinCount((prev) => Math.max(selectedCoinIds.length, prev - 1))}
                        disabled={spinning || coinCount <= selectedCoinIds.length}
                      >
                        − Quitar moneda
                      </button>
                      <span className="coin-count-display">{coinCount}</span>
                      <button
                        type="button"
                        className="coin-count-btn"
                        onClick={() => setCoinCount((prev) => Math.min(12, prev + 1))}
                        disabled={spinning || coinCount >= 12}
                      >
                        + Agregar moneda
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>Cantidad</p>
                    <div className="coin-chip-row">
                      {Array.from({ length: 6 }, (_, i) => i + 1).map((value) => (
                        <button
                          key={value}
                          type="button"
                          className={`coin-chip ${coinCount === value ? 'active' : ''}`}
                          onClick={() => setCoinCount(value)}
                          disabled={spinning}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="coin-controls-group">
                <p>Tiempo</p>
                <div className="coin-chip-row">
                  {durationOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`coin-chip ${revealSeconds === option.value ? 'active' : ''}`}
                      onClick={() => setRevealSeconds(option.value)}
                      disabled={spinning}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button className="coin-primary-btn" onClick={handleToss} disabled={spinning}>
            {spinning ? 'Girando...' : 'Tirar'}
          </button>

          {/* Barra + contador */}
          {spinning && (
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

          <div className="coin-result-area">
            <div className="coin-grid">
              {displayedOutcomes.map((outcome, index) => {
                const isSingleCoin = displayedOutcomes.length === 1;
                const coinTypeId = coinTypesForDisplay[index % coinTypesForDisplay.length];
                const displayCoin =
                  coinOptions.find((option) => option.id === coinTypeId) ?? coinOptions[0];
                const finalImageSrc = outcome === 'Cruz' ? displayCoin.tailSrc : displayCoin.headSrc;

                return (
                  <div
                    key={`coin-${index}`}
                    className={`coin ${spinning ? 'spin' : ''} ${isSingleCoin ? 'single' : 'multi'}`}
                    style={spinning ? { animationDelay: `${index * 0.08}s` } : {}}
                  >
                    {spinning ? (
                      <div className="coin-spin-visual">
                        <img className="coin-image coin-head-frame" src={displayCoin.headSrc} alt="Cara" />
                        <img className="coin-image coin-tail-frame" src={displayCoin.tailSrc} alt="Cruz" />
                      </div>
                    ) : (
                      <img
                        className="coin-image coin-final"
                        src={finalImageSrc}
                        alt={outcome === 'Cruz' ? 'Cruz' : 'Cara'}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {results.length > 0 && (
            <p className="coin-result-hint">{results.join(' • ')}</p>
          )}

          {summary && <h2 className="coin-summary">{summary}</h2>}

          {results.length > 0 && (
            <div className="coin-results-list">
              {results.map((item, index) => (
                <div key={`${item}-${index}`} className="coin-result-item">
                  <span>Moneda {index + 1}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          )}

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