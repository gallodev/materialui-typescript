import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard, ListagemDePessoas } from '../pages';
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
      icon: 'people',
      label: 'Pessoas',
      path: '/pessoas'
    }]);
  },[]);

  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard/>}/>
      <Route path='/pessoas' element={<ListagemDePessoas/>}/>
      <Route path='/pessoas/detalhe/:id' element={<p>detalhe</p>}/>
      <Route path="*" element={<Navigate to={'/pagina-inicial'}/>}/>
    </Routes>
  );
};