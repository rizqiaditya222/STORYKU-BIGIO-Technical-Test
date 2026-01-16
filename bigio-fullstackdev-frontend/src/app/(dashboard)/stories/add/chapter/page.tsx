'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import MainButton from '@/components/ui/MainButton'
import SecondaryButton from '@/components/ui/SecondaryButton'
import FormField from '@/components/ui/FormField'
import QuillEditor from '@/components/ui/QuillEditor'

const AddChapter = () => {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isEditMode, setIsEditMode] = useState(false)

    useEffect(() => {
        const editingChapterId = localStorage.getItem('editingChapterId')
        if (editingChapterId) {
            setEditingId(editingChapterId)
            setIsEditMode(true)
            
            const existingChapters = localStorage.getItem('tempChapters')
            if (existingChapters) {
                const chapters = JSON.parse(existingChapters)
                const chapterToEdit = chapters.find((ch: any) => ch.id.toString() === editingChapterId)
                if (chapterToEdit) {
                    setTitle(chapterToEdit.title)
                    setContent(chapterToEdit.content || '')
                }
            }
            
            localStorage.removeItem('editingChapterId')
        }
    }, [])

    const handleSave = () => {
        if (!title.trim()) {
            alert('Chapter title is required')
            return
        }

        const existingChapters = localStorage.getItem('tempChapters')
        const chapters = existingChapters ? JSON.parse(existingChapters) : []
        
        if (isEditMode && editingId) {
            const updatedChapters = chapters.map((ch: any) => {
                if (ch.id.toString() === editingId) {
                    return {
                        ...ch,
                        title: title.trim(),
                        content: content,
                        lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
                    }
                }
                return ch
            })
            localStorage.setItem('tempChapters', JSON.stringify(updatedChapters))
        } else {
            const newChapter = {
                id: Date.now(),
                title: title.trim(),
                content: content,
                lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
            }
            chapters.push(newChapter)
            localStorage.setItem('tempChapters', JSON.stringify(chapters))
        }
        
        router.push('/stories/add')
    }

    const handleCancel = () => {
        router.push('/stories/add')
    }

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
                <Link href="/stories/add">
                    <p className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer">Add Stories</p>
                </Link>
                <Image
                    src="/icons/next-icon.svg"
                    alt="Next"
                    width={20}
                    height={20}
                    className="opacity-40"
                />
                <p className="text-sm text-[#41A3B7]">{isEditMode ? 'Edit Chapter' : 'Add Chapter'}</p>
            </div>

            <h1 className="text-3xl font-bold text-gray-700">
                {isEditMode ? 'Edit Chapter' : 'Add Chapter'}
            </h1>

            <Link href="/stories/add">
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

            </div>
                <div className='flex w-full justify-end gap-4 pt-4'>
                    <SecondaryButton 
                        label="Cancel" 
                        onClick={handleCancel}
                    />
                    <MainButton 
                        label="Save"
                        variant="orange"
                        onClick={handleSave}
                    />
                </div>
        </div>
    )
}

export default AddChapter