import React from 'react'
import Image from 'next/image'

interface MainButtonProps {
  label: string
  icon?: string
  onClick?: () => void
  variant?: 'orange' | 'blue'
  className?: string
}

const MainButton = ({ 
  label, 
  icon, 
  onClick, 
  variant = 'orange',
  className = '' 
}: MainButtonProps) => {
  const variantStyles = {
    orange: 'bg-storyku-orange hover:bg-storyku-orange-hover active:bg-storyku-orange-onclick',
    blue: 'bg-storyku-blue hover:bg-storyku-blue-hover active:bg-storyku-blue-onclick'
  }

  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-3 rounded-full 
        text-white text-sm font-medium transition-colors cursor-pointer
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {icon && (
        <Image 
          className='brightness-0 invert' 
          src={icon} 
          alt={label}
          width={20} 
          height={20} 
        />
      )}
      <span>{label}</span>
    </button>
  )
}

export default MainButton
