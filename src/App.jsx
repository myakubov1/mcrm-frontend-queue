import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './theme';
import { UserProvider } from './hooks/useAuth';
import Router from './routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <Router />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>

  );
}

export default App;
