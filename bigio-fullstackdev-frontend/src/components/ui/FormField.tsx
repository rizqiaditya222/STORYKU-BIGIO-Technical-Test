import React from 'react'

interface FormFieldProps {
  label: string
  type?: 'text' | 'textarea'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  rows?: number
  className?: string
}

const FormField = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange,
  rows = 4,
  className = ''
}: FormFieldProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <p className="font-bold text-gray-700 text-md">{label}</p>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 outline-none placeholder-gray-400 resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="mt-2 h-12 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 outline-none placeholder-gray-400"
        />
      )}
    </div>
  )
}

export default FormField
