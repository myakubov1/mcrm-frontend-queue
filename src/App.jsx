import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { UserProvider } from './hooks/useAuth';
import Router from './routes';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <UserProvider>
          <Router />
        </UserProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
