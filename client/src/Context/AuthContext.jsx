import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserFromDB, saveUserIfNotExists, clearUserFromDB } from '../utils/indexedDB';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await getUserFromDB();
      if (storedUser) setUserState(storedUser);
      setIsUserLoaded(true);
    };
    fetchUser();
  }, []);

  const setUser = async (userData) => {
    setUserState(userData);
    
    if (userData) {
      const existingUser = await getUserFromDB();

      if (!existingUser || existingUser.id !== userData.id) {
        await saveUserIfNotExists(userData);
      }
    } else {
      await clearUserFromDB();
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isUserLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);