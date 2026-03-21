import { useEffect, useRef, useState } from 'react';

const DEFAULT_REVEAL_SECONDS = 3;

export function useCoinGame() {
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [countdown, setCountdown] = useState(DEFAULT_REVEAL_SECONDS);
  const [coinCount, setCoinCount] = useState(1);
  const [revealSeconds, setRevealSeconds] = useState(DEFAULT_REVEAL_SECONDS);

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!spinning || revealSeconds <= 0) return;

    const intervalId = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [spinning, revealSeconds]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const resolveOutcomes = () => {
    const outcomes = Array.from({ length: coinCount }, () => (Math.random() < 0.5 ? 'Cara' : 'Cruz'));
    const caras = outcomes.filter((value) => value === 'Cara').length;
    const cruces = outcomes.length - caras;

    setResults(outcomes);
    setSummary(`Caras: ${caras} | Cruces: ${cruces}`);

    const historyEntry = `${outcomes.length}m - ${caras}C/${cruces}X`;
    setHistory((prev) => [historyEntry, ...prev].slice(0, 10));
  };

  const tossCoin = () => {
    if (spinning) return;

    setSummary(null);
    setResults([]);

    if (revealSeconds === 0) {
      resolveOutcomes();
      return;
    }

    setCountdown(revealSeconds);
    setSpinning(true);

    timeoutRef.current = setTimeout(() => {
      resolveOutcomes();
      setSpinning(false);
    }, revealSeconds * 1000);
  };

  return {
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
  };
}
