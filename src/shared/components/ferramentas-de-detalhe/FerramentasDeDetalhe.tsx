import { Box, Button, Icon, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
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
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));


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
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Salvar
          </Typography>
        </Button>
      )}
      {showSaveAndCloseButton && !isMdDown && !isSmDown && (
        <Button 
          color="primary"
          variant='outlined'
          onClick={handleSaveAndCloseClick}
          startIcon={<Icon>save</Icon>}
          disableElevation>
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
              Salvar e voltar
          </Typography>
        </Button>
      )}
      {showDeleteButton && (
        <Button 
          color="primary"
          variant='outlined'
          onClick={handleDeleteClick}
          startIcon={<Icon>delete</Icon>}
          disableElevation>
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Apagar
          </Typography>
        </Button>
      )}
      {showNewButton && !isSmDown && (
        <Button 
          color="primary"
          variant='outlined'
          startIcon={<Icon>add</Icon>}
          onClick={handleNewClick}
          disableElevation>
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            {newButtonText}
          </Typography>
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
          <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
              Voltar
          </Typography>
        </Button>
      )}
    </Box>
  );
};