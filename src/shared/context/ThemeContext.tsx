import { Box, ThemeProvider } from '@mui/material';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { DarkTheme, LightTheme } from '../themes';

export interface IThemeContextData {
    themeName: "light" | "dark";
    toggleTheme: () => void
    name: string,
    handleChangeName: (name: string) => void
}

export const ThemeContext = createContext({} as IThemeContextData);

interface IAppThemeProviderProps{
    children : React.ReactNode
}

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const AppThemeProvider = ({children}: IAppThemeProviderProps) => {
    const [themeName,setThemeName] = useState<"light" | "dark">("light");
    const [name,setName] = useState("");

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === "light" ? "dark" : "light")
    },[]);
    
    const theme = useMemo(() => {
        if(themeName === "light")
            return LightTheme;
        
        return DarkTheme;
    },[themeName]);

    const handleChangeName = (name: string) => {
        setName(name);
    }

    return (
    <ThemeContext.Provider value={{themeName,toggleTheme,name,handleChangeName}}>
        <ThemeProvider theme={theme}>
            <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
            {children}
            </Box>
        </ThemeProvider>
    </ThemeContext.Provider>)
}