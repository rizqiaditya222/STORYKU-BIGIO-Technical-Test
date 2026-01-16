import React from 'react'

interface FormFieldProps {
  label: string
  type?: 'text' | 'textarea'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  rows?: number
  className?: string
  readOnly?: boolean
}

const FormField = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange,
  rows = 4,
  className = '',
  readOnly = false
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
          readOnly={readOnly}
          className={`mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 outline-none placeholder-gray-400 resize-none ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`mt-2 h-12 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 outline-none placeholder-gray-400 ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
      )}
    </div>
  )
}

export default FormField
