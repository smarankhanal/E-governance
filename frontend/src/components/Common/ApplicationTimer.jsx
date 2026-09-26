import React, { useEffect, useState } from "react";

export default function ApplicationTimer({ expiresAt, onExpire }) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!expiresAt) {
      setRemaining(0);
      return;
    }

    let hasExpired = false;

    const updateTimer = () => {
      const timeLeft = Math.max(0, expiresAt - Date.now());

      setRemaining(timeLeft);

      if (timeLeft <= 0 && !hasExpired) {
        hasExpired = true;

        if (onExpire) {
          onExpire();
        }
      }
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [expiresAt, onExpire]);

  if (!expiresAt) {
    return null;
  }

  const totalSeconds = Math.floor(remaining / 1000);

  const minutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;

  const isAlmostExpired = minutes < 2;

  return (
    <div
      className={`rounded-md px-3 py-2 text-sm font-medium ${
        isAlmostExpired
          ? "bg-red-100 text-red-600"
          : "bg-[#e5f0ff] text-[#2F5F98]"
      }`}
    >
      <span>Time remaining: </span>

      <span className="font-bold">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
