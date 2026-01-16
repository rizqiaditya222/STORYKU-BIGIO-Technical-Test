import { useState, useEffect, useRef } from 'react'

export const useDropdown = () => {
    const [openDropdown, setOpenDropdown] = useState<number | string | null>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const toggleDropdown = (id: number | string) => {
        setOpenDropdown(openDropdown === id ? null : id)
    }

    const closeDropdown = () => {
        setOpenDropdown(null)
    }

    return {
        openDropdown,
        dropdownRef,
        toggleDropdown,
        closeDropdown
    }
}
