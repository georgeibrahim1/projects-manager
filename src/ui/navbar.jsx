import React from 'react'
import Logo from './logo'

export default function NavBar({children}) {
  return (
    <div>
        <Logo/>
        <div>
            {children}
        </div>
    </div>
  )
}
