"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type Persona = "leadership" | "manager";

interface PersonaContextType {
  persona: Persona;
  setPersona: (p: Persona) => void;
}

const PersonaContext = createContext<PersonaContextType>({
  persona: "leadership",
  setPersona: () => {},
});

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>("leadership");

  useEffect(() => {
    const saved = localStorage.getItem("engpulse_persona");
    if (saved === "leadership" || saved === "manager") setPersonaState(saved);
  }, []);

  function setPersona(p: Persona) {
    setPersonaState(p);
    localStorage.setItem("engpulse_persona", p);
  }

  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  return useContext(PersonaContext);
}
