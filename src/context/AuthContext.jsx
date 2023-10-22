import { createContext, useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { createPopupWin } from "../assets/js/popup";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const createUser = async (firstName, lastName, email, password) => {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: `${firstName} ${lastName}`,
        },
      },
    });

    if (error) console.log(error);
  };

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) console.log(error);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return error;
    }
    setUser(null);
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        skipBrowserRedirect: true,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    createPopupWin(data.url, "google", 600, 600);
    console.log(data, error);
  };

  useEffect(() => {
    console.log(user);
    const unsubscribe = supabase.auth.onAuthStateChange((event, session) => {
      window.close();
      if (session?.user) {
        setUser(session.user);
      }
      setIsLoading(false);
    });
    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, createUser, signIn, logout, user, signInWithGoogle }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
