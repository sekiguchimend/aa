import React, { createContext, useContext, useState, ReactNode } from 'react';

type Period = {
  startDate: string;
  endDate: string;
};

type User = {
  isLoggedIn: boolean;
  username?: string;
};

type AppContextType = {
  user: User;
  periods: Period[];
  currentPMSPeriod: { start: string; end: string };
  nextPeriodDate: string;
  login: (username: string) => void;
  logout: () => void;
  addPeriod: (period: Period) => void;
  removePeriod: (index: number) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User>({ isLoggedIn: false });
  const [periods, setPeriods] = useState<Period[]>([
    { startDate: '2025/02/15', endDate: '2025/02/23' },
    { startDate: '2025/03/15', endDate: '2025/03/23' },
    { startDate: '2025/04/10', endDate: '2025/04/16' },
  ]);

  // PMS期間と次の生理日を動的に計算
  const calculatePMSPeriod = () => {
    if (periods.length === 0) return { start: '-', end: '-' };
    
    // 最新の生理日から次の生理開始日を計算（28日周期と仮定）
    const lastPeriod = periods[periods.length - 1];
    const lastStartDate = new Date(lastPeriod.startDate.replace(/\//g, '-'));
    const nextPeriodStart = new Date(lastStartDate.getTime() + (28 * 24 * 60 * 60 * 1000));
    
    // PMS期間は生理開始の7-10日前
    const pmsStart = new Date(nextPeriodStart.getTime() - (10 * 24 * 60 * 60 * 1000));
    const pmsEnd = new Date(nextPeriodStart.getTime() - (1 * 24 * 60 * 60 * 1000));
    
    return {
      start: `${pmsStart.getMonth() + 1}/${pmsStart.getDate()}`,
      end: `${pmsEnd.getMonth() + 1}/${pmsEnd.getDate()}`
    };
  };

  const calculateNextPeriodDate = () => {
    if (periods.length === 0) return '-';
    
    const lastPeriod = periods[periods.length - 1];
    const lastStartDate = new Date(lastPeriod.startDate.replace(/\//g, '-'));
    const nextPeriodStart = new Date(lastStartDate.getTime() + (28 * 24 * 60 * 60 * 1000));
    
    return `${nextPeriodStart.getMonth() + 1}/${nextPeriodStart.getDate()}`;
  };

  const currentPMSPeriod = calculatePMSPeriod();
  const nextPeriodDate = calculateNextPeriodDate();

  const login = (username: string) => {
    setUser({ isLoggedIn: true, username });
  };

  const logout = () => {
    setUser({ isLoggedIn: false });
  };

  const addPeriod = (period: Period) => {
    setPeriods([...periods, period]);
  };

  const removePeriod = (index: number) => {
    const newPeriods = [...periods];
    newPeriods.splice(index, 1);
    setPeriods(newPeriods);
  };

  const value = {
    user,
    periods,
    currentPMSPeriod,
    nextPeriodDate,
    login,
    logout,
    addPeriod,
    removePeriod,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};