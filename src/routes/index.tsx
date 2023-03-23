import { Button } from '@mui/material';
import { Route, Routes, Navigate} from 'react-router-dom';
import { useTheme } from '../shared/context/ThemeContext';


export const AppRoutes: React.FC = () => {
    const {toggleTheme} = useTheme()

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Button variant="contained" color="primary" onClick={toggleTheme}>Toggle theme</Button>}/>
            <Route path="*" element={<Navigate to={"/pagina-inicial"}/>}/>
        </Routes>
    );
}