'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import MainButton from '@/components/ui/MainButton'
import FormField from '@/components/ui/FormField'
import Dropdown from '@/components/ui/Dropdown'
import ImagePicker from '@/components/ui/ImagePicker'
import SecondaryButton from '@/components/ui/SecondaryButton'
import ConfirmationModal from '@/components/ui/ConfirmationModal'
import ChapterTable from '@/components/story/ChapterTable'
import { storyService } from '@/services/StoryService'

const AddStory = () => {
    const router = useRouter()
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isDeleteChapterModalOpen, setIsDeleteChapterModalOpen] = useState(false)
    const [selectedChapter, setSelectedChapter] = useState<{id: number, title: string, content: string, lastUpdated: string} | null>(null)
    const [loading, setLoading] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [chapters, setChapters] = useState<Array<{id: number, title: string, content: string, lastUpdated: string}>>([])
    
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        synopsis: '',
        category: '',
        tags: '',
        status: 'Draft',
        coverImage: null as File | null
    })

    const handleDeleteChapter = () => {
        if (!selectedChapter) return
        
        const updatedChapters = chapters.filter(ch => ch.id !== selectedChapter.id)
        setChapters(updatedChapters)
        localStorage.setItem('tempChapters', JSON.stringify(updatedChapters))
        setIsDeleteChapterModalOpen(false)
        setSelectedChapter(null)
    }

    const handleEditChapter = (chapter: {id: number, title: string, content: string, lastUpdated: string}) => {
        // Save current form data
        localStorage.setItem('tempStoryForm', JSON.stringify({
            title: formData.title,
            author: formData.author,
            synopsis: formData.synopsis,
            category: formData.category,
            tags: formData.tags,
            status: formData.status
        }))
        
        // Save cover image
        if (formData.coverImage) {
            const reader = new FileReader()
            reader.onloadend = () => {
                localStorage.setItem('tempCoverImage', reader.result as string)
                localStorage.setItem('tempCoverImageName', formData.coverImage!.name)
                // Navigate with chapter id to edit
                localStorage.setItem('editingChapterId', chapter.id.toString())
                router.push('/stories/add/chapter')
            }
            reader.readAsDataURL(formData.coverImage)
        } else {
            localStorage.setItem('editingChapterId', chapter.id.toString())
            router.push('/stories/add/chapter')
        }
    }

    React.useEffect(() => {
        setMounted(true)
        
        const savedChapters = localStorage.getItem('tempChapters')
        if (savedChapters) {
            setChapters(JSON.parse(savedChapters))
        }

        const savedFormData = localStorage.getItem('tempStoryForm')
        if (savedFormData) {
            const parsedData = JSON.parse(savedFormData)
            setFormData(prev => ({
                ...prev,
                title: parsedData.title || '',
                author: parsedData.author || '',
                synopsis: parsedData.synopsis || '',
                category: parsedData.category || '',
                tags: parsedData.tags || '',
                status: parsedData.status || 'Draft'
            }))
        }

        // Restore cover image from localStorage
        const savedCoverImage = localStorage.getItem('tempCoverImage')
        if (savedCoverImage) {
            // Convert base64 back to File
            fetch(savedCoverImage)
                .then(res => res.blob())
                .then(blob => {
                    const fileName = localStorage.getItem('tempCoverImageName') || 'cover.jpg'
                    const file = new File([blob], fileName, { type: blob.type })
                    setFormData(prev => ({ ...prev, coverImage: file }))
                })
        }
    }, [])

    if (!mounted) return null

    const categoryOptions = [
        { value: 'Financial', label: 'Financial' },
        { value: 'Technology', label: 'Technology' },
        { value: 'Health', label: 'Health' }
    ]

    const statusOptions = [
        { value: 'Publish', label: 'Publish' },
        { value: 'Draft', label: 'Draft' }
    ]

    const handleSubmit = async () => {
        try {
            setLoading(true)
            
            const tagsArray = formData.tags
                ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
                : []

            const chaptersData = chapters.map((chapter, index) => ({
                title: chapter.title,
                content: chapter.content,
                chapterOrder: index + 1
            }))

            const submitData = {
                title: formData.title,
                author: formData.author,
                synopsis: formData.synopsis,
                category: formData.category,
                status: formData.status,
                tags: tagsArray,
                chapters: chaptersData,
                coverImage: formData.coverImage || undefined
            }

            const response = await storyService.createStory(submitData)
            
            localStorage.removeItem('tempChapters')
            localStorage.removeItem('tempStoryForm')
            localStorage.removeItem('tempCoverImage')
            localStorage.removeItem('tempCoverImageName')
            router.push('/stories')
        } catch (error) {
            console.error('Error creating story:', error)
            alert('Failed to create story. Please try again.')
        } finally {
            setLoading(false)
        }
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
                <p className="text-sm text-[#41A3B7]">Add Stories</p>
            </div>

            <h1 className="text-3xl font-bold text-gray-700">Add Stories</h1>

            <Link href="/stories">
                <div className="flex w-24 cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-200 py-2 hover:bg-gray-300">
                    <Image src="/icons/arrow-icon.svg" alt="Back" width={20} height={20} />
                    <p className="pr-2 text-sm font-semibold text-gray-700">Back</p>
                </div>
            </Link>

            <div className="mt-6 flex w-full flex-col gap-6 rounded-xl bg-white p-6 shadow-sm">
                <div className="flex w-full gap-4">
                    <FormField 
                        label="Title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                        className="flex-1"
                    />
                    <FormField 
                        label="Author"
                        placeholder="Author"
                        value={formData.author}
                        onChange={(value) => setFormData(prev => ({ ...prev, author: value }))}
                        className="flex-1"
                    />
                </div>

                <FormField 
                    label="Synopsis"
                    type="textarea"
                    placeholder="Synopsis"
                    value={formData.synopsis}
                    onChange={(value) => setFormData(prev => ({ ...prev, synopsis: value }))}
                    rows={8}
                />

                <div className="flex w-full gap-4">
                    <Dropdown 
                        label="Category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                        options={categoryOptions}
                        className="flex-1"
                    />
                    <FormField 
                        label="Tags / Keywords"
                        placeholder="e.g. romance, school, drama"
                        value={formData.tags}
                        onChange={(value) => setFormData(prev => ({ ...prev, tags: value }))}
                        className="flex-1"
                    />
                </div>

                <div className="flex w-full gap-4">
                    <ImagePicker 
                        label="Cover Image"
                        value={formData.coverImage}
                        onImageChange={(file) => setFormData(prev => ({ ...prev, coverImage: file }))}
                        className="flex-1"
                    />
                    <Dropdown 
                        label="Status"
                        placeholder="Status"
                        value={formData.status}
                        onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                        options={statusOptions}
                        className="flex-1"
                    />
                </div>

                <div className='flex w-full justify-end'>
                    <MainButton 
                        className='w-38 flex justify-center' 
                        icon='/icons/add-icon.svg' 
                        variant="orange" 
                        label="Add Chapter"
                        onClick={() => {
                            localStorage.setItem('tempStoryForm', JSON.stringify({
                                title: formData.title,
                                author: formData.author,
                                synopsis: formData.synopsis,
                                category: formData.category,
                                tags: formData.tags,
                                status: formData.status
                            }))
                            
                            // Save cover image to localStorage as base64
                            if (formData.coverImage) {
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                    localStorage.setItem('tempCoverImage', reader.result as string)
                                    localStorage.setItem('tempCoverImageName', formData.coverImage!.name)
                                    router.push('/stories/add/chapter')
                                }
                                reader.readAsDataURL(formData.coverImage)
                            } else {
                                router.push('/stories/add/chapter')
                            }
                        }}
                    />
                </div>

                <ChapterTable
                    data={chapters}
                    onEdit={handleEditChapter}
                    onDelete={(chapter) => {
                        const selectedChapterData = chapters.find(ch => ch.id === chapter.id)
                        if (selectedChapterData) {
                            setSelectedChapter(selectedChapterData)
                            setIsDeleteChapterModalOpen(true)
                        }
                    }}
                />
            </div>
            
            <div className='flex w-full justify-end gap-4 pt-4 border-gray-200'>
                <SecondaryButton 
                    label="Cancel" 
                    onClick={() => setIsConfirmModalOpen(true)}
                />
                <MainButton 
                    label={loading ? "Saving..." : "Save"}
                    variant="orange"
                    onClick={handleSubmit}
                />
            </div>

            <ConfirmationModal 
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={() => router.push('/stories')}
                title="Cancel Adding Story"
                message="Are you sure you want to cancel adding the story without saving the data?"
                confirmText="Yes, Cancel"
                cancelText="No, Continue"
            />

            <ConfirmationModal 
                isOpen={isDeleteChapterModalOpen}
                onClose={() => setIsDeleteChapterModalOpen(false)}
                onConfirm={handleDeleteChapter}
                title="Delete Chapter"
                message={`Are you sure you want to delete "${selectedChapter?.title}"?`}
                confirmText="Yes, Delete"
                cancelText="Cancel"
            />
        </div>
    )
}

export default AddStory