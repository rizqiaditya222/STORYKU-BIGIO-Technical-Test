'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import MainButton from '@/components/ui/MainButton'
import SecondaryButton from '@/components/ui/SecondaryButton'
import FormField from '@/components/ui/FormField'
import Dropdown from '@/components/ui/Dropdown'
import ImagePicker from '@/components/ui/ImagePicker'
import ChapterTable from '@/components/story/ChapterTable'

const EditStory = () => {
    const params = useParams()
    const id = params.id

    const categoryOptions = [
        { value: 'romance', label: 'Romance' },
        { value: 'drama', label: 'Drama' },
        { value: 'fantasy', label: 'Fantasy' }
    ]

    const statusOptions = [
        { value: 'publish', label: 'Publish' },
        { value: 'draft', label: 'Draft' }
    ]

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
                <p className="text-sm text-[#41A3B7]">Edit Story</p>
            </div>

            <h1 className="text-3xl font-bold text-gray-700">
                Edit Story
            </h1>

            <Link href={`/stories/${id}`}>
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
                        className="flex-1"
                    />
                    <FormField 
                        label="Author"
                        placeholder="Author"
                        className="flex-1"
                    />
                </div>

                <FormField 
                    label="Synopsis"
                    type="textarea"
                    placeholder="Synopsis"
                    rows={8}
                />

                <div className="flex w-full gap-4">
                    <Dropdown 
                        label="Category"
                        placeholder="Category"
                        options={categoryOptions}
                        className="flex-1"
                    />
                    <FormField 
                        label="Tags / Keywords"
                        placeholder="e.g. romance, school, drama"
                        className="flex-1"
                    />
                </div>

                <div className="flex w-full gap-4">
                    <ImagePicker 
                        label="Cover Image"
                        className="flex-1"
                    />
                    <Dropdown 
                        label="Status"
                        placeholder="Status"
                        options={statusOptions}
                        className="flex-1"
                    />
                </div>

                <div className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <p className="font-bold text-gray-700 text-md">Chapter List</p>
                        <Link href={`/stories/${id}/edit/chapter`}>
                            <MainButton 
                                label="Add Chapter"
                                icon="/icons/add-icon.svg"
                                variant="orange"
                            />
                        </Link>
                    </div>
                </div>

                <ChapterTable
                    data={[
                        {
                            id: 1,
                            title: "The Moon that Can't be Seen",
                            lastUpdated: "18 January 2024",
                        },
                        {
                            id: 2,
                            title: "Silent Night",
                            lastUpdated: "20 January 2024",
                        },
                    ]}
                />

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                    <Link href={`/stories/${id}`}>
                        <SecondaryButton label="Cancel" />
                    </Link>
                    <MainButton 
                        label="Save"
                        variant="orange"
                    />
                </div>
            </div>
        </div>
    )
}

export default EditStory