import { useEffect, useRef, useState } from 'react';

const DICE6_ROLL_SECONDS = 3;

export function useDice6Game() {
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(null);
  const [countdown, setCountdown] = useState(DICE6_ROLL_SECONDS);
  const [diceCount, setDiceCount] = useState(1);
  const [revealSeconds, setRevealSeconds] = useState(DICE6_ROLL_SECONDS);

  const timeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const rollingIntervalRef = useRef(null);

  useEffect(() => {
    if (!rolling || revealSeconds <= 0) return;

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    };
  }, [rolling, revealSeconds]);

  useEffect(() => {
    if (!rolling) return;

    rollingIntervalRef.current = setInterval(() => {
      const random = Math.floor(Math.random() * 6) + 1;
      setDisplayNumber(random);
    }, 100);

    return () => {
      if (rollingIntervalRef.current) {
        clearInterval(rollingIntervalRef.current);
        rollingIntervalRef.current = null;
      }
    };
  }, [rolling]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      if (rollingIntervalRef.current) {
        clearInterval(rollingIntervalRef.current);
      }
    };
  }, []);

  const resolveRoll = () => {
    const outcomes = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
    const total = outcomes.reduce((acc, value) => acc + value, 0);

    setResults(outcomes);
    setDisplayNumber(outcomes[0]);
    setSummary(`Total: ${total}`);

    const historyEntry = `${outcomes.length}d - [${outcomes.join(',')}] (T:${total})`;
    setHistory((prev) => [historyEntry, ...prev].slice(0, 10));
  };

  const rollDice = () => {
    if (rolling) return;

    setSummary(null);
    setResults([]);

    if (revealSeconds === 0) {
      resolveRoll();
      return;
    }

    setCountdown(revealSeconds);
    setDisplayNumber(Math.floor(Math.random() * 6) + 1);
    setRolling(true);

    timeoutRef.current = setTimeout(() => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
      if (rollingIntervalRef.current) {
        clearInterval(rollingIntervalRef.current);
        rollingIntervalRef.current = null;
      }

      resolveRoll();
      setRolling(false);
    }, revealSeconds * 1000);
  };

  return {
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
  };
}
