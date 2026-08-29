import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const value = {
    currentPage,
    setCurrentPage,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;