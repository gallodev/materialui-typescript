/* eslint-disable linebreak-style */
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeProvider } from './shared/context/ThemeContext';
import { MenuLateral } from './shared/components';

export const App: React.FC = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <MenuLateral>
          <AppRoutes/>        
        </MenuLateral>
      </BrowserRouter>
    </AppThemeProvider>
  );
};
