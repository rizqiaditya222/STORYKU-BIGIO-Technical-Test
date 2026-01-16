export interface Chapter {
  id: string;
  storyId: string;
  title: string;
  content: string;
  chapterOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChapterFormData {
  storyId: string;
  title: string;
  content: string;
}