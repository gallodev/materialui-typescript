import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDrawer } from '../context';

interface LayoutBaseProps {
  title: string;
  toolbar: React.ReactNode | undefined;
  children: React.ReactNode
}

export const LayoutBase: React.FC<LayoutBaseProps> = ({children, title, toolbar} : LayoutBaseProps) => {
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const { handleDrawerOpen } = useDrawer();
  
  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box padding={1} height={theme.spacing(isDownSm ? 6 : isMdDown ? 8 : 12)} display="flex" alignItems="center">
        {isDownSm && (
          <IconButton onClick={handleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography variant={isDownSm ? 'h5' : isMdDown ? 'h4' : 'h3'} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          {title}
        </Typography>
      </Box>
      <Box>
        {toolbar}
      </Box>
      <Box flex="1" overflow="auto">
        {children}        
      </Box>
    </Box>
  );
};