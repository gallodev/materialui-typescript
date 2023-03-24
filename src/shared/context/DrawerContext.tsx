import { createContext, useState, useCallback, useContext } from 'react';

interface IDrawerContextProps {
    isDrawerOpen: boolean;
    handleDrawerOpen: () => void
    listItemOptions: ListItemOptions[];
    handleSetListItemOptions: (newList: ListItemOptions[]) => void
}

export const DrawerContext = createContext({} as IDrawerContextProps);

interface DrawerContextProviderProps {
    children: React.ReactNode
}

export const useDrawer = () => {
  return useContext(DrawerContext);
};

interface ListItemOptions {
  icon: string;
  path: string;
  label: string;
}

export const DrawerContextProvider = ({children} : DrawerContextProviderProps) => {
  const [isDrawerOpen,setIsDrawerOpen] = useState(false);
  const [listItemOptions,setListItemOptions] = useState<ListItemOptions[]>([]);

  const handleSetListItemOptions = (newListOptions: ListItemOptions[]) => {
    setListItemOptions(newListOptions);
  };

  const handleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  },[]);

  return (
    <DrawerContext.Provider value={{isDrawerOpen,handleDrawerOpen, listItemOptions, handleSetListItemOptions}}>
      {children}
    </DrawerContext.Provider>
  );
};