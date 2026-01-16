import React from 'react'

interface SecondaryButtonProps {
  label: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const SecondaryButton = ({ 
  label, 
  onClick, 
  className = '',
  type = 'button'
}: SecondaryButtonProps) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={`
        px-6 py-3 border border-gray-300 rounded-full 
        text-sm font-medium text-gray-700 
        hover:bg-gray-50 transition-colors
        ${className}
      `}
    >
      {label}
    </button>
  )
}

export default SecondaryButton
