import React from 'react'

const Timeline = ({ events }) => {
  return (
    <div className="card">
      <h3>Recent Activity</h3>
      <div style={{position: 'relative', paddingLeft: '30px', borderLeft: '2px solid #667eea'}}>
        {events.map((event, index) => (
          <div key={index} style={{position: 'relative', marginBottom: '30px'}}>
            <div 
              style={{
                position: 'absolute',
                left: '-36px',
                top: '5px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#667eea',
                border: '3px solid white'
              }}
            ></div>
            <div>
              <h4>{event.title}</h4>
              <p>{event.description}</p>
              <small style={{color: '#7f8c8d'}}>{event.time}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline