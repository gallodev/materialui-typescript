import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeProvider } from './shared/context/ThemeContext';

export const App: React.FC = () => {
  return (
      <AppThemeProvider>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </AppThemeProvider>
  );
}
