'use client'

import React from 'react'
import Dropdown from '@/components/ui/Dropdown'
import MainButton from '@/components/ui/MainButton'
import SecondaryButton from '@/components/ui/SecondaryButton'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onFilter?: (filters: { category: string; status: string }) => void
}

const FilterModal = ({ isOpen, onClose, onFilter }: FilterModalProps) => {
  const [category, setCategory] = React.useState('')
  const [status, setStatus] = React.useState('')

const categoryOptions = [
    { value: 'Financial', label: 'Financial' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Health', label: 'Health' }
]

const statusOptions = [
    { value: 'Publish', label: 'Publish' },
    { value: 'Draft', label: 'Draft' }
]

  const handleReset = () => {
    setCategory('')
    setStatus('')
  }

  const handleFilter = () => {
    onFilter?.({ category, status })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Filter</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="space-y-6 mb-8">
          <Dropdown
            label="Category"
            placeholder="Category"
            value={category}
            onChange={setCategory}
            options={categoryOptions}
          />

          <Dropdown
            label="Status"
            placeholder="Status"
            value={status}
            onChange={setStatus}
            options={statusOptions}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <SecondaryButton label="Reset" onClick={handleReset} />
          
          <div className="flex gap-3">
            <SecondaryButton label="Cancel" onClick={onClose} />
            <MainButton label="Filter" variant="orange" onClick={handleFilter} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterModal
