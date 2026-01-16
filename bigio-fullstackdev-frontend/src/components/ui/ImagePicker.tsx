'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface ImagePickerProps {
  label: string
  onImageChange?: (file: File | null) => void
  className?: string
  value?: File | null
}

const ImagePicker = ({ label, onImageChange, className = '', value }: ImagePickerProps) => {
  const [coverImage, setCoverImage] = useState<File | null>(value || null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (value) {
      setCoverImage(value)
      setPreviewUrl(URL.createObjectURL(value))
    }
  }, [value])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed')
      return
    }

    setCoverImage(file)
    setPreviewUrl(URL.createObjectURL(file))
    onImageChange?.(file)
  }

  const handleRemoveImage = () => {
    setCoverImage(null)
    setPreviewUrl(null)
    setShowPreview(false)
    onImageChange?.(null)
  }

  return (
    <>
      <div className={`flex flex-col ${className}`}>
        <p className="font-bold text-gray-700 text-md">{label}</p>

        <div className="mt-2 flex h-12 w-full overflow-hidden rounded-md border border-gray-300">
          <label
            htmlFor="cover-image"
            className="flex flex-1 cursor-pointer items-center px-4 text-sm text-gray-400"
          >
            {coverImage ? coverImage.name : 'Upload cover image'}
          </label>

          <div
            onClick={() => coverImage && setShowPreview(true)}
            className={`flex w-12 items-center justify-center ${
              coverImage
                ? 'bg-storyku-orange cursor-pointer'
                : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            <Image
              src="/icons/document-icon.svg"
              alt="Document"
              width={20}
              height={20}
              className="brightness-0 invert"
            />
          </div>

          <input
            id="cover-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      {showPreview && previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative max-w-lg rounded-lg bg-white p-4 shadow-lg">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute right-3 top-3 text-xl font-bold text-gray-400 hover:text-red-500"
            >
              ✕
            </button>

            <img
              src={previewUrl}
              alt="Cover Preview"
              className="max-h-[70vh] rounded object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ImagePicker
