import { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = async (userData) => {
    const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
    setUser(response.data);
  };

  const login = async (userData) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', userData);
    setUser(response.data);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth
