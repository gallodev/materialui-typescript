import { useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { useEffect, useMemo } from 'react';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { useDebounce } from '../../shared/hooks/useDebounce';

export const ListagemDePessoas: React.FC  = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  const debounce = useDebounce(1000);

  const search = useMemo(() => {
    return searchParams.get('busca') || '';
  },[searchParams]);

  useEffect(() => {
    debounce.debounce(() => {
      PessoasService.getAll(1,search)
        .then((res) => {
          if(res instanceof Error) {
            alert(res.message);
            return;
          }
          console.log(res);
        });
    });
  },[search]);

  return (
    <LayoutBase 
      title='Listagem de pessoas' 
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