import { createContext, useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const createUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (data) {
      console.log(data);
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

  const logout = () => {};

  const signInWithGoogle = () => {};

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, createUser, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
