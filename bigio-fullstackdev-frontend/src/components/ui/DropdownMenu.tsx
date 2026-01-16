import React from 'react'

interface DropdownMenuProps {
    isOpen: boolean
    onEdit?: () => void
    onDelete?: () => void
    align?: 'left' | 'right'
}

const DropdownMenu = ({ isOpen, onEdit, onDelete, align = 'right' }: DropdownMenuProps) => {
    if (!isOpen) return null

    return (
        <div className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20`}>
            {onEdit && (
                <button
                    onClick={onEdit}
                    className='w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors'
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M10.5 1.5L12.5 3.5L4.5 11.5H2.5V9.5L10.5 1.5Z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Edit
                </button>
            )}
            {onDelete && (
                <button
                    onClick={onDelete}
                    className='w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors'
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M2 4H12M5 4V2H9V4M3 4L4 12H10L11 4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Delete
                </button>
            )}
        </div>
    )
}

export default DropdownMenu
