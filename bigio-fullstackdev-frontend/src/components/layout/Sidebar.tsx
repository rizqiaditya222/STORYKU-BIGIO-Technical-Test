'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/',
      icon: '/icons/dashboard-icon.svg'
    },
    {
      label: 'Story Management',
      href: '/stories',
      icon: '/icons/books-icon.svg'
    }
  ]

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white border-r border-gray-200 h-screen
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-center">
          <Image 
            src="/images/storyku_logo.png" 
            alt="Storyku Logo" 
            width={150} 
            height={50}
            loading="eager"
            style={{ height: 'auto' }}
          />
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-4 px-6 py-3
                  font-kumbhsans font-medium transition-colors
                  ${ isActive 
                    ? 'bg-storyku-blue text-white' 
                    : 'text-gray-600 hover:bg-storyku-blue-hover '
                  }
                `}
              >
                <Image 
                  src={item.icon} 
                  alt={`${item.label} icon`}
                  width={20}
                  height={20}
                  className={isActive ? 'brightness-0 invert' : 'opacity-60'}
                />
                <span className='text-sm'>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 backdrop-blur-sm bg-black/20 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
