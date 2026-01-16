'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import SecondaryButton from '@/components/ui/SecondaryButton'
import MainButton from '@/components/ui/MainButton'

const StoryDetail = () => {
    const params = useParams()
    const id = params.id

    const story = {
        title: "The Moon that Can't be Seen",
        author: "Rara",
        synopsis: "A compelling story about...",
        category: "Teen Fiction",
        tags: ["school", "fiction"],
        coverImage: "/images/default-cover.jpg",
        status: "Draft",
        chapters: [
            { id: 1, title: "Chapter 1: The Beginning", lastUpdated: "18 January 2024" },
            { id: 2, title: "Chapter 2: Discovery", lastUpdated: "20 January 2024" }
        ]
    }

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <div className="flex items-center gap-3">
                <p className="text-sm text-gray-400">Stories Management</p>
                <Image
                    src="/icons/next-icon.svg"
                    alt="Next"
                    width={20}
                    height={20}
                    className="opacity-40"
                />
                <p className="text-sm text-[#41A3B7]">Story Detail</p>
            </div>

            <h1 className="text-3xl font-bold text-gray-700">
                Story Detail
            </h1>

            <Link href="/stories">
                <div className="flex w-24 cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-200 py-2 hover:bg-gray-300">
                    <Image
                        src="/icons/arrow-icon.svg"
                        alt="Back"
                        width={20}
                        height={20}
                    />
                    <p className="pr-2 text-sm font-semibold text-gray-700">
                        Back
                    </p>
                </div>
            </Link>

            <div className="mt-6 flex w-full flex-col gap-6 rounded-xl bg-white p-6 shadow-sm">
                <div className="flex w-full gap-4">
                    <div className="flex-1">
                        <p className="font-bold text-gray-700 text-md mb-2">Title</p>
                        <p className="text-gray-600">{story.title}</p>
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-gray-700 text-md mb-2">Author</p>
                        <p className="text-gray-600">{story.author}</p>
                    </div>
                </div>

                <div>
                    <p className="font-bold text-gray-700 text-md mb-2">Synopsis</p>
                    <p className="text-gray-600">{story.synopsis}</p>
                </div>

                <div className="flex w-full gap-4">
                    <div className="flex-1">
                        <p className="font-bold text-gray-700 text-md mb-2">Category</p>
                        <p className="text-gray-600">{story.category}</p>
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-gray-700 text-md mb-2">Tags / Keywords</p>
                        <div className="flex gap-2">
                            {story.tags.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex w-full gap-4">
                    <div className="flex-1">
                        <p className="font-bold text-gray-700 text-md mb-2">Status</p>
                        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium ${
                            story.status === 'Draft' 
                                ? 'bg-yellow-100 text-yellow-700' 
                                : 'bg-green-100 text-green-700'
                        }`}>
                            {story.status}
                        </span>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <p className="font-bold text-gray-700 text-md">Chapters</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">No</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Title</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {story.chapters.map((chapter, index) => (
                                    <tr key={chapter.id} className="border-t border-gray-200">
                                        <td className="py-3 px-4 text-sm text-gray-700">{index + 1}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">{chapter.title}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">{chapter.lastUpdated}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                    <Link href="/stories">
                        <SecondaryButton label="Back" />
                    </Link>
                    <Link href={`/stories/${id}/edit`}>
                        <MainButton label="Edit Story" variant="orange" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default StoryDetail