import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';

import { IListagemPessoa, PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { Environment } from '../../shared/environment';

export const ListagemDePessoas: React.FC  = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(1000);
  const navigate = useNavigate();

  const [rows,setRows] = useState<IListagemPessoa[]>([]);
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
      PessoasService.getAll(page,search)
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
      PessoasService.deleteById(id)
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
      title='Listagem de pessoas' 
      toolbar={<FerramentasDaListagem  
        isShowSearch 
        newButtonText='Nova'
        searchValue={search}
        handleSearch={text => setSearchParams({busca: text, pagina: '1'}, {replace: true})}
      />      
      }>
      <TableContainer component={Paper} variant='outlined' sx={{ m: 2, width: 'auto'}}>          
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
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