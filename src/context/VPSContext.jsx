import React, { createContext, useState, useContext } from 'react';

export const VPSContext = createContext();

export const VPSProvider = ({ children }) => {
  const [selectedVPS, setSelectedVPS] = useState(null);

  return (
    <VPSContext.Provider value={{ selectedVPS, setSelectedVPS }}>
      {children}
    </VPSContext.Provider>
  );
};

export const useVPS = () => useContext(VPSContext);