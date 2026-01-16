'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import StoryTable from '@/components/story/StoryTable'
import MainButton from '@/components/ui/MainButton'
import FilterModal from '@/components/ui/FilterModal'
import ConfirmationModal from '@/components/ui/ConfirmationModal'
import { storyService } from '@/services/StoryService'
import { Story } from '@/types/Story'

const Stories = () => {
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedStory, setSelectedStory] = useState<Story | null>(null)
    const [stories, setStories] = useState<Story[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({
        category: '',
        status: '',
        page: 1,
        limit: 10
    })
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    const fetchStories = async () => {
        try {
            setLoading(true)
            const params = {
                search: searchQuery,
                category: filters.category,
                status: filters.status,
                page: filters.page,
                limit: filters.limit
            }
            
            const response = await storyService.getStories(params)
            
            setStories(response.data)
            setPagination(response.pagination)
        } catch (error) {
            console.error('Error fetching stories:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStories()
    }, [searchQuery, filters])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        setFilters(prev => ({ ...prev, page: 1 }))
    }

    const handleFilter = (filterData: { category: string; status: string }) => {
        setFilters(prev => ({
            ...prev,
            category: filterData.category,
            status: filterData.status,
            page: 1
        }))
    }

    const handleDelete = async () => {
        if (!selectedStory) return

        try {
            await storyService.deleteStory(selectedStory.id)
            setIsDeleteModalOpen(false)
            setSelectedStory(null)
            fetchStories()
        } catch (error) {
            console.error('Error deleting story:', error)
        }
    }

    const tableData = stories.map((story, index) => ({
        no: ((pagination?.page || 1) - 1) * (pagination?.limit || 10) + index + 1,
        id: story.id,
        title: story.title,
        writers: story.author,
        category: story.category,
        keywords: story.tags || [],
        status: story.status as 'Draft' | 'Publish'
    }))

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
                            value={searchQuery}
                            onChange={handleSearch}
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

                {loading ? (
                    <div className="text-center py-8">Loading...</div>
                ) : (
                    <StoryTable
                        data={tableData}
                        onEdit={(story) => router.push(`/stories/${story.id}/edit`)}
                        onDelete={(story) => {
                            const selected = stories.find(s => s.id === story.id)
                            setSelectedStory(selected || null)
                            setIsDeleteModalOpen(true)
                        }}
                        onRowClick={(story) => router.push(`/stories/${story.id}`)}
                    />
                )}

                <div className='flex items-center justify-between'>
                    <p className='text-gray-700'>
                        Menampilkan {stories.length} dari {pagination?.total || 0} data
                    </p>

                    <div className='flex gap-2'>
                        <button
                            disabled={(pagination?.page || 1) === 1}
                            onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                            className={`flex items-center justify-center w-8 h-8 rounded-sm ${
                                (pagination?.page || 1) === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-storyku-orange cursor-pointer'
                            }`}
                        >
                            <Image className='brightness-0 invert' src="/icons/arrow-icon.svg" alt="Previous" width={20} height={20} />
                        </button>

                        <div className='flex items-center justify-center w-8 h-8 rounded-sm bg-storyku-orange'>
                            <p className='text-white text-center'>{pagination?.page || 1}</p>
                        </div>

                        <button
                            disabled={(pagination?.page || 1) === (pagination?.totalPages || 1)}
                            onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                            className={`flex items-center justify-center w-8 h-8 rounded-sm ${
                                (pagination?.page || 1) === (pagination?.totalPages || 1) ? 'bg-gray-300 cursor-not-allowed' : 'bg-storyku-orange cursor-pointer'
                            }`}
                        >
                            <Image className='brightness-0 invert scale-x-[-1]' src="/icons/arrow-icon.svg" alt="Next" width={20} height={20} />
                        </button>
                    </div>
                </div>

                <FilterModal
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    onFilter={handleFilter}
                />

                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDelete}
                    title="Delete Story"
                    message={`Are you sure you want to delete "${selectedStory?.title}"?`}
                    confirmText="Yes, Delete"
                    cancelText="Cancel"
                />
            </div>
        </div>
    )
}

export default Stories