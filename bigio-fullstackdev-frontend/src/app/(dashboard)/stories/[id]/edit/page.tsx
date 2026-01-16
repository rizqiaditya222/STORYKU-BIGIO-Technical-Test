'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import MainButton from '@/components/ui/MainButton'
import SecondaryButton from '@/components/ui/SecondaryButton'
import FormField from '@/components/ui/FormField'
import Dropdown from '@/components/ui/Dropdown'
import ImagePicker from '@/components/ui/ImagePicker'
import ChapterTable from '@/components/story/ChapterTable'
import TagsInput from '@/components/story/TagsInput'
import ConfirmationModal from '@/components/ui/ConfirmationModal'
import { storyService } from '@/services/StoryService'
import { chapterService } from '@/services/ChapterService'
import { useStory } from '@/hooks/useStory'

const EditStory = () => {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string
    const { story, loading, refetch } = useStory(id)
    const [saving, setSaving] = useState(false)
    const [isDeleteChapterModalOpen, setIsDeleteChapterModalOpen] = useState(false)
    const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null)
    
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        synopsis: '',
        category: '',
        tags: [] as string[],
        status: 'Draft',
        coverImage: null as File | null
    })

    useEffect(() => {
        if (story) {
            setFormData({
                title: story.title,
                author: story.author,
                synopsis: story.synopsis || '',
                category: story.category,
                tags: Array.isArray(story.tags) ? story.tags : [],
                status: story.status,
                coverImage: null
            })
        }
    }, [story])

    const handleSave = async () => {
        try {
            setSaving(true)

            const submitData = {
                title: formData.title,
                author: formData.author,
                synopsis: formData.synopsis,
                category: formData.category,
                status: formData.status,
                tags: formData.tags,
                coverImage: formData.coverImage || undefined
            }

            await storyService.updateStory(id, submitData)
            router.push(`/stories/${id}`)
        } catch (error) {
            console.error('Error updating story:', error)
            alert('Failed to update story. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    const handleDeleteChapter = async () => {
        if (!selectedChapterId) return

        try {
            await chapterService.deleteChapter(selectedChapterId)
            
            await refetch()
            
            setIsDeleteChapterModalOpen(false)
            setSelectedChapterId(null)
        } catch (error) {
            console.error('Error deleting chapter:', error)
            alert('Failed to delete chapter. Please try again.')
        }
    }

    const handleEditChapter = (chapter: any) => {
        router.push(`/stories/${id}/edit/chapter?chapterId=${chapter.id}`)
    }

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

                    <ChapterTable
                        data={chaptersData}
                        onEdit={handleEditChapter}
                        onDelete={(chapter) => {
                            setSelectedChapterId(chapter.id.toString())
                            setIsDeleteChapterModalOpen(true)
                        }}
                    />
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                    <Link href={`/stories/${id}`}>
                        <SecondaryButton label="Cancel" />
                    </Link>
                    <MainButton 
                        label={saving ? "Saving..." : "Save"}
                        variant="orange"
                        onClick={handleSave}
                    />
                </div>
            </div>

            <ConfirmationModal 
                isOpen={isDeleteChapterModalOpen}
                onClose={() => setIsDeleteChapterModalOpen(false)}
                onConfirm={handleDeleteChapter}
                title="Delete Chapter"
                message="Are you sure you want to delete this chapter?"
                confirmText="Yes, Delete"
                cancelText="Cancel"
            />
        </div>
    )
}

export default EditStory