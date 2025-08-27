"use client"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    // Save the attempted location so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If user is authenticated, render the protected component
  return children
}

export default ProtectedRoute
