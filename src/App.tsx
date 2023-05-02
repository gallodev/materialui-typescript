/* eslint-disable linebreak-style */
import { BrowserRouter } from 'react-router-dom';
import './shared/form/TranslateYup';
import { AppRoutes } from './routes';
import { AppThemeProvider, DrawerContextProvider } from './shared/context';
import { MenuLateral } from './shared/components';

export const App: React.FC = () => {
  return (
    <AppThemeProvider>
      <DrawerContextProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes/>        
          </MenuLateral>
        </BrowserRouter>
      </DrawerContextProvider>
    </AppThemeProvider>
  );
};
