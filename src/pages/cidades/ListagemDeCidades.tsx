import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';

import { IListagemCidade, CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { Environment } from '../../shared/environment';

export const ListagemDeCidades: React.FC  = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(1000);
  const navigate = useNavigate();

  const [rows,setRows] = useState<IListagemCidade[]>([]);
  const [isLoading,setIsLoading] = useState(true);
  const [totalCount,setTotalCount] = useState(0);

  const search = useMemo(() => {
    return searchParams.get('busca') || '';
  },[searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  },[searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CidadesService.getAll(page,search)
        .then((res) => {
          setIsLoading(false);
          if(res instanceof Error) {
            alert(res.message);
            return;
          }
          setTotalCount(res.totalCount);
          setRows(res.data);
        });
    });

  },[search, page]);

  const handleDelete = (id: number) => {
    if(confirm('Deseja realmente apagar?')) {
      CidadesService.deleteById(id)
        .then((res) => {
          if(res instanceof Error) {
            alert(res.message);
          } else {
            alert('Registro apagado com sucesso!');
            setRows(oldRows => [
              ...oldRows.filter(oldRow => oldRow.id !== id)
            ]);
          }
        });
    }
  };

  return (
    <LayoutBase 
      title='Listagem de cidades' 
      toolbar={<FerramentasDaListagem  
        isShowSearch 
        newButtonText='Nova'
        searchValue={search}
        handleSearch={text => setSearchParams({busca: text, pagina: '1'}, {replace: true})}
        handleNewButton={() => navigate('/cidades/detalhe/nova')}
      />      
      }>
      <TableContainer component={Paper} variant='outlined' sx={{ m: 2, width: 'auto'}}>          
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome</TableCell>            
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/cidades/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nome}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {totalCount === 0 && !isLoading && (
            <caption>{Environment.empty_list}</caption>
          )}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate"/>
                </TableCell>
              </TableRow>
            )}
            {(totalCount > 0 && totalCount > Environment.line_limit) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination 
                    page={Number(page)}
                    count={Math.ceil(totalCount / Environment.line_limit)}
                    onChange={(_,newPage) => setSearchParams({search, pagina: newPage.toString()}, {replace: true})}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBase>
  );
};