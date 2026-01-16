import { useState, useEffect } from 'react'
import { storyService } from '@/services/StoryService'
import { Story } from '@/types/Story'

interface UseStoriesParams {
    search?: string
    category?: string
    status?: string
    page?: number
    limit?: number
}

export const useStories = (params: UseStoriesParams = {}) => {
    const [stories, setStories] = useState<Story[]>([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
    })

    const fetchStories = async () => {
        try {
            setLoading(true)
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
    }, [params.search, params.category, params.status, params.page, params.limit])

    return {
        stories,
        loading,
        pagination,
        refetch: fetchStories
    }
}
