import React, { useState } from 'react'

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <div style={{display: 'flex', gap: '10px'}}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="flex-grow"
            style={{flexGrow: 1}}
          />
          <button type="submit" className="btn">Search</button>
        </div>
      </div>
    </form>
  )
}

export default SearchBar