import React from 'react'

const Statistics = ({ stats }) => {
  return (
    <div className="grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <h3>{stat.label}</h3>
          <p>{stat.value}</p>
          {stat.change && (
            <small style={{color: stat.change > 0 ? '#27ae60' : '#e74c3c'}}>
              {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}% from last month
            </small>
          )}
        </div>
      ))}
    </div>
  )
}

export default Statistics