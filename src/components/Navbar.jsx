"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import "./Navbar.css"

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const isActivePath = (path) => {
    return location.pathname === path
  }

  const handleLogout = () => {
    logout()
    closeMobileMenu()
  }

  return (
    <>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <nav className="nav-container">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="logo-text">
              <div className="main">ForsaFinder</div>
              <div className="sub">Mon Opportunité</div>
            </div>
          </Link>

          <div className="nav-menu">
            <Link to="/" className={`nav-link ${isActivePath("/") ? "active" : ""}`}>
              <i className="fas fa-home"></i>
              Accueil
            </Link>
            <Link to="/opportunities" className={`nav-link ${isActivePath("/opportunities") ? "active" : ""}`}>
              <i className="fas fa-briefcase"></i>
              Opportunités
            </Link>
            {/* Show Dashboard only when user is logged in */}
            {user && (
              <Link to="/dashboard" className={`nav-link ${isActivePath("/dashboard") ? "active" : ""}`}>
                <i className="fas fa-tachometer-alt"></i>
                Dashboard
              </Link>
            )}
            <Link to="/contact" className={`nav-link ${isActivePath("/contact") ? "active" : ""}`}>
              <i className="fas fa-envelope"></i>
              Contact
            </Link>
          </div>

          <div className="nav-buttons">
            {/* Show Login/Register only when user is NOT logged in */}
            {!user ? (
              <>
                <Link to="/login" className="btn btn-outline">
                  <i className="fas fa-sign-in-alt"></i>
                  Connexion
                </Link>
                <Link to="/register" className="btn btn-primary">
                  <i className="fas fa-user-plus"></i>
                  S'inscrire
                </Link>
              </>
            ) : (
              <>
                <span className="user-greeting">Bonjour, {user.firstName}</span>
                <button onClick={handleLogout} className="btn btn-outline">
                  <i className="fas fa-sign-out-alt"></i>
                  Déconnexion
                </button>
              </>
            )}
          </div>

          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-nav-header">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <div className="logo-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="logo-text">
              <div className="main">ForsaFinder</div>
              <div className="sub">Mon Opportunité</div>
            </div>
          </Link>
          <button className="mobile-nav-close" onClick={closeMobileMenu} aria-label="Close mobile menu">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="mobile-nav-links">
          <Link to="/" onClick={closeMobileMenu}>
            <i className="fas fa-home"></i> Accueil
          </Link>
          <Link to="/opportunities" onClick={closeMobileMenu}>
            <i className="fas fa-briefcase"></i> Opportunités
          </Link>
          {/* Show Dashboard only when user is logged in */}
          {user && (
            <Link to="/dashboard" onClick={closeMobileMenu}>
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </Link>
          )}
          <Link to="/contact" onClick={closeMobileMenu}>
            <i className="fas fa-envelope"></i> Contact
          </Link>
        </div>

        <div className="mobile-nav-buttons">
          {/* Show Login/Register only when user is NOT logged in */}
          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline" onClick={closeMobileMenu}>
                <i className="fas fa-sign-in-alt"></i>
                Connexion
              </Link>
              <Link to="/register" className="btn btn-primary" onClick={closeMobileMenu}>
                <i className="fas fa-user-plus"></i>
                S'inscrire
              </Link>
            </>
          ) : (
            <>
              <div className="mobile-user-greeting">Bonjour, {user.firstName}</div>
              <button onClick={handleLogout} className="btn btn-outline">
                <i className="fas fa-sign-out-alt"></i>
                Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
