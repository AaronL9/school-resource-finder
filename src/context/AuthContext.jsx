import { createContext, useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error)
  };

  const signInWithGoogle = () => {};

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(session.user);
      setUser(session.user);
    });
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, createUser, signIn, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
