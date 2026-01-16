'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import MainButton from '@/components/ui/MainButton'
import SecondaryButton from '@/components/ui/SecondaryButton'
import FormField from '@/components/ui/FormField'
import QuillEditor from '@/components/ui/QuillEditor'

const EditChapter = () => {
    const params = useParams()
    const id = params.id
    const [content, setContent] = useState('')

    return (
        <div className="flex h-full w-full flex-col gap-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-3">
                <p className="text-sm text-gray-400">Stories Management</p>
                <Image
                    src="/icons/next-icon.svg"
                    alt="Next"
                    width={20}
                    height={20}
                    className="opacity-40"
                />
                <p className="text-sm text-gray-400">Edit Story</p>
                <Image
                    src="/icons/next-icon.svg"
                    alt="Next"
                    width={20}
                    height={20}
                    className="opacity-40"
                />
                <p className="text-sm text-[#41A3B7]">Add Chapter</p>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-700">
                Add Chapter
            </h1>

            {/* Back Button */}
            <Link href={`/stories/${id}/edit`}>
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

            {/* Form */}
            <div className="mt-6 flex w-full flex-col gap-6 rounded-xl bg-white p-6 shadow-sm">
                {/* Title */}
                <div className="w-full">
                    <FormField
                        label="Title"
                        placeholder="Title"
                        className="flex-1"
                    />
                </div>

                {/* Chapter content */}
                <div className='flex flex-col gap-2'>
                    <p className="font-bold text-gray-700 text-md">Story</p>
                    <QuillEditor 
                        value={content}
                        onChange={setContent}
                        placeholder="Write your story here..."
                        className="bg-white"
                    />
                </div>

                {/* Action Buttons */}
                <div className='flex w-full justify-end gap-4 pt-4 border-t border-gray-200'>
                    <Link href={`/stories/${id}/edit`}>
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

export default EditChapter