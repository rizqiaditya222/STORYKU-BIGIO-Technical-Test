import React from 'react'
import Image from 'next/image'

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  label: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  options: DropdownOption[]
  className?: string
  disabled?: boolean
}

const Dropdown = ({ 
  label, 
  placeholder = 'Select an option',
  value, 
  onChange,
  options,
  className = '',
  disabled = false
}: DropdownProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <p className="font-bold text-gray-700 text-md">{label}</p>
      <div className="relative mt-2">
        <select 
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={`h-12 w-full appearance-none rounded-md border border-gray-300 bg-white px-4 pr-10 text-gray-700 outline-none ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Image
          src="/icons/next-icon.svg"
          alt="Arrow"
          width={16}
          height={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 opacity-60"
        />
      </div>
    </div>
  )
}

export default Dropdown
