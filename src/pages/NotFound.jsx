import { Link } from "react-router-dom"
import "./NotFound.css"

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-illustration">
            <div className="error-code">404</div>
            <div className="error-icon">
              <i className="fas fa-search"></i>
            </div>
          </div>

          <div className="not-found-text">
            <h1>Page non trouvée</h1>
            <p>Désolé, la page que vous recherchez n'existe pas ou a été déplacée.</p>
            <div className="not-found-actions">
              <Link to="/" className="btn btn-primary">
                <i className="fas fa-home"></i>
                Retour à l'accueil
              </Link>
              <Link to="/opportunities" className="btn btn-outline">
                <i className="fas fa-briefcase"></i>
                Voir les opportunités
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
