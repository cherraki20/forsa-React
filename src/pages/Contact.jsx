"use client"

import { useState, useEffect } from "react"
import { useNotification } from "../hooks/useNotification"
import "./Contact.css"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const { showNotification } = useNotification()

  useEffect(() => {
    document.title = "Contact - ForsaFinder"
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis"
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet est requis"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis"
    } else if (formData.message.length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      showNotification("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.", "success")

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        type: "general",
      })
    } catch (error) {
      showNotification("Erreur lors de l'envoi du message. Veuillez réessayer.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Contactez-nous</h1>
          <p>Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question ou suggestion.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>Email</h3>
              <p>contact@forsafinder.ma</p>
              <a href="mailto:contact@forsafinder.ma">Nous écrire</a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h3>Téléphone</h3>
              <p>+212 5XX-XXXXXX</p>
              <a href="tel:+212500000000">Nous appeler</a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Adresse</h3>
              <p>Casablanca, Maroc</p>
              <a href="#">Voir sur la carte</a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Horaires</h3>
              <p>Lun - Ven: 9h - 18h</p>
              <p>Sam: 9h - 13h</p>
            </div>
          </div>

          <div className="contact-form-container">
            <div className="form-header">
              <h2>Envoyer un message</h2>
              <p>Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="type">Type de demande</label>
                <select id="type" name="type" value={formData.type} onChange={handleChange}>
                  <option value="general">Question générale</option>
                  <option value="technical">Support technique</option>
                  <option value="partnership">Partenariat</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                    placeholder="Votre nom complet"
                    required
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
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
              </div>

              <div className="form-group">
                <label htmlFor="subject">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? "error" : ""}
                  placeholder="Sujet de votre message"
                  required
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? "error" : ""}
                  placeholder="Décrivez votre demande en détail..."
                  rows="6"
                  required
                />
                <div className="char-count">{formData.message.length} caractères</div>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <button type="submit" className="contact-submit-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
