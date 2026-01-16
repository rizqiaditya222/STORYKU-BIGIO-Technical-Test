'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import MainButton from '@/components/ui/MainButton'
import SecondaryButton from '@/components/ui/SecondaryButton'
import FormField from '@/components/ui/FormField'
import QuillEditor from '@/components/ui/QuillEditor'

const AddChapter = () => {
    const [content, setContent] = useState('')

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
                <p className="text-sm text-gray-400">Add Stories</p>
                <Image
                    src="/icons/next-icon.svg"
                    alt="Next"
                    width={20}
                    height={20}
                    className="opacity-40"
                />
                <p className="text-sm text-[#41A3B7]">Add Chapter</p>
            </div>

            <h1 className="text-3xl font-bold text-gray-700">
                Add Chapter
            </h1>

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

            <div className="mt-6 flex w-full flex-col gap-6 rounded-xl bg-white p-6 shadow-sm">
                <div className="w-full">
                    <FormField
                        label="Title"
                        placeholder="Title"
                        className="flex-1"
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <p className="font-bold text-gray-700 text-md">Story</p>
                    <QuillEditor 
                        value={content}
                        onChange={setContent}
                        placeholder="Write your story here..."
                        className="bg-white"
                    />
                </div>

            </div>
                <div className='flex w-full justify-end gap-4 pt-4'>
                    <SecondaryButton label="Cancel" />
                    <MainButton 
                        label="Save"
                        variant="orange"
                    />
                </div>
        </div>
    )
}

export default AddChapter