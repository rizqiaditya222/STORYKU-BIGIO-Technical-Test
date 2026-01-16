import { useState, useEffect } from 'react'
import { storyService } from '@/services/StoryService'
import { Story } from '@/types/Story'

export const useStory = (id: string) => {
    const [story, setStory] = useState<Story | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchStory = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await storyService.getStoryById(id)
            setStory(response.data)
        } catch (err) {
            console.error('Error fetching story:', err)
            setError('Failed to fetch story')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchStory()
        }
    }, [id])

    return {
        story,
        loading,
        error,
        refetch: fetchStory
    }
}
