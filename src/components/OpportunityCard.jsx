"use client"

import { useState } from "react"
import PropTypes from "prop-types"
import "./OpportunityCard.css"

function OpportunityCard({ opportunity, onApply }) {
  const [isApplying, setIsApplying] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  const handleApply = async () => {
    if (hasApplied || isApplying) return

    setIsApplying(true)

    try {
      await onApply(opportunity.id)
      setHasApplied(true)
    } catch (error) {
      console.error("Error applying to opportunity:", error)
    } finally {
      setIsApplying(false)
    }
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

  return (
    <div className="opportunity-card">
      {opportunity.featured && (
        <div className="featured-badge">
          <i className="fas fa-star"></i> Recommandé
        </div>
      )}

      <div className="opportunity-header">
        <div className="opportunity-info">
          <h3>{opportunity.title}</h3>
          <div className="opportunity-company">{opportunity.company}</div>
          <div className="opportunity-meta">
            <span>
              <i className="fas fa-map-marker-alt"></i> {opportunity.location}
            </span>
            <span>
              <i className="fas fa-clock"></i> {getTimeAgo(opportunity.postedDate)}
            </span>
            <span>
              <i className="fas fa-money-bill-wave"></i> {opportunity.salary}
            </span>
          </div>
        </div>
        <div className="opportunity-type">{opportunity.type}</div>
      </div>

      <div className="opportunity-description">{opportunity.description}</div>

      <div className="opportunity-tags">
        {opportunity.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="opportunity-footer">
        <div className="opportunity-date">Publié {getTimeAgo(opportunity.postedDate)}</div>
        <button
          className={`apply-btn ${hasApplied ? "applied" : ""}`}
          onClick={handleApply}
          disabled={isApplying || hasApplied}
        >
          {isApplying ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Candidature...
            </>
          ) : hasApplied ? (
            <>
              <i className="fas fa-check"></i>
              Candidature envoyée
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane"></i>
              Postuler
            </>
          )}
        </button>
      </div>
    </div>
  )
}

OpportunityCard.propTypes = {
  opportunity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    postedDate: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    featured: PropTypes.bool,
  }).isRequired,
  onApply: PropTypes.func.isRequired,
}

export default OpportunityCard
