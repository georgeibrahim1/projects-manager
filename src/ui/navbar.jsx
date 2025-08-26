import React from 'react'

export default function NavBar({children}) {
  return (
    <div>
        <div>Logo</div>
        <div>
            {children}
        </div>
    </div>
  )
}
