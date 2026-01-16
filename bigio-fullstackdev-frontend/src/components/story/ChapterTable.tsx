import React from 'react'
import { useDropdown } from '@/hooks/useDropdown'

interface Chapter {
    id: number | string
    title: string
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
            <table className="w-full">
                <thead className="border-b border-gray-200">
                    <tr>
                        <th className="font-bold py-4 text-left text-md text-gray-700">
                            Title
                        </th>
                        <th className="font-bold py-4 text-left text-md text-gray-700">
                            Last Updated
                        </th>
                        {showActions && <th className="px-4 py-4"></th>}
                    </tr>
                </thead>

                <tbody>
                    {data.map((chapter) => (
                        <tr
                            key={chapter.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                        >
                            <td className="py-4">
                                <p className="text-sm font-medium text-gray-700">
                                    {chapter.title}
                                </p>
                            </td>

                            <td className="py-4 text-sm text-gray-500">
                                {chapter.lastUpdated}
                            </td>

                            {showActions && (
                                <td className="px-4 py-4 text-right">
                                    <div className='relative' ref={openDropdown === chapter.id ? dropdownRef : null}>
                                        <button 
                                            onClick={() => toggleDropdown(chapter.id)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <span className="text-xl cursor-pointer">⋮</span>
                                        </button>

                                        {openDropdown === chapter.id && (
                                            <div className='absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10'>
                                                {onEdit && (
                                                    <button
                                                        onClick={() => {
                                                            onEdit(chapter)
                                                            closeDropdown()
                                                        }}
                                                        className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        onClick={() => {
                                                            onDelete(chapter)
                                                            closeDropdown()
                                                        }}
                                                        className='w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2'
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        )}
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
