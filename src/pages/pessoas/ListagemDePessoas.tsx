import { useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { useEffect, useMemo } from 'react';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const ListagemDePessoas: React.FC  = () => {
  const [searchParams,setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get('busca') || '';
  },[searchParams]);

  useEffect(() => {
    PessoasService.getAll(1,search)
      .then((res) => {
        if(res instanceof Error) {
          alert(res.message);
          return;
        }
        console.log(res);
      });
  },[search]);

  return (
    <LayoutBase 
      title='Listagem de cidades' 
      toolbar={<FerramentasDaListagem  
        isShowSearch 
        newButtonText='Nova'
        searchValue={search}
        handleSearch={text => setSearchParams({busca: text}, {replace: true})}
      />
      }>

    </LayoutBase>
  );
};