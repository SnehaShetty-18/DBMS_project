import React from 'react'

const UpcomingEvents = ({ events }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Upcoming Events</h3>
        <span className="status-badge">{events.length}</span>
      </div>
      <div className="card-body">
        {events.length === 0 ? (
          <p className="text-center">No upcoming events.</p>
        ) : (
          <ul style={{listStyle: 'none', padding: 0}}>
            {events.map((event, index) => (
              <li key={index} style={{padding: '15px 0', borderBottom: '1px solid #eee'}}>
                <div className="flex-between">
                  <div>
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <p><strong>{event.date}</strong></p>
                    <p>{event.time}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <button className="btn">RSVP</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default UpcomingEvents