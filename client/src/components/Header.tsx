import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <header>
        <nav className='flex flex-row gap-3 m-4'>
            <Link to={'/'} className='font-medium'>Home</Link>
            <Link to={'/hair'}>Hair</Link>
            <Link to={'/body'}>Body</Link>
            <Link to={'/health'}>Health</Link>
        </nav>
        <button></button>
    </header>
  )
}

export default Header