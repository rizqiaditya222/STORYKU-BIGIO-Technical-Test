'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface TagsInputProps {
  label: string
  placeholder?: string
  value: string[]
  onChange: (tags: string[]) => void
  className?: string
}

const COMMON_TAGS = [
  'Romance', 'Drama', 'Comedy', 'Action', 'Fantasy', 'Sci-Fi',
  'Mystery', 'Thriller', 'Horror', 'Adventure', 'Slice of Life',
  'School', 'Friendship', 'Family', 'Love', 'Tragedy',
  'Historical', 'Supernatural', 'Psychological', 'Sports',
  'Music', 'Art', 'Business', 'Technology', 'Health',
  'Finance', 'Travel', 'Food', 'Fashion', 'Nature'
]

const TagsInput = ({
  label,
  placeholder = 'Type to add tags...',
  value = [],
  onChange,
  className = ''
}: TagsInputProps) => {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setInputValue(input)

    if (input.trim()) {
      const filtered = COMMON_TAGS.filter(tag =>
        tag.toLowerCase().includes(input.toLowerCase()) &&
        !value.some(v => v.toLowerCase() === tag.toLowerCase())
      )
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !value.some(v => v.toLowerCase() === trimmedTag.toLowerCase())) {
      onChange([...value, trimmedTag])
      setInputValue('')
      setSuggestions([])
      setShowSuggestions(false)
      inputRef.current?.focus()
    }
  }

  const removeTag = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      if (suggestions.length > 0 && showSuggestions) {
        addTag(suggestions[0])
      } else {
        addTag(inputValue)
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value.length - 1)
    }
  }

  return (
    <div className={`flex flex-col relative ${className}`} ref={containerRef}>
      <p className="font-bold text-gray-700 text-md mb-2">{label}</p>
      
      <div className="flex flex-wrap gap-2 items-center min-h-[48px] w-full rounded-md border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
        {value.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#F97316] text-white rounded-full text-sm font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="hover:bg-orange-600 rounded-full p-0.5 transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </span>
        ))}
        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (inputValue.trim() && suggestions.length > 0) {
              setShowSuggestions(true)
            }
          }}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto z-10">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => addTag(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-orange-50 text-gray-700 text-sm transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default TagsInput
