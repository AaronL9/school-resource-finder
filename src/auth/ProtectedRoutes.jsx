import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";

export default function ProtectedRoutes() {
  const { user } = useAuthContext();
  
  return user ? <Outlet /> : <Navigate to="/" />;
}
