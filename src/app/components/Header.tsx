import React from 'react'

const Header = () => {
  return (
    <div className='m-2 h-14 header flex justify-between shadow-xl'>
        <div className='left'>
            <img className='mx-2 w-30 h-12' src='images/litchieslogo.png' alt='litchies-logo' />
        </div>
        <div className='right m-1 py-1 flex '>
            <div className='search relative px-2' >
                <input 
                className="block p-2 pl-10 w-44 outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                type='text' placeholder='Search' />
                <img className='w-6 absolute top-2 left-4' src='images/search.svg' alt='Search Box' />
            </div>
            <div className='cart'>
                <img className='w-8 h-8' src='images/shopping-cart.svg' alt='Shopping Cart' />
            </div>
        </div> 
    </div>
  )
}

export default Header;