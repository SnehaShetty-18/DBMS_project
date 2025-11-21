import React from 'react'

const Connections = ({ connections }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>My Connections</h3>
        <span className="status-badge">{connections.length}</span>
      </div>
      <div className="card-body">
        {connections.length === 0 ? (
          <p className="text-center">You haven't connected with anyone yet.</p>
        ) : (
          <div className="grid">
            {connections.map((connection, index) => (
              <div key={index} className="card" style={{textAlign: 'center'}}>
                <div 
                  className="stat-card" 
                  style={{
                    margin: '0 auto 1rem', 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}
                >
                  <h4>{connection.name.charAt(0)}</h4>
                </div>
                <h4>{connection.name}</h4>
                <p>{connection.position}</p>
                <p>{connection.company}</p>
                <button className="btn btn-block">Message</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Connections