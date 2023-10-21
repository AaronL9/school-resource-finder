import { createContext, useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const createUser = async (firstName, lastName, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (data) {
      const student_id = data.user.id;
      const first_name = firstName;
      const last_name = lastName;
      const { data: student, error } = await supabase
        .from("student")
        .insert([{ student_id, first_name, last_name }])
        .select();
      if (student) console.log(student);
      if (error) {
        console.log(error);
      }
    }

    if (error) {
      console.log(error);
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (data) {
      setUser(data.user);
    }

    if (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return error;
    }
    setUser(null);
  };

  const signInWithGoogle = () => {};

  useEffect(() => {
    const unsubscribe = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user);
      setIsLoading(false);
    });
    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, createUser, signIn, logout, user }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
