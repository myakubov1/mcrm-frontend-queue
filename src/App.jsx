import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeProvider from './theme';
import { UserProvider } from './hooks/useAuth';
import Router from './routes';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <UserProvider>
            <Router />
          </UserProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
