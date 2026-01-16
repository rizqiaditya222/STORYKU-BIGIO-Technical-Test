import React from 'react'
import { useDropdown } from '@/hooks/useDropdown'
import DropdownMenu from '@/components/ui/DropdownMenu'

export interface Chapter {
    id: number | string
    title: string
    content?: string
    lastUpdated: string
}

interface ChapterTableProps {
    data: Chapter[]
    onEdit?: (chapter: Chapter) => void
    onDelete?: (chapter: Chapter) => void
}

const ChapterTable = ({ data, onEdit, onDelete }: ChapterTableProps) => {
    const { openDropdown, dropdownRef, toggleDropdown, closeDropdown } = useDropdown()

    const showActions = onEdit || onDelete

    return (
        <div className="w-full overflow-x-auto bg-white">
            <table className="w-full min-w-[600px]">
                <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>
                        <th className="font-bold py-3 px-3 md:px-4 text-left text-xs md:text-sm text-gray-700">
                            Title
                        </th>
                        <th className="font-bold py-3 px-3 md:px-4 text-left text-xs md:text-sm text-gray-700">
                            Last Updated
                        </th>
                        {showActions && <th className="px-3 md:px-4 py-3 w-12"></th>}
                    </tr>
                </thead>

                <tbody>
                    {data.map((chapter) => (
                        <tr
                            key={chapter.id}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                            <td className="py-3 px-3 md:px-4">
                                <p className="text-xs md:text-sm font-medium text-gray-700">
                                    {chapter.title}
                                </p>
                            </td>

                            <td className="py-3 px-3 md:px-4 text-xs md:text-sm text-gray-500">
                                {chapter.lastUpdated}
                            </td>

                            {showActions && (
                                <td className="px-3 md:px-4 py-3">
                                    <div className='relative' ref={openDropdown === chapter.id ? dropdownRef : null}>
                                        <button 
                                            onClick={() => toggleDropdown(chapter.id)}
                                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <circle cx="8" cy="3" r="1.5"/>
                                                <circle cx="8" cy="8" r="1.5"/>
                                                <circle cx="8" cy="13" r="1.5"/>
                                            </svg>
                                        </button>

                                        <DropdownMenu
                                            isOpen={openDropdown === chapter.id}
                                            onEdit={onEdit ? () => {
                                                onEdit(chapter)
                                                closeDropdown()
                                            } : undefined}
                                            onDelete={onDelete ? () => {
                                                onDelete(chapter)
                                                closeDropdown()
                                            } : undefined}
                                        />
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ChapterTable
