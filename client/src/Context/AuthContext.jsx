import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserFromDB, saveUserToDB, clearUserFromDB } from '../utils/indexedDB';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await getUserFromDB();
      if (storedUser) setUserState(storedUser);
    };
    fetchUser();
  }, []);

  const setUser = async (userData) => {
    setUserState(userData);
    if (userData) {
      await saveUserToDB(userData);
    } else {
      await clearUserFromDB();
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);