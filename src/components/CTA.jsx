import { Link } from "react-router-dom"
import "./CTA.css"

function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-content">
          <h2>Prêt à transformer votre avenir ?</h2>
          <p>Rejoignez plus de 10,000 étudiants qui ont déjà trouvé leur voie grâce à ForsaFinder</p>

          <div className="cta-buttons">
            <Link to="/register" className="btn-cta btn-cta-primary">
              <i className="fas fa-user-graduate"></i>
              Étudiants - Inscription gratuite
            </Link>
            <Link to="/contact" className="btn-cta btn-cta-secondary">
              <i className="fas fa-building"></i>
              Entreprises - Rejoignez-nous
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
