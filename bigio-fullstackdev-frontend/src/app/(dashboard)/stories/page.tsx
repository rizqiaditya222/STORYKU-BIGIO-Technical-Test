'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import StoryTable from '@/components/story/StoryTable'
import MainButton from '@/components/ui/MainButton'
import FilterModal from '@/components/ui/FilterModal'
import SecondaryButton from '@/components/ui/SecondaryButton'

const Stories = () => {
    const router = useRouter()
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const storiesData = [
        {
            no: 1,
            title: "The Moon that Can't be Seen",
            writers: "Rara",
            category: "Teen Fiction",
            keywords: ["school", "fiction"],
            status: "Draft" as const
        },
        {
            no: 2,
            title: "Given",
            writers: "Sansa S.",
            category: "Romance",
            keywords: ["music"],
            status: "Draft" as const
        },
        {
            no: 3,
            title: "Fish Swimming In The Sky",
            writers: "Kaenarista Faly",
            category: "Fantasy",
            keywords: ["fantasy", "romance"],
            status: "Publish" as const
        },
        {
            no: 4,
            title: "The Science of Fertility PCOS",
            writers: "Jessie Inchauspe",
            category: "Non Fiction",
            keywords: ["science", "PCOS"],
            status: "Publish" as const
        },
        {
            no: 5,
            title: "The Glucose Goddess Method",
            writers: "Jessie Inchauspe",
            category: "Non Fiction",
            keywords: ["glucose", "science"],
            status: "Publish" as const
        }
    ]

    return (
        <div className='h-full w-full flex flex-col gap-2'>
            <h1 className='text-gray-700 text-3xl font-bold'>Stories</h1>

            <div className='flex flex-col gap-6 p-6 bg-white rounded-xl w-full shadow-sm'>
                <div className='w-full flex items-center justify-between'>
                    <div className='bg-gray-200 rounded-lg px-4 py-2 w-64 flex items-center gap-2'>
                        <Image src="/icons/search-icon.svg" alt="Search" width={16} height={16} className="opacity-60" />
                        <input
                            type="text"
                            placeholder="Search by Writers / Title"
                            className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 flex-1"
                        />
                    </div>

                    <div className='flex items-center gap-4'>
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className='w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer'
                        >
                            <Image src="/icons/filter-icon.svg" alt="Filter" width={20} height={20} />
                        </button>

                        <div className='w-[1px] h-12 bg-gray-300' />

                        <Link href="/stories/add">
                            <MainButton
                                label="Add Story"
                                icon="/icons/add-icon.svg"
                                variant="orange"
                            />
                        </Link>
                    </div>
                </div>

                <StoryTable
                    data={storiesData}
                    onEdit={(story) => router.push(`/stories/${story.no}/edit`)}
                    onDelete={(story) => console.log('Delete:', story)}
                    onRowClick={(story) => router.push(`/stories/${story.no}`)}
                />

                <div className='flex items-center justify-between'>
                    <p className='text-gray-700'>
                        Menampilkan 5 dari 5 data
                    </p>

                    <div className='flex gap-2'>
                        <div className='flex items-center justify-center w-8 h-8 rounded-sm bg-storyku-orange opacity-60 cursor-pointer'>
                            <Image className='brightness-0 invert' src="/icons/arrow-icon.svg" alt="Filter" width={20} height={20} />
                        </div>

                        <div className='flex items-center justify-center w-8 h-8 rounded-sm bg-storyku-orange cursor-pointer'>
                            <p className='text-white text-center'>1</p>
                        </div>

                        <div className='flex items-center justify-center w-8 h-8 rounded-sm bg-storyku-orange opacity-60 cursor-pointer'>
                            <Image className='brightness-0 invert scale-x-[-1]' src="/icons/arrow-icon.svg" alt="Filter" width={20} height={20} />
                        </div>

                        <FilterModal
                            isOpen={isFilterOpen}
                            onClose={() => setIsFilterOpen(false)}
                            onFilter={(filters) => {
                                console.log('Filter applied:', filters)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stories
