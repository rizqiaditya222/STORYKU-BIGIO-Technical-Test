import React from 'react'
import MainButton from './MainButton'
import SecondaryButton from './SecondaryButton'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  confirmVariant?: 'orange' | 'blue'
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmation',
  message,
  confirmText = 'Yes',
  cancelText = 'No',
  confirmVariant = 'orange'
}: ConfirmationModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-700">
          {title}
        </h2>
        
        <p className="mb-6 text-gray-600">
          {message}
        </p>
        
        <div className="flex justify-end gap-3">
          <SecondaryButton 
            label={cancelText}
            onClick={onClose}
          />
          <MainButton 
            label={confirmText}
            variant={confirmVariant}
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
