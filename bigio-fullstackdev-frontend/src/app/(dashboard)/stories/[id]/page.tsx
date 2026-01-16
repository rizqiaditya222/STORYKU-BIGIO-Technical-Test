'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import SecondaryButton from '@/components/ui/SecondaryButton'
import MainButton from '@/components/ui/MainButton'
import FormField from '@/components/ui/FormField'
import Dropdown from '@/components/ui/Dropdown'
import ChapterTable from '@/components/story/ChapterTable'
import { useStory } from '@/hooks/useStory'

const StoryDetail = () => {
    const params = useParams()
    const id = params.id as string
    const { story, loading, error } = useStory(id)

    if (loading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        )
    }

    if (!story) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <p className="text-gray-500">Story not found</p>
            </div>
        )
    }

    const categoryOptions = [
        { value: 'Financial', label: 'Financial' },
        { value: 'Technology', label: 'Technology' },
        { value: 'Health', label: 'Health' }
    ]

    const statusOptions = [
        { value: 'Publish', label: 'Publish' },
        { value: 'Draft', label: 'Draft' }
    ]

    const chaptersData = story.chapters?.map((chapter) => ({
        id: chapter.id,
        title: chapter.title,
        lastUpdated: new Date(chapter.updatedAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    })) || []

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <div className="flex items-center gap-3">
                <Link href="/stories">
                    <p className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer">Stories Management</p>
                </Link>
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
                    <FormField 
                        label="Title"
                        placeholder="Title"
                        value={story.title}
                        className="flex-1"
                        readOnly
                    />
                    <FormField 
                        label="Author"
                        placeholder="Author"
                        value={story.author}
                        className="flex-1"
                        readOnly
                    />
                </div>

                <FormField 
                    label="Synopsis"
                    type="textarea"
                    placeholder="Synopsis"
                    value={story.synopsis || ''}
                    rows={8}
                    readOnly
                />

                <div className="flex w-full gap-4">
                    <Dropdown 
                        label="Category"
                        placeholder="Category"
                        value={story.category}
                        options={categoryOptions}
                        className="flex-1"
                        disabled
                    />
                    <FormField 
                        label="Tags / Keywords"
                        placeholder="e.g. romance, school, drama"
                        value={story.tags?.join(', ') || ''}
                        className="flex-1"
                        readOnly
                    />
                </div>

                <div className="flex w-full gap-4">
                    <div className="flex-1">
                        <p className="font-bold text-gray-700 text-md mb-2">Cover Image</p>
                        {story.coverImage ? (
                            <div className="mt-2 flex h-12 w-full overflow-hidden rounded-md border border-gray-300">
                                <div className="flex flex-1 items-center px-4 text-sm text-gray-600">
                                    {story.coverImage.split('/').pop()}
                                </div>
                                <div className="flex w-12 items-center justify-center bg-gray-200">
                                    <Image
                                        src="/icons/document-icon.svg"
                                        alt="Document"
                                        width={20}
                                        height={20}
                                        className="opacity-60"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="mt-2 flex h-12 w-full items-center overflow-hidden rounded-md border border-gray-300 px-4 text-sm text-gray-400">
                                No cover image
                            </div>
                        )}
                    </div>
                    <Dropdown 
                        label="Status"
                        placeholder="Status"
                        value={story.status}
                        options={statusOptions}
                        className="flex-1"
                        disabled
                    />
                </div>

                <div className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <p className="font-bold text-gray-700 text-md">Chapter List</p>
                    </div>

                    <ChapterTable data={chaptersData} />
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