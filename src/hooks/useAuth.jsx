import {
  createContext, useContext, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserContext = createContext();

export function UserProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [error, setError] = useState(null);

  const login = async (passport, password) => {
    const data = {
      passport,
      password,
    };
    await axios
      .post('http://localhost:3001/api/client/login/', data)
      .then((response) => {
        setToken(response.data.token);
        sessionStorage.setItem('token', response.data.token);
        navigate('/appointment');
      })
      .catch((e) => {
        console.log(e);
        setError(e.response.data.message);
      });
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const value = useMemo(
    () => ({
      token,
      error,
      login,
      logout,
    }),
    [token, error],
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => useContext(UserContext);
