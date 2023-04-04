import { Box, Button, Icon, Paper, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';

interface IFerramentasDeDetalhesProps {
  newButtonText?: string;
  showNewButton?: boolean;
  showReturnButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndCloseButton?: boolean;
  handleNewClick?: () => void;
  handleReturnClick?: () => void;
  handleSaveClick?: () => void;
  handleSaveAndCloseClick?: () => void;
  handleDeleteClick?: () => void
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalhesProps> = ({
  newButtonText = 'Novo',
  showNewButton = true,
  showReturnButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndCloseButton = false,
  handleNewClick,
  handleReturnClick,
  handleSaveClick,
  handleSaveAndCloseClick,
  handleDeleteClick,
}: IFerramentasDeDetalhesProps) => {
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
      {showSaveButton && (
        <Button 
          color="primary"
          variant='contained'
          onClick={handleSaveClick}
          startIcon={<Icon>save</Icon>}
          disableElevation>
            Salvar
        </Button>
      )}
      {showSaveAndCloseButton && (
        <Button 
          color="primary"
          variant='outlined'
          onClick={handleSaveAndCloseClick}
          startIcon={<Icon>save</Icon>}
          disableElevation>
            Salvar e voltar
        </Button>
      )}
      {showDeleteButton && (
        <Button 
          color="primary"
          variant='outlined'
          onClick={handleDeleteClick}
          startIcon={<Icon>delete</Icon>}
          disableElevation>
            Apagar
        </Button>
      )}
      {showNewButton && (
        <Button 
          color="primary"
          variant='outlined'
          startIcon={<Icon>add</Icon>}
          onClick={handleNewClick}
          disableElevation>
          {newButtonText}
        </Button>
      )}
      <Divider variant='middle' orientation='vertical'/>
      {showReturnButton && (
        <Button 
          color="primary"
          variant='outlined'
          onClick={handleReturnClick}
          startIcon={<Icon>arrow_back</Icon>}
          disableElevation>
              Voltar
        </Button>
      )}
    </Box>
  );
};