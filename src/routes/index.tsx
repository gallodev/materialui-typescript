import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard, DetalheDePessoas, ListagemDePessoas, ListagemDeCidades, DetalheDeCidades } from '../pages';
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
    },
    {
      icon: 'location_city',
      label: 'Cidades',
      path: '/cidades'
    },]);
  },[]);

  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard/>}/>

      <Route path='/pessoas' element={<ListagemDePessoas/>}/>
      <Route path='/pessoas/detalhe/:id' element={<DetalheDePessoas/>}/>

      <Route path='/cidades' element={<ListagemDeCidades/>}/>
      <Route path='/cidades/detalhe/:id' element={<DetalheDeCidades/>}/>

      <Route path="*" element={<Navigate to={'/pagina-inicial'}/>}/>
    </Routes>
  );
};