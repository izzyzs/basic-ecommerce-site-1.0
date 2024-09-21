import React from 'react'
import { Link } from 'react-router-dom'

import MenuIcon from '../../svg/MenuIcon'
import ShoppingCartIcon from '../../svg/ShoppingCartIcon'


function Header() {
  return (
    <header className='sticky top-0'>
        <nav className='flex flex-row gap-3 px-2 sm:px-4 py-2 sm:py-3 bg-slate-200'>
            <Link to={'/'} className='font-bold sm:p-2 text-sm sm:text-base hover:border-b-slate-800 border border-b-transparent'>Home</Link>
            <Link to={'/hair'} className='sm:p-2 text-sm sm:text-base hover:border-b-slate-800 border border-b-transparent'>Hair</Link>
            <Link to={'/body'} className='sm:p-2 text-sm sm:text-base hover:border-b-slate-800 border border-b-transparent'>Body</Link>
            <Link to={'/health'} className='sm:p-2 text-sm sm:text-base hover:border-b-slate-800 border border-b-transparent'>Health</Link>
            <Link to={'/cart'} className='ml-auto sm:p-2 text-sm sm:text-base hover:border-b-slate-800 border border-b-transparent'>
              <ShoppingCartIcon className="fill-slate-800 w-6 h-6"/>
            </Link>
            <Link to={'/menu'} className='sm:p-2 text-sm sm:text-base hover:border-b-slate-800 border border-b-transparent'>
              <MenuIcon className="fill-slate-800 w-6 h-6"/>
            </Link>
        </nav>
    </header>
  )
}

export default Header