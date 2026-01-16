'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import MainButton from '@/components/ui/MainButton'
import FormField from '@/components/ui/FormField'
import Dropdown from '@/components/ui/Dropdown'
import ImagePicker from '@/components/ui/ImagePicker'
import SecondaryButton from '@/components/ui/SecondaryButton'
import ConfirmationModal from '@/components/ui/ConfirmationModal'
import ChapterTable, { Chapter as ChapterRow } from '@/components/story/ChapterTable'
import TagsInput from '@/components/story/TagsInput'
import PageHeader from '@/components/layout/PageHeader'
import { storyService } from '@/services/StoryService'

const AddStory = () => {
    const router = useRouter()
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isDeleteChapterModalOpen, setIsDeleteChapterModalOpen] = useState(false)
    const [selectedChapter, setSelectedChapter] = useState<ChapterRow | null>(null)
    const [loading, setLoading] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [chapters, setChapters] = useState<ChapterRow[]>([])
    
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        synopsis: '',
        category: 'Financial',
        tags: [] as string[],
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

    const handleEditChapter = (chapter: ChapterRow) => {
        localStorage.setItem('tempStoryForm', JSON.stringify({
            title: formData.title,
            author: formData.author,
            synopsis: formData.synopsis,
            category: formData.category,
            tags: formData.tags,
            status: formData.status
        }))
        
        if (formData.coverImage) {
            const reader = new FileReader()
            reader.onloadend = () => {
                localStorage.setItem('tempCoverImage', reader.result as string)
                localStorage.setItem('tempCoverImageName', formData.coverImage!.name)
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
                category: parsedData.category || 'Financial',
                tags: parsedData.tags || '',
                status: parsedData.status || 'Draft'
            }))
        }

        const savedCoverImage = localStorage.getItem('tempCoverImage')
        if (savedCoverImage) {
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

            const chaptersData = chapters.map((chapter, index) => ({
                title: chapter.title,
                content: chapter.content ?? '',
                chapterOrder: index + 1
            }))

            const submitData = {
                title: formData.title,
                author: formData.author,
                synopsis: formData.synopsis,
                category: formData.category,
                status: formData.status,
                tags: formData.tags,
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
        <div className="flex h-full w-full flex-col gap-4 pb-12">
            <PageHeader
                breadcrumbs={[
                    { label: 'Stories Management', href: '/stories' },
                    { label: 'Add Stories' }
                ]}
                title="Add Stories"
                backLink="/stories"
            />

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
                        hideEmptyOption
                    />
                    <TagsInput 
                        label="Tags / Keywords"
                        placeholder="Type to add tags..."
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
                        hideEmptyOption
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
            
            <div className='flex w-full justify-end gap-4 pt-4 border-gray-200 py-12'>
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