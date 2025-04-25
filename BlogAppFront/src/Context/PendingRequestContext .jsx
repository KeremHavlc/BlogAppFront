import { createContext, useContext, useState } from "react";

const PendingRequestContext = createContext();

export const PendingRequestProvider = ({ children }) => {
  const [pendingCount, setPendingCount] = useState(0);

  return (
    <PendingRequestContext.Provider value={{ pendingCount, setPendingCount }}>
      {children}
    </PendingRequestContext.Provider>
  );
};

export const usePendingRequest = () => useContext(PendingRequestContext);
