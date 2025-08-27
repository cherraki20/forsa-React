"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useNotification } from "../hooks/useNotification"
import "./Auth.css"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const location = useLocation()
  const { login, user } = useAuth()
  const { showNotification } = useNotification()

  // Get the page the user was trying to access
  const from = location.state?.from?.pathname || "/dashboard"

  useEffect(() => {
    document.title = "Connexion - ForsaFinder"

    // If user is already logged in, redirect them
    if (user) {
      navigate(from, { replace: true })
    }
  }, [user, navigate, from])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide"
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, accept any email/password
      const user = {
        firstName: "Demo",
        lastName: "User",
        email: formData.email,
        userType: "student",
        university: "Université Mohammed V",
        field: "informatique",
        registeredDate: new Date().toISOString(),
      }

      login(user)
      showNotification("Connexion réussie !", "success")

      // Redirect to the page they were trying to access
      navigate(from, { replace: true })
    } catch (error) {
      showNotification("Erreur de connexion. Veuillez réessayer.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider) => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const user = {
        firstName: provider === "google" ? "Google" : "LinkedIn",
        lastName: "User",
        email: `user@${provider}.com`,
        userType: "student",
        university: "Université Mohammed V",
        field: provider === "google" ? "informatique" : "business",
        registeredDate: new Date().toISOString(),
        loginMethod: provider,
      }

      login(user)
      showNotification(`Connexion avec ${provider} réussie !`, "success")
      navigate(from, { replace: true })
    } catch (error) {
      showNotification(`Erreur de connexion avec ${provider}`, "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <div className="logo-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="logo-text">
              <div className="main">ForsaFinder</div>
              <div className="sub">Mon Opportunité</div>
            </div>
          </Link>
        </div>

        <div className="auth-card">
          <div className="auth-card-header">
            <h1>Connexion</h1>
            <p>Accédez à votre compte ForsaFinder</p>
            {location.state?.from && (
              <div className="redirect-notice">
                <i className="fas fa-info-circle"></i>
                Connectez-vous pour accéder à cette page
              </div>
            )}
          </div>

          <div className="social-login">
            <button
              type="button"
              className="social-btn google-btn"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <i className="fab fa-google"></i>
              Continuer avec Google
            </button>
            <button
              type="button"
              className="social-btn linkedin-btn"
              onClick={() => handleSocialLogin("linkedin")}
              disabled={isLoading}
            >
              <i className="fab fa-linkedin-in"></i>
              Continuer avec LinkedIn
            </button>
          </div>

          <div className="divider">
            <span>ou</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="votre.email@example.com"
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
                placeholder="Votre mot de passe"
                required
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Se souvenir de moi
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Mot de passe oublié ?
              </Link>
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Connexion...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Se connecter
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Pas encore de compte ? <Link to="/register">Créer un compte</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
