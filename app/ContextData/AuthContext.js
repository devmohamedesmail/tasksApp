import React, { createContext, useState ,useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContextData = createContext();

export default function AuthContext({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedAuth = await AsyncStorage.getItem("userAuth");
        if (storedAuth) {
          setAuth(JSON.parse(storedAuth));
        }
      } catch (error) {
        console.error("Failed to load auth data", error);
      }
    };
    loadAuth();
  }, []);

  useEffect(() => {
    const saveAuth = async () => {
      try {
        if (auth) {
          await AsyncStorage.setItem("userAuth", JSON.stringify(auth));
        } else {
          await AsyncStorage.removeItem("userAuth");
        }
      } catch (error) {
        console.error("Failed to save auth data", error);
      }
    };
    saveAuth();
  }, [auth]);

  return (
    <AuthContextData.Provider value={[auth, setAuth]}>
      {children}
    </AuthContextData.Provider>
  );
}
