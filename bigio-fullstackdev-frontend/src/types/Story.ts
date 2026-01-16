import { Chapter } from "./Chapter";
import { Tag } from "./Tag";

export interface Story {
  id: string;
  title: string;
  author: string;
  synopsis?: string;
  category: 'Financial' | 'Technology' | 'Health';
  coverImage?: string;
  status: 'Draft' | 'Publish';
  tags?: Tag[];
  chapters?: Chapter[];
  createdAt: string;
  updatedAt: string;
}

export interface StoryFormData {
  title: string;
  author: string;
  synopsis?: string;
  category: string;
  status: string;
  tags?: string[];
  chapters?: Array<{ title: string; content: string; chapterOrder?: number }>;
  coverImage?: File;
}
