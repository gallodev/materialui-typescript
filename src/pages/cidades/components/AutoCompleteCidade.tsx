import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { CidadesService } from '../../../shared/services/api/cidades/CidadesService';
import { useField } from '@unform/core';

type TAutoCompleteOption = {
    id: number;
    label: string;
}

interface IAutoCompleteCidade {
  isExternalLoading?: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidade> = ({ isExternalLoading = false }: IAutoCompleteCidade) => {
  const { fieldName , defaultValue , error , registerField , clearError} = useField('cidadeId');
  const { debounce } = useDebounce();
  
  const [selectedId,setSelectedId] = useState<number|undefined>(defaultValue);

  const [opcoes,setOpcoes] = useState<TAutoCompleteOption[]>([]);
  const [isLoading,setIsLoading] = useState(false);
  const [search,setSearch] = useState('');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_,newSelectedValue) => setSelectedId(newSelectedValue)
    });
  },[selectedId, fieldName, registerField]);

  const autoCompleteSelectedOption = useMemo(() => {
    if(!selectedId) return null;

    const selectedOption = opcoes.find((opcao) => opcao.id === selectedId);
    if(!selectedOption) return null;
    return selectedOption;
  },[opcoes,selectedId]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CidadesService.getAll(1,search)
        .then((res) => {
          setIsLoading(false);
          if(res instanceof Error) {
            alert(res.message);
            return;
          }

          setOpcoes(res.data.map(cidade => ({id: cidade.id, label: cidade.nome})));
        });
    });
  },[search]);

  return (
    <Autocomplete 
      openText='Abrir'
      closeText='Fechar'
      clearText='Limpar'
      loadingText='Carregando ...'
      noOptionsText='Sem opções'

      disablePortal
      value={autoCompleteSelectedOption}
      options={opcoes} 
      disabled={isExternalLoading}
      loading={isLoading}
      popupIcon={isLoading ? <CircularProgress size={28}/> : undefined}
      onInputChange={(_,newValue) => setSearch(newValue)}
      onChange={(_,newValue) => {
        setSelectedId(newValue?.id);
        setSearch('');
        clearError();
      }}
      renderInput={(params) => (
        <TextField 
          {...params}
          label="Cidades"
          error={!!error}
          helperText={error}
        />
      )}      
    />
  );
};