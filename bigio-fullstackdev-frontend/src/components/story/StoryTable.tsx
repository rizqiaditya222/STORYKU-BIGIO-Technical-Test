'use client'

import React from 'react'
import { useDropdown } from '@/hooks/useDropdown'
import DropdownMenu from '@/components/ui/DropdownMenu'

interface Story {
  id: string
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
  const { openDropdown, dropdownRef, toggleDropdown, closeDropdown } = useDropdown()
  
  return (
    <div className='w-full overflow-x-auto'>
      <table className='w-full min-w-[800px]'>
        <thead className='border-b border-gray-200 bg-gray-50'>
          <tr>
            <th className='text-left py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700'>No</th>
            <th className='text-left py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700'>Title</th>
            <th className='text-left py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700'>Writers</th>
            <th className='text-left py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700'>Category</th>
            <th className='text-left py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700'>Keyword</th>
            <th className='text-left py-3 px-3 md:px-4 text-xs md:text-sm font-semibold text-gray-700'>Status</th>
            <th className='py-3 px-3 md:px-4 w-12'></th>
          </tr>
        </thead>
        <tbody>
          {data.map((story) => (
            <tr key={story.no} className='border-b border-gray-100 hover:bg-gray-50 transition-colors'>
              <td className='py-3 px-3 md:px-4 text-xs md:text-sm text-gray-700'>{story.no}</td>
              <td 
                className='py-3 px-3 md:px-4 text-xs md:text-sm text-gray-700 cursor-pointer hover:text-storyku-blue font-medium'
                onClick={() => onRowClick?.(story)}
              >
                {story.title}
              </td>
              <td className='py-3 px-3 md:px-4 text-xs md:text-sm text-gray-700'>{story.writers}</td>
              <td className='py-3 px-3 md:px-4 text-xs md:text-sm text-gray-700'>{story.category}</td>
              <td className='py-3 px-3 md:px-4'>
                <div className='flex gap-1.5 flex-wrap'>
                  {story.keywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className='px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full'
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </td>
              <td className='py-3 px-3 md:px-4'>
                <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                  story.status === 'Draft' 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {story.status}
                </span>
              </td>
              <td className='py-3 px-3 md:px-4'>
                <div className='relative' ref={openDropdown === story.no ? dropdownRef : null}>
                  <button 
                    onClick={() => toggleDropdown(story.no)}
                    className='p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors'
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <circle cx="8" cy="3" r="1.5"/>
                      <circle cx="8" cy="8" r="1.5"/>
                      <circle cx="8" cy="13" r="1.5"/>
                    </svg>
                  </button>

                  <DropdownMenu
                    isOpen={openDropdown === story.no}
                    onEdit={() => {
                      onEdit?.(story)
                      closeDropdown()
                    }}
                    onDelete={() => {
                      onDelete?.(story)
                      closeDropdown()
                    }}
                  />
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
