"use client"

import { useState, useEffect } from "react"
import OpportunityCard from "../components/OpportunityCard"
import { useAuth } from "../hooks/useAuth"
import { useNotification } from "../hooks/useNotification"
import "./Opportunities.css"

function Opportunities() {
  const [opportunities, setOpportunities] = useState([])
  const [filteredOpportunities, setFilteredOpportunities] = useState([])
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    type: "",
    domain: "",
  })
  const [isLoading, setIsLoading] = useState(true)

  const { user } = useAuth()
  const { showNotification } = useNotification()

  // Sample opportunities data
  const opportunitiesData = [
    {
      id: 1,
      title: "Développeur Frontend React",
      company: "TechCorp Maroc",
      location: "Casablanca",
      type: "Stage",
      domain: "informatique",
      description:
        "Rejoignez notre équipe de développement pour créer des interfaces utilisateur modernes et intuitives avec React.js.",
      tags: ["React", "JavaScript", "CSS", "Git"],
      postedDate: "2024-01-14",
      salary: "3000-4000 MAD",
      requirements: ["Bac+3/4 en informatique", "Connaissance React", "Anglais technique"],
      featured: true,
    },
    {
      id: 2,
      title: "Assistant Marketing Digital",
      company: "Creative Studio",
      location: "Rabat",
      type: "Emploi",
      domain: "marketing",
      description:
        "Participez à la création et à l'exécution de campagnes marketing digital innovantes pour nos clients.",
      tags: ["SEO", "Social Media", "Google Ads", "Analytics"],
      postedDate: "2024-01-13",
      salary: "5000-6000 MAD",
      requirements: ["Formation marketing", "Google Analytics", "Anglais courant"],
      featured: false,
    },
    {
      id: 3,
      title: "Ingénieur DevOps",
      company: "CloudTech",
      location: "Casablanca",
      type: "Emploi",
      domain: "ingenierie",
      description: "Automatisez les déploiements et gérez l'infrastructure cloud de nos applications.",
      tags: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      postedDate: "2024-01-12",
      salary: "18000-25000 MAD",
      requirements: ["Expérience DevOps", "Maîtrise Docker", "Certification AWS"],
      featured: true,
    },
  ]

  useEffect(() => {
    document.title = "Opportunités - ForsaFinder"

    // Simulate API call
    const fetchOpportunities = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setOpportunities(opportunitiesData)
      setFilteredOpportunities(opportunitiesData)
      setIsLoading(false)
    }

    fetchOpportunities()
  }, [])

  useEffect(() => {
    filterOpportunities()
  }, [filters, opportunities])

  const filterOpportunities = () => {
    let filtered = opportunities

    if (filters.search) {
      filtered = filtered.filter(
        (opp) =>
          opp.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          opp.company.toLowerCase().includes(filters.search.toLowerCase()) ||
          opp.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          opp.tags.some((tag) => tag.toLowerCase().includes(filters.search.toLowerCase())),
      )
    }

    if (filters.location) {
      filtered = filtered.filter((opp) => opp.location === filters.location)
    }

    if (filters.type) {
      filtered = filtered.filter((opp) => opp.type === filters.type)
    }

    if (filters.domain) {
      filtered = filtered.filter((opp) => opp.domain === filters.domain)
    }

    setFilteredOpportunities(filtered)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const handleApply = async (opportunityId) => {
    if (!user) {
      showNotification("Veuillez vous connecter pour postuler", "warning")
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Save application
    const applications = JSON.parse(localStorage.getItem("forsafinder_applications") || "[]")
    const opportunity = opportunities.find((opp) => opp.id === opportunityId)

    const newApplication = {
      id: Date.now(),
      opportunityId,
      opportunity,
      status: "pending",
      appliedDate: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
    }

    applications.push(newApplication)
    localStorage.setItem("forsafinder_applications", JSON.stringify(applications))

    showNotification("Candidature envoyée avec succès !", "success")
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      type: "",
      domain: "",
    })
  }

  if (isLoading) {
    return (
      <div className="opportunities-page loading">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Chargement des opportunités...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="opportunities-page">
      <div className="container">
        <div className="opportunities-header">
          <h1>Découvrez vos Opportunités</h1>
          <p>Trouvez le stage ou l'emploi parfait parmi nos opportunités vérifiées</p>
        </div>

        <div className="opportunities-filters">
          <div className="search-container">
            <div className="search-input-wrapper">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                placeholder="Rechercher par titre, entreprise ou compétence..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="filters-row">
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="filter-select"
            >
              <option value="">Toutes les villes</option>
              <option value="Casablanca">Casablanca</option>
              <option value="Rabat">Rabat</option>
              <option value="Marrakech">Marrakech</option>
              <option value="Fès">Fès</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="filter-select"
            >
              <option value="">Tous les types</option>
              <option value="Stage">Stage</option>
              <option value="Emploi">Emploi</option>
              <option value="Freelance">Freelance</option>
            </select>

            <select
              value={filters.domain}
              onChange={(e) => handleFilterChange("domain", e.target.value)}
              className="filter-select"
            >
              <option value="">Tous les domaines</option>
              <option value="informatique">Informatique</option>
              <option value="marketing">Marketing</option>
              <option value="ingenierie">Ingénierie</option>
              <option value="design">Design</option>
            </select>

            <button onClick={clearFilters} className="clear-filters-btn">
              <i className="fas fa-times"></i>
              Effacer
            </button>
          </div>
        </div>

        <div className="opportunities-results">
          <div className="results-header">
            <span className="results-count">
              {filteredOpportunities.length} opportunité{filteredOpportunities.length !== 1 ? "s" : ""} trouvée
              {filteredOpportunities.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredOpportunities.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3>Aucune opportunité trouvée</h3>
              <p>Essayez de modifier vos critères de recherche</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                <i className="fas fa-refresh"></i>
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="opportunities-grid">
              {filteredOpportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} onApply={handleApply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Opportunities
