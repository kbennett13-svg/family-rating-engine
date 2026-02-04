'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Voter = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type VoterContextType = {
  currentVoter: Voter | null;
  setCurrentVoter: (voter: Voter | null) => void;
  isLoading: boolean;
};

const VoterContext = createContext<VoterContextType | undefined>(undefined);

export function VoterProvider({ children }: { children: ReactNode }) {
  const [currentVoter, setCurrentVoterState] = useState<Voter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem('currentVoter');
    if (stored) {
      try {
        setCurrentVoterState(JSON.parse(stored));
      } catch {
        localStorage.removeItem('currentVoter');
      }
    }
    setIsLoading(false);
  }, []);

  const setCurrentVoter = (voter: Voter | null) => {
    setCurrentVoterState(voter);
    if (voter) {
      localStorage.setItem('currentVoter', JSON.stringify(voter));
    } else {
      localStorage.removeItem('currentVoter');
    }
  };

  return (
    <VoterContext.Provider value={{ currentVoter, setCurrentVoter, isLoading }}>
      {children}
    </VoterContext.Provider>
  );
}

export function useVoter() {
  const context = useContext(VoterContext);
  if (context === undefined) {
    throw new Error('useVoter must be used within a VoterProvider');
  }
  return context;
}
