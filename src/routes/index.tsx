import { Button } from '@mui/material';
import { Route, Routes, Navigate} from 'react-router-dom';
import { useDrawer } from '../shared/context';


export const AppRoutes: React.FC = () => {
  const { handleDrawerOpen } = useDrawer();

  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Button variant='contained' color='primary' onClick={handleDrawerOpen}>Open drawer</Button>}/>
      <Route path="*" element={<Navigate to={'/pagina-inicial'}/>}/>
    </Routes>
  );
};