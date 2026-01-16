'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()

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
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 flex items-center justify-center">
        <Image src="/images/storyku_logo.png" alt="Storyku Logo" width={150} height={50} />
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-4 px-6 py-3
                font-kumbhsans font-medium transition-colors
                ${isActive 
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
  )
}

export default Sidebar
