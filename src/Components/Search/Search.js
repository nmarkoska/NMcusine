import React from 'react'

export const Search = ({setSearchTerm}) => {
  return (
    <div>

<input
      type="text"
     // value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search recipes by name"
    />
    </div>
  )
}
