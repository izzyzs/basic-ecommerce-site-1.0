import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import MenuIcon from '../../svg/MenuIcon'
import ShoppingCartIcon from '../../svg/ShoppingCartIcon'


function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
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
            <button onClick={toggleSidebar} className='sm:p-2 text-sm sm:text-base'>
              <MenuIcon className="fill-slate-800 w-6 h-6" />
            </button>
        </nav>

        {/* SideBar */}
        <aside
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg">Menu</h2>
          <button onClick={toggleSidebar}>
            <span className="text-black">Close</span>
          </button>
        </div>
        <nav className="p-4">
          <ul>
            <li>
              <Link to="/sign-in" className="block py-2 text-gray-800">User Login/Sign Up</Link>
            </li>
            <li>
              <Link to="/cart" className="block py-2 text-gray-800">Cart</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </header>
  )
}

export default Header