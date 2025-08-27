"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useNotification } from "../hooks/useNotification"
import "./Auth.css"

function Register() {
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    field: "",
    companyName: "",
    industry: "",
    terms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: "Faible" })

  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const { showNotification } = useNotification()

  useEffect(() => {
    document.title = "Inscription - ForsaFinder"

    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === "checkbox" ? checked : value

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }

    // Check password strength
    if (name === "password") {
      checkPasswordStrength(value)
    }
  }

  const checkPasswordStrength = (password) => {
    let score = 0
    let feedback = "Faible"

    if (password.length >= 8) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/\d/.test(password)) score += 1
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1

    if (score >= 4) {
      feedback = "Fort"
    } else if (score >= 3) {
      feedback = "Moyen"
    }

    setPasswordStrength({ score, feedback })
  }

  const validateStep1 = () => {
    const newErrors = {}

    if (!userType) {
      newErrors.userType = "Veuillez sélectionner votre profil"
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis"
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide"
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    } else if (passwordStrength.score < 3) {
      newErrors.password = "Le mot de passe doit être plus fort"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}

    if (userType === "student") {
      if (!formData.university.trim()) {
        newErrors.university = "L'université est requise"
      }
      if (!formData.field) {
        newErrors.field = "Le domaine d'étude est requis"
      }
    } else if (userType === "company") {
      if (!formData.companyName.trim()) {
        newErrors.companyName = "Le nom de l'entreprise est requis"
      }
      if (!formData.industry) {
        newErrors.industry = "Le secteur d'activité est requis"
      }
    }

    if (!formData.terms) {
      newErrors.terms = "Vous devez accepter les conditions d'utilisation"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateStep2()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        userType: userType,
        university: formData.university,
        field: formData.field,
        companyName: formData.companyName,
        industry: formData.industry,
        registeredDate: new Date().toISOString(),
      }

      localStorage.setItem("forsafinder_user", JSON.stringify(userData))
      login(userData)

      showNotification("Compte créé avec succès !", "success")
      navigate("/dashboard")
    } catch (error) {
      showNotification("Erreur lors de la création du compte", "error")
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

      localStorage.setItem("forsafinder_user", JSON.stringify(user))
      login(user)

      showNotification(`Inscription avec ${provider} réussie !`, "success")
      navigate("/dashboard")
    } catch (error) {
      showNotification(`Erreur d'inscription avec ${provider}`, "error")
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
            <h1>Créer un compte</h1>
            <p>Rejoignez ForsaFinder et découvrez votre potentiel</p>
          </div>

          {step === 1 ? (
            <>
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

              <form
                className="auth-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleNext()
                }}
              >
                <div className="user-type-selection">
                  <label>Je suis :</label>
                  <div className="type-buttons">
                    <button
                      type="button"
                      className={`type-btn ${userType === "student" ? "active" : ""}`}
                      onClick={() => setUserType("student")}
                    >
                      <i className="fas fa-user-graduate"></i>
                      Étudiant
                    </button>
                    <button
                      type="button"
                      className={`type-btn ${userType === "company" ? "active" : ""}`}
                      onClick={() => setUserType("company")}
                    >
                      <i className="fas fa-building"></i>
                      Entreprise
                    </button>
                  </div>
                  {errors.userType && <span className="error-message">{errors.userType}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Prénom</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? "error" : ""}
                      placeholder="Votre prénom"
                      required
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Nom</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? "error" : ""}
                      placeholder="Votre nom"
                      required
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>

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
                    placeholder="Créez un mot de passe fort"
                    required
                  />
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div
                        className="strength-fill"
                        style={{
                          width: `${(passwordStrength.score / 5) * 100}%`,
                          backgroundColor:
                            passwordStrength.score >= 4
                              ? "#10B981"
                              : passwordStrength.score >= 3
                                ? "#F59E0B"
                                : "#EF4444",
                        }}
                      ></div>
                    </div>
                    <span className="strength-text">{passwordStrength.feedback}</span>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? "error" : ""}
                    placeholder="Confirmez votre mot de passe"
                    required
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <button type="submit" className="auth-btn" disabled={isLoading}>
                  <i className="fas fa-arrow-right"></i>
                  Continuer
                </button>
              </form>
            </>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              {userType === "student" ? (
                <>
                  <div className="form-group">
                    <label htmlFor="university">Université</label>
                    <input
                      type="text"
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className={errors.university ? "error" : ""}
                      placeholder="Nom de votre université"
                      required
                    />
                    {errors.university && <span className="error-message">{errors.university}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="field">Domaine d'étude</label>
                    <select
                      id="field"
                      name="field"
                      value={formData.field}
                      onChange={handleChange}
                      className={errors.field ? "error" : ""}
                      required
                    >
                      <option value="">Sélectionnez votre domaine</option>
                      <option value="informatique">Informatique</option>
                      <option value="ingenierie">Ingénierie</option>
                      <option value="business">Business</option>
                      <option value="marketing">Marketing</option>
                      <option value="design">Design</option>
                      <option value="finance">Finance</option>
                    </select>
                    {errors.field && <span className="error-message">{errors.field}</span>}
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="companyName">Nom de l'entreprise</label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={errors.companyName ? "error" : ""}
                      placeholder="Nom de votre entreprise"
                      required
                    />
                    {errors.companyName && <span className="error-message">{errors.companyName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="industry">Secteur d'activité</label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className={errors.industry ? "error" : ""}
                      required
                    >
                      <option value="">Sélectionnez votre secteur</option>
                      <option value="technology">Technologie</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Santé</option>
                      <option value="education">Éducation</option>
                      <option value="retail">Commerce</option>
                      <option value="manufacturing">Industrie</option>
                    </select>
                    {errors.industry && <span className="error-message">{errors.industry}</span>}
                  </div>
                </>
              )}

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className={errors.terms ? "error" : ""}
                  />
                  <span className="checkmark"></span>
                  J'accepte les{" "}
                  <Link to="/terms" target="_blank">
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link to="/privacy" target="_blank">
                    politique de confidentialité
                  </Link>
                </label>
                {errors.terms && <span className="error-message">{errors.terms}</span>}
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                  <i className="fas fa-arrow-left"></i>
                  Retour
                </button>
                <button type="submit" className="auth-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Création...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus"></i>
                      Créer mon compte
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="auth-footer">
            <p>
              Déjà un compte ? <Link to="/login">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
