import api from '@/utils/api';
import { Story, StoryFormData } from '@/types/Story';

export const storyService = {
    async getStories(params?: {
        search?: String;
        category?: String;
        status?: String;
        page?: number;
        limit?: number;
    }) {
        const response = await api.get('/stories', { params });
        return response.data;
    },

    async getStoryById(id: string) {
        const response = await api.get(`/stories/${id}`);
        return response.data
    },

    async createStory(data: StoryFormData) {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('author', data.author);
        if (data.synopsis) formData.append('synopsis', data.synopsis);
        formData.append('category', data.category);
        formData.append('status', data.status);

        if (data.tags && data.tags.length > 0) {
            formData.append('tags', JSON.stringify(data.tags));
        }

        if (data.chapters && data.chapters.length > 0) {
            const chaptersData = data.chapters.map((chapter) => ({
                title: chapter.title,
                content: chapter.content
            }));
            formData.append('chapters', JSON.stringify(chaptersData));
        }

        if (data.coverImage) {
            formData.append('coverImage', data.coverImage);
        }

        const response = await api.post('/stories', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    async updateStory(id: string, data: StoryFormData) {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('author', data.author);
        if (data.synopsis) formData.append('synopsis', data.synopsis);
        formData.append('category', data.category);
        formData.append('status', data.status);

        if (data.tags && data.tags.length > 0) {
            formData.append('tags', JSON.stringify(data.tags));
        }

        if (data.coverImage) {
            formData.append('coverImage', data.coverImage);
        }

        const response = await api.put(`/stories/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    async deleteStory(id: string) {
        const response = await api.delete(`/stories/${id}`);
        return response.data;
    },

}