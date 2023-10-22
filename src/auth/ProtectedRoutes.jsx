import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import supabase from "../config/supabaseClient";

export default function ProtectedRoutes() {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/" />;
}
