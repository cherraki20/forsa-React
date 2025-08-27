import { Link } from "react-router-dom"
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ForsaFinder</h3>
            <p>
              La plateforme leader qui connecte les étudiants marocains avec les meilleures opportunités
              professionnelles.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=61579799886242" target="_blank" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://x.com/ForsaFinder" target="_blank" className="social-link" aria-label="X">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com/company/108788266/admin/page-posts/published/?shareMsgArgs=null" target="_blank" className="social-link" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.instagram.com/forsafinder/" target="_blank" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Navigation</h3>
            <ul>
              <li>
                <Link to="/">
                  <i className="fas fa-home"></i> Accueil
                </Link>
              </li>
              <li>
                <Link to="/opportunities">
                  <i className="fas fa-briefcase"></i> Opportunités
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <i className="fas fa-tachometer-alt"></i> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <i className="fas fa-envelope"></i> Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Pour les entreprises</h3>
            <ul>
              <li>
                <a href="#">
                  <i className="fas fa-plus-circle"></i> Publier une offre
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-tag"></i> Nos tarifs
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-trophy"></i> Success Stories
                </a>
              </li>
              <li>
                <Link to="/contact">
                  <i className="fas fa-headset"></i> Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="mailto:contact@forsafinder.ma">
                  <i className="fas fa-envelope"></i> contact@forsafinder.ma
                </a>
              </li>
              <li>
                <a href="tel:+212500000000">
                  <i className="fas fa-phone"></i> +212 5XX-XXXXXX
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-map-marker-alt"></i> Casablanca, Maroc
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 ForsaFinder. Tous droits réservés. | Conçu avec ❤️ au Maroc</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
