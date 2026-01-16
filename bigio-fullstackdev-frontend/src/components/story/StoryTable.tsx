'use client'

import React, { useState, useRef, useEffect } from 'react'

interface Story {
  no: number
  title: string
  writers: string
  category: string
  keywords: string[]
  status: 'Draft' | 'Publish'
}

interface StoryTableProps {
  data: Story[]
  onEdit?: (story: Story) => void
  onDelete?: (story: Story) => void
  onRowClick?: (story: Story) => void
}

const StoryTable = ({ data, onEdit, onDelete, onRowClick }: StoryTableProps) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleDropdown = (no: number) => {
    setOpenDropdown(openDropdown === no ? null : no)
  }
  return (
    <div className='w-full overflow-x-auto'>
      <table className='w-full'>
        <thead className='border-b border-gray-200'>
          <tr>
            <th className='text-left py-4 px-4 text-sm font-semibold text-gray-700'>No</th>
            <th className='text-left py-4 px-4 text-sm font-semibold text-gray-700'>Title</th>
            <th className='text-left py-4 px-4 text-sm font-semibold text-gray-700'>Writers</th>
            <th className='text-left py-4 px-4 text-sm font-semibold text-gray-700'>Category</th>
            <th className='text-left py-4 px-4 text-sm font-semibold text-gray-700'>Keyword</th>
            <th className='text-left py-4 px-4 text-sm font-semibold text-gray-700'>Status</th>
            <th className='py-4 px-4'></th>
          </tr>
        </thead>
        <tbody>
          {data.map((story) => (
            <tr key={story.no} className='border-b border-gray-100 hover:bg-gray-50'>
              <td className='py-4 px-4 text-sm text-gray-700'>{story.no}</td>
              <td 
                className='py-4 px-4 text-sm text-gray-700 cursor-pointer hover:text-storyku-blue'
                onClick={() => onRowClick?.(story)}
              >
                {story.title}
              </td>
              <td className='py-4 px-4 text-sm text-gray-700'>{story.writers}</td>
              <td className='py-4 px-4 text-sm text-gray-700'>{story.category}</td>
              <td className='py-4 px-4'>
                <div className='flex gap-2 flex-wrap'>
                  {story.keywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className='px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full'
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </td>
              <td className='py-4 px-4'>
                <span className={`px-4 py-1.5 rounded-full text-xs font-medium ${
                  story.status === 'Draft' 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {story.status}
                </span>
              </td>
              <td className='py-4 px-4'>
                <div className='relative' ref={openDropdown === story.no ? dropdownRef : null}>
                  <button 
                    onClick={() => toggleDropdown(story.no)}
                    className='text-gray-400 hover:text-gray-600'
                  >
                    <span className='text-xl cursor-pointer'>⋮</span>
                  </button>

                  {openDropdown === story.no && (
                    <div className='absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10'>
                      <button
                        onClick={() => {
                          onEdit?.(story)
                          setOpenDropdown(null)
                        }}
                        className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          onDelete?.(story)
                          setOpenDropdown(null)
                        }}
                        className='w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2'
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StoryTable
