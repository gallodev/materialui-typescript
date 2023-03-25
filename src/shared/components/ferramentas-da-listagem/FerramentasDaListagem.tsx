import  SearchIcon  from '@mui/icons-material/Search';
import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from '@mui/material';

interface IFerramentasDaListagemProps {
  searchValue?: string;
  handleSearch?: (value: string) => void;
  isShowSearch?: boolean;
  newButtonText?: string;
  handleNewButton?: () => void;
  isShowNewButton?: boolean;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({ handleSearch, searchValue, isShowSearch = false, handleNewButton, isShowNewButton = true, newButtonText = 'Novo'} : IFerramentasDaListagemProps) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      gap={1}
      marginX={2}
      paddingX={2}
      padding={1}
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {isShowSearch && (
        <TextField
          size='small'
          placeholder='Pesquisar ...'
          value={searchValue}
          onChange={(e) => handleSearch?.(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      <Box display="flex" justifyContent="end" flex={1}>
        {isShowNewButton && (
          <Button 
            color="primary"
            variant='contained'
            onClick={() => handleNewButton}
            endIcon={<Icon>add</Icon>}
            disableElevation>{newButtonText}</Button> 
        )}
      </Box>
    </Box>    
  );
};