'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import MainButton from '@/components/ui/MainButton'
import SecondaryButton from '@/components/ui/SecondaryButton'
import FormField from '@/components/ui/FormField'
import QuillEditor from '@/components/ui/QuillEditor'
import PageHeader from '@/components/layout/PageHeader'
import { useStory } from '@/hooks/useStory'
import { chapterService } from '@/services/ChapterService'

const EditChapter = () => {
    const params = useParams()
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = params.id as string
    const chapterId = searchParams.get('chapterId')
    
    const { story, loading } = useStory(id)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [saving, setSaving] = useState(false)
    
    const isEditMode = !!chapterId
    const pageTitle = isEditMode ? 'Edit Chapter' : 'Add Chapter'

    useEffect(() => {
        if (isEditMode && story?.chapters) {
            const chapter = story.chapters.find(ch => ch.id === chapterId)
            if (chapter) {
                setTitle(chapter.title)
                setContent(chapter.content)
            }
        }
    }, [isEditMode, chapterId, story])

    const handleSave = async () => {
        if (!title.trim()) {
            alert('Chapter title is required')
            return
        }

        try {
            setSaving(true)
            
            if (isEditMode && chapterId) {
                await chapterService.updateChapter(chapterId, {
                    storyId: id,
                    title: title.trim(),
                    content: content
                })
            } else {
                const chapterOrder = (story?.chapters?.length || 0) + 1
                await chapterService.createChapter({
                    storyId: id,
                    title: title.trim(),
                    content: content
                })
            }
            
            router.push(`/stories/${id}/edit`)
        } catch (error) {
            console.error('Error saving chapter:', error)
            alert('Failed to save chapter. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        )
    }

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <PageHeader
                breadcrumbs={[
                    { label: 'Stories Management', href: '/stories' },
                    { label: 'Edit Story', href: `/stories/${id}/edit` },
                    { label: pageTitle }
                ]}
                title={pageTitle}
                backLink={`/stories/${id}/edit`}
            />

            <div className="mt-6 flex w-full flex-col gap-6 rounded-xl bg-white p-6 shadow-sm">
                <div className="w-full">
                    <FormField
                        label="Title"
                        placeholder="Title"
                        value={title}
                        onChange={setTitle}
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

                <div className='flex w-full justify-end gap-4 pt-4 border-t border-gray-200'>
                    <Link href={`/stories/${id}/edit`}>
                        <SecondaryButton label="Cancel" />
                    </Link>
                    <MainButton 
                        label={saving ? "Saving..." : "Save"}
                        variant="orange"
                        onClick={handleSave}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditChapter