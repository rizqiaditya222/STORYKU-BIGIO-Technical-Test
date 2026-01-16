import api from '@/utils/api';
import { ChapterFormData } from '@/types/Chapter';

export const chapterService = {
  async createChapter(data: ChapterFormData) {
    const response = await api.post('/chapters', data);
    return response.data;
  },

  async updateChapter(id: string, data: Partial<ChapterFormData>) {
    const response = await api.put(`/chapters/${id}`, data);
    return response.data;
  },

  async deleteChapter(id: string) {
    const response = await api.delete(`/chapters/${id}`);
    return response.data;
  },
};