import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDrawer } from '../context';

interface LayoutBaseProps {
  title: string;
  children: React.ReactNode
}

export const LayoutBase: React.FC<LayoutBaseProps> = ({children, title} : LayoutBaseProps) => {
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { handleDrawerOpen } = useDrawer();
  
  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box padding={1} height={theme.spacing(12)} display="flex" alignItems="center">
        {isDownSm && (
          <IconButton onClick={handleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography variant="h5" >
          {title}
        </Typography>
      </Box>
      <Box>
        Barra de ferramentas
      </Box>
      <Box>
        {children}
      </Box>
    </Box>
  );
};