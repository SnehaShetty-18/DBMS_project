import React, { useState, useEffect } from 'react'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Mock notifications
    const mockNotifications = [
      {
        id: 1,
        message: 'John Smith accepted your mentorship request',
        time: '5 minutes ago',
        read: false
      },
      {
        id: 2,
        message: 'New internship posted: Data Analyst at Tech Corp',
        time: '1 hour ago',
        read: false
      },
      {
        id: 3,
        message: 'Jane Doe sent you a message',
        time: '2 hours ago',
        read: true
      }
    ]
    
    setNotifications(mockNotifications)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="relative">
      <button 
        className="btn" 
        onClick={toggleVisibility}
        style={{position: 'relative'}}
      >
        Notifications
        {unreadCount > 0 && (
          <span className="status-badge" style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: '#e74c3c',
            color: 'white',
            minWidth: '20px',
            height: '20px',
            borderRadius: '50%',
            fontSize: '0.7rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {unreadCount}
          </span>
        )}
      </button>
      
      {visible && (
        <div className="card" style={{
          position: 'absolute',
          top: '50px',
          right: '0',
          minWidth: '300px',
          zIndex: '1000',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}>
          <div className="card-header">
            <h3>Notifications</h3>
          </div>
          <div className="card-body" style={{maxHeight: '300px', overflowY: 'auto'}}>
            {notifications.length === 0 ? (
              <p className="text-center">No notifications</p>
            ) : (
              <ul style={{listStyle: 'none', padding: 0}}>
                {notifications.map(notification => (
                  <li 
                    key={notification.id} 
                    className="mb-2 pb-2" 
                    style={{borderBottom: '1px solid #eee'}}
                  >
                    <p style={{fontWeight: notification.read ? 'normal' : 'bold'}}>
                      {notification.message}
                    </p>
                    <small style={{color: '#7f8c8d'}}>{notification.time}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="card-footer">
            <button className="btn btn-secondary btn-block">Mark All as Read</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications