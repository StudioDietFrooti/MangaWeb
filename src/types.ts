export interface MangaPage {
  id: string;
  pageNumber: number;
  imageUrl?: string; // Real uploaded/linked image
  placeholderTitle?: string;
  placeholderNotes?: string;
}

export interface MangaChapter {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  isAvailable: boolean;
  pages: MangaPage[];
  releaseNote?: string;
}

export interface OrderRequest {
  id: string;
  fullName: string;
  classSection: string;
  volumeChapter: string;
  copies: number;
  message?: string;
  createdAt: string;
  status: 'Pending' | 'Confirmed';
}

export type ReaderMode = 'vertical' | 'single' | 'grid';
export type ReaderBackground = 'ink' | 'paper' | 'gray';
export type ViewTab = 'home' | 'read' | 'chapters' | 'order' | 'about';
