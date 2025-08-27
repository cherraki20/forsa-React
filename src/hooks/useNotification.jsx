"use client"

import { useState, createContext, useContext } from "react"
import "./useNotification.css"

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const showNotification = (message, type = "info", duration = 5000) => {
    const id = Date.now() + Math.random()
    const notification = {
      id,
      message,
      type,
      duration,
    }

    setNotifications((prev) => [...prev, notification])

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
  }

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const value = {
    notifications,
    showNotification,
    removeNotification,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotification()

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
          onClick={() => removeNotification(notification.id)}
        >
          <div className="notification-content">
            <div className="notification-icon">
              {notification.type === "success" && <i className="fas fa-check-circle"></i>}
              {notification.type === "error" && <i className="fas fa-exclamation-circle"></i>}
              {notification.type === "warning" && <i className="fas fa-exclamation-triangle"></i>}
              {notification.type === "info" && <i className="fas fa-info-circle"></i>}
            </div>
            <div className="notification-message">{notification.message}</div>
          </div>
          <button
            className="notification-close"
            onClick={(e) => {
              e.stopPropagation()
              removeNotification(notification.id)
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      ))}
    </div>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
