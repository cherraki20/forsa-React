import {
  FaBrain,
  FaShieldAlt,
  FaUsers,
  FaNetworkWired,
  FaChartLine,
  FaMobileAlt,
  FaStar,
} from "react-icons/fa";
import "./Features.css";

function Features() {
  const features = [
    {
      icon: <FaBrain />,
      title: "Matching Intelligent",
      description:
        "Notre algorithme d'IA analyse vos compétences et aspirations pour vous proposer les opportunités les plus pertinentes.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Opportunités Vérifiées",
      description:
        "Toutes nos offres sont vérifiées et proviennent d'entreprises de confiance pour garantir votre sécurité.",
    },
    {
      icon: <FaUsers />,
      title: "Accompagnement Personnalisé",
      description:
        "Bénéficiez d'un suivi individuel avec nos conseillers experts pour maximiser vos chances de réussite.",
    },
    {
      icon: <FaNetworkWired />,
      title: "Réseau Professionnel",
      description:
        "Connectez-vous avec des professionnels de votre domaine et développez votre réseau.",
    },
    {
      icon: <FaChartLine />,
      title: "Suivi de Progression",
      description:
        "Suivez votre évolution et recevez des conseils personnalisés pour améliorer votre profil.",
    },
    {
      icon: <FaMobileAlt />,
      title: "Application Mobile",
      description:
        "Restez connecté partout avec notre app mobile et recevez des notifications en temps réel.",
    },
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <FaStar className="inline text-yellow-400 mr-2" />
            Nos avantages
          </div>
          <h2 className="section-title">Pourquoi choisir ForsaFinder ?</h2>
          <p className="section-subtitle">
            Découvrez les fonctionnalités qui font de nous la plateforme de
            référence pour connecter les talents aux opportunités
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card animate-on-scroll">
              <div className="feature-icon text-green-500 text-4xl mb-4">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
