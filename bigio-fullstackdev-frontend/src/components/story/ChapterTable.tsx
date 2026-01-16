import React from 'react'

interface Chapter {
    id: number
    title: string
    lastUpdated: string
}

interface ChapterTableProps {
    data: Chapter[]
}

const ChapterTable = ({ data }: ChapterTableProps) => {
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
                        <th className="px-4 py-4"></th>
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

                            <td className="px-4 py-4 text-right">
                                <button className="text-gray-400 hover:text-gray-600">
                                    <span className="text-xl cursor-pointer">⋮</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ChapterTable
