import { createContext, useState, useCallback, useContext } from 'react';

interface IDrawerContextProps {
    isDrawerOpen: boolean;
    handleDrawerOpen: () => void
}

export const DrawerContext = createContext({} as IDrawerContextProps);

interface DrawerContextProviderProps {
    children: React.ReactNode
}

export const useDrawer = () => {
  return useContext(DrawerContext);
};

export const DrawerContextProvider = ({children} : DrawerContextProviderProps) => {
  const [isDrawerOpen,setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  },[]);

  return (
    <DrawerContext.Provider value={{isDrawerOpen,handleDrawerOpen}}>
      {children}
    </DrawerContext.Provider>
  );
};