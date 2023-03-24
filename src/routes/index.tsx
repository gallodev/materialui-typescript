import { useEffect } from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import { Dashboard } from '../pages';
import { useDrawer } from '../shared/context';


export const AppRoutes: React.FC = () => {
  const { handleSetListItemOptions } = useDrawer();

  useEffect(() => {
    handleSetListItemOptions([{
      icon: 'home',
      label: 'Página inicial',
      path: '/pagina-inicial'
    },
    {
      icon: 'star',
      label: 'Cidades',
      path: '/cidades'
    }]);
  },[]);

  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard/>}/>
      <Route path='/cidades' element={<p>cidades</p>}/>
      <Route path="*" element={<Navigate to={'/pagina-inicial'}/>}/>
    </Routes>
  );
};