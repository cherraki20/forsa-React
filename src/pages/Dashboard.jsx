"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNotification } from "../hooks/useNotification"
import "./Dashboard.css"

function Dashboard() {
  const [applications, setApplications] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  })
  const [user, setUser] = useState(null)
  const { isAuthenticated } = useAuth()
  const { showNotification } = useNotification()

  useEffect(() => {
    document.title = "Dashboard - ForsaFinder"

    if (!isAuthenticated) {
      // Redirect to login or show login form
      return
    }

    loadUserData()
    loadApplications()
  }, [isAuthenticated])

  const loadUserData = () => {
    const userData = JSON.parse(localStorage.getItem("forsafinder_user") || "null")
    if (userData) {
      setUser(userData)
    } else {
      // Create demo user
      const demoUser = {
        firstName: "Utilisateur",
        lastName: "Demo",
        email: "demo@forsafinder.ma",
        university: "Université Mohammed V",
        field: "informatique",
      }
      setUser(demoUser)
      localStorage.setItem("forsafinder_user", JSON.stringify(demoUser))
    }
  }

  const loadApplications = () => {
    const savedApplications = JSON.parse(localStorage.getItem("forsafinder_applications") || "[]")

    if (savedApplications.length === 0) {
      // Create demo applications
      const demoApplications = [
        {
          id: 1,
          opportunityId: 1,
          opportunity: {
            title: "Développeur Frontend React",
            company: "TechCorp Maroc",
            location: "Casablanca",
            type: "Stage",
          },
          status: "accepted",
          appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          lastUpdate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          feedback: "Félicitations ! Votre profil correspond parfaitement à nos attentes.",
        },
        {
          id: 2,
          opportunityId: 2,
          opportunity: {
            title: "Designer UX/UI",
            company: "Creative Studio",
            location: "Rabat",
            type: "Emploi",
          },
          status: "pending",
          appliedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          lastUpdate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 3,
          opportunityId: 3,
          opportunity: {
            title: "Analyste Marketing Digital",
            company: "MarketHub",
            location: "Marrakech",
            type: "Stage",
          },
          status: "rejected",
          appliedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          lastUpdate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          feedback: "Merci pour votre candidature. Nous avons choisi un autre profil pour ce poste.",
        },
      ]

      localStorage.setItem("forsafinder_applications", JSON.stringify(demoApplications))
      setApplications(demoApplications)
      updateStats(demoApplications)
    } else {
      setApplications(savedApplications)
      updateStats(savedApplications)
    }
  }

  const updateStats = (apps) => {
    const total = apps.length
    const pending = apps.filter((app) => app.status === "pending").length
    const accepted = apps.filter((app) => app.status === "accepted").length
    const rejected = apps.filter((app) => app.status === "rejected").length

    setStats({ total, pending, accepted, rejected })
  }

  const getStatusText = (status) => {
    const statusMap = {
      pending: "En attente",
      accepted: "Acceptée",
      rejected: "Refusée",
    }
    return statusMap[status] || status
  }

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "il y a 1 jour"
    if (diffDays < 7) return `il y a ${diffDays} jours`
    if (diffDays < 30) return `il y a ${Math.floor(diffDays / 7)} semaine${Math.floor(diffDays / 7) > 1 ? "s" : ""}`
    return `il y a ${Math.floor(diffDays / 30)} mois`
  }

  const handleLogout = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      localStorage.removeItem("forsafinder_user")
      localStorage.removeItem("forsafinder_applications")
      showNotification("Déconnexion réussie", "success")
      window.location.href = "/"
    }
  }

  if (!user) {
    return (
      <div className="dashboard-page loading">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Chargement du dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Bienvenue, {user.firstName}!</h1>
            <p>Voici un aperçu de votre activité sur ForsaFinder</p>
          </div>
          <div className="dashboard-actions">
            <button onClick={handleLogout} className="btn btn-outline">
              <i className="fas fa-sign-out-alt"></i>
              Déconnexion
            </button>
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card total-applications">
              <div className="stat-icon">
                <i className="fas fa-paper-plane"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Candidatures envoyées</div>
              </div>
            </div>

            <div className="stat-card accepted-applications">
              <div className="stat-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.accepted}</div>
                <div className="stat-label">Candidatures acceptées</div>
              </div>
            </div>

            <div className="stat-card pending-applications">
              <div className="stat-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.pending}</div>
                <div className="stat-label">En attente de réponse</div>
              </div>
            </div>

            <div className="stat-card rejected-applications">
              <div className="stat-icon">
                <i className="fas fa-times-circle"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.rejected}</div>
                <div className="stat-label">Candidatures refusées</div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="applications-section">
            <div className="section-header">
              <h2>Mes Candidatures</h2>
              <div className="section-actions">
                <a href="/opportunities" className="btn btn-primary">
                  <i className="fas fa-plus"></i>
                  Nouvelle candidature
                </a>
              </div>
            </div>

            <div className="applications-list">
              {applications.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <i className="fas fa-inbox"></i>
                  </div>
                  <h3>Aucune candidature</h3>
                  <p>Commencez par postuler à des opportunités qui vous intéressent</p>
                  <a href="/opportunities" className="btn btn-primary">
                    <i className="fas fa-search"></i>
                    Découvrir des opportunités
                  </a>
                </div>
              ) : (
                applications.map((application) => (
                  <div key={application.id} className="application-item">
                    <div className="application-status">
                      <div className={`status-indicator ${application.status}`}></div>
                    </div>
                    <div className="application-info">
                      <h3>{application.opportunity.title}</h3>
                      <p className="company">{application.opportunity.company}</p>
                      <div className="application-meta">
                        <span>
                          <i className="fas fa-map-marker-alt"></i>
                          {application.opportunity.location}
                        </span>
                        <span>
                          <i className="fas fa-calendar"></i>
                          Postulé {getTimeAgo(application.appliedDate)}
                        </span>
                        <span>
                          <i className="fas fa-tag"></i>
                          {application.opportunity.type}
                        </span>
                      </div>
                      {application.feedback && (
                        <div className="application-feedback">
                          <p>{application.feedback}</p>
                        </div>
                      )}
                    </div>
                    <div className="application-status-badge">
                      <span className={`status-badge ${application.status}`}>{getStatusText(application.status)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
