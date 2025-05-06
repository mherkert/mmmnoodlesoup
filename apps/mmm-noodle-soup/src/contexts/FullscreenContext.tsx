import React, { createContext, useContext, useState, useCallback } from "react";

interface FullscreenContextType {
  isFullscreen: boolean;
  setFullscreen: (isFullscreen: boolean) => void;
}

const FullscreenContext = createContext<FullscreenContextType | undefined>(
  undefined
);

export const FullscreenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const setFullscreen = useCallback((value: boolean) => {
    setIsFullscreen(value);
  }, []);

  return (
    <FullscreenContext.Provider value={{ isFullscreen, setFullscreen }}>
      {children}
    </FullscreenContext.Provider>
  );
};

export const useFullscreenContext = () => {
  const context = useContext(FullscreenContext);
  if (context === undefined) {
    throw new Error(
      "useFullscreenContext must be used within a FullscreenProvider"
    );
  }
  return context;
};
