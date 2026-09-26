import React, { createContext, useCallback, useContext, useState } from "react";

const ApplicationSessionContext = createContext(null);

const SESSION_KEY = "passportApplicationSession";

export function ApplicationSessionProvider({ children }) {
  const [applicationId, setApplicationId] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);

  const startApplicationSession = useCallback(() => {
    if (applicationId) {
      return;
    }

    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    const id = `APP-${year}${month}${day}-${randomNumber}`;

    const expiryTime = Date.now() + 15 * 60 * 1000;

    const session = {
      applicationId: id,
      expiresAt: expiryTime,
    };

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));

    setApplicationId(id);
    setExpiresAt(expiryTime);
  }, [applicationId]);

  const clearApplicationSession = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);

    setApplicationId(null);
    setExpiresAt(null);
  }, []);

  return (
    <ApplicationSessionContext.Provider
      value={{
        applicationId,
        expiresAt,
        startApplicationSession,
        clearApplicationSession,
      }}
    >
      {children}
    </ApplicationSessionContext.Provider>
  );
}

export function useApplicationSession() {
  const context = useContext(ApplicationSessionContext);

  if (!context) {
    throw new Error(
      "useApplicationSession must be used inside ApplicationSessionProvider",
    );
  }

  return context;
}
