"use client";

import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [isLogIn, setIsLogIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isLogIn") === "true";
    }
    return false;
  });

  const [currentId, setCurrentId] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("currentId") || null;
    }
    return null;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isAdmin") === "true";
    }
    return false;
  });

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem("isAdmin", "true");
    } else if (isLogIn && currentId) {
      localStorage.setItem("isLogIn", "true");
      localStorage.setItem("currentId", currentId);
    } else {
      localStorage.removeItem("isLogIn");
      localStorage.removeItem("currentId");
      localStorage.removeItem("isAdmin");
    }
  }, [isLogIn, currentId, isAdmin]);

  return (
    <GlobalContext.Provider
      value={{
        isLogIn,
        setIsLogIn,
        currentId,
        setCurrentId,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
