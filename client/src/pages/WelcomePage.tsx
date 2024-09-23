import React from 'react'
import { Link } from 'react-router-dom'

function Welcome() {
  return (
    <main className="dark:bg-slate-900 dark:text-slate-100">
        <div className='text-center md:h-[20vh] xl:h-[30vh] flex flex-col justify-center mx-5 sm:mx-32 xl:mx-56 mt-10 xl:mt-15 mb-4 xl:mb-10'>
          <h1 className='xl:text-6xl sm:text-4xl text-2xl font-bold'>Beauty and Wellness Redefined: Personal Solutions for Everyone</h1>
        </div>
        <div className="flex flex-row mx-3 sm:mx-28 lg:mx-56 space-x-2 h-[50vh]">
          <Link to={"/men"} className="bg-blue-500 flex-1 transition-all duration-300 hover:flex-3 hover:bg-blue-300 rounded-xl text-center flex justify-center items-center text-sm md:text-base lg:text-xl">MEN</Link>
          <Link to={"/women"} className="bg-blue-500 flex-1 transition-all duration-300 hover:flex-3 hover:bg-blue-300 rounded-xl text-center flex justify-center items-center text-sm md:text-base lg:text-xl">WOMEN</Link>
        </div>
    </main>
  )
}

export default Welcome