import { Box, Drawer, useTheme, Avatar, Divider, List, ListItemButton, Icon, ListItemText, ListItemIcon, useMediaQuery } from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useDrawer } from '../../context';

interface IMenuLateralProps {
    children: React.ReactNode
}

interface ListItemProps {
  icon: string;
  to: string;
  label: string;
  onClick: (() => void) | undefined
}

const ListItem: React.FC<ListItemProps> = ({ icon, label, to, onClick} : ListItemProps) => {
  const navigate = useNavigate();
  const resolvePath = useResolvedPath(to);
  const match = useMatch({path: resolvePath.pathname, end: false});

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton onClick={handleClick} selected={!!match}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral : React.FC<IMenuLateralProps> = ({ children } : IMenuLateralProps) => {
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, handleDrawerOpen, listItemOptions } = useDrawer();

  

  return (
    <>
      <Drawer open={isDrawerOpen} variant={(isDownSm) ? 'temporary' : 'permanent'}>
        <Box width={theme.spacing(28)} display="flex" flexDirection="column" height="100%">
          <Box width="100%" height={theme.spacing(20)} display="flex" justifyContent="center" alignItems="center">
            <Avatar 
              sx={{height: theme.spacing(12) , width: theme.spacing(12) }}
              src="https://scontent.fssz3-1.fna.fbcdn.net/v/t1.6435-9/117445059_1334242233573453_9009871377713748541_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=b4OTobAxKo4AX9JhZpw&_nc_ht=scontent.fssz3-1.fna&oh=00_AfCtEhVbuCG1EbhxByzxZ7Pm_GSNxQVlsqp06zx-D-nHqg&oe=644440DD"/>
          </Box>
          <Divider/>
          <Box flex={1}>
            <List component="nav">
              {listItemOptions.map((item) => (
                <ListItem key={item.path} icon={item.icon} label={item.label} to={item.path} onClick={isDownSm ? handleDrawerOpen : undefined}/>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={(isDownSm) ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};