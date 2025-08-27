import { Link } from "react-router-dom"
import "./Hero.css"

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <i className="fas fa-star"></i>
              Plateforme #1 au Maroc
            </div>

            <h1 className="hero-title">
              Transformez Votre <span className="highlight">Avenir Professionnel</span> Dès Aujourd'hui
            </h1>

            <p className="hero-subtitle">
              Rejoignez plus de 10,000 étudiants qui ont déjà trouvé leur opportunité parfaite.
              <br />
              Votre succès commence ici...
            </p>

            <div className="hero-buttons">
              <Link to="/register" className="btn-hero btn-hero-primary">
                <i className="fas fa-user-graduate"></i>
                Commencer maintenant
              </Link>
              <Link to="/opportunities" className="btn-hero btn-hero-secondary">
                <i className="fas fa-search"></i>
                Découvrir les opportunités
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">10K+</span>
                <span className="hero-stat-label">Étudiants Actifs</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">500+</span>
                <span className="hero-stat-label">Entreprises</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">95%</span>
                <span className="hero-stat-label">Taux de Réussite</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-container">
              <img
                src="/diverse-students-laptops.png"
                alt="Étudiants travaillant sur des ordinateurs portables"
                className="hero-image"
              />
              <div className="hero-overlay">
                <h4>
                  <i className="fas fa-chart-line"></i>
                  Progression
                </h4>
                <p>Votre profil est à 85% complet</p>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <div className="progress-text">85% complété</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
