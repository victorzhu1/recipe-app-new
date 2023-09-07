import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';


interface ProtectedRouteProps {
  component: React.ComponentType<any>;
}

export function ProtectedRoute({ component: Component }: ProtectedRouteProps) {
  const accessToken = sessionStorage.getItem("accessToken");

  const decodedToken: { exp: number } | null = accessToken ? jwt_decode(accessToken) : null;
  const isAuthenticated: boolean = decodedToken ? new Date().getTime() / 1000 < decodedToken.exp : false;

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
}
