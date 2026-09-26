import { useCallback, useEffect, useState } from "react";

const TIMER_DURATION = 15 * 60 * 1000; // 15 minutes

export function useApplicationTimer(onExpire) {
  const [expiresAt, setExpiresAt] = useState(null);
  const [remaining, setRemaining] = useState(TIMER_DURATION);

  const startTimer = useCallback(() => {
    const expiryTime = Date.now() + TIMER_DURATION;

    setExpiresAt(expiryTime);
    setRemaining(TIMER_DURATION);
  }, []);

  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const remainingTime = expiresAt - Date.now();

      if (remainingTime <= 0) {
        clearInterval(interval);
        setRemaining(0);
        onExpire?.();
        return;
      }

      setRemaining(remainingTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const minutes = Math.floor(remaining / 1000 / 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return {
    startTimer,
    remaining,
    minutes,
    seconds,
    isExpired: remaining <= 0,
  };
}
