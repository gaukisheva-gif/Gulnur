export type NewsSource = 'ALTA_SOFT' | 'EAEU' | 'ZAKON_KZ';

export const sourceLabels: Record<NewsSource, string> = {
  ALTA_SOFT: 'Alta-Soft',
  EAEU: 'ЕЭК ЕАЭС',
  ZAKON_KZ: 'Zakon.kz',
};

export interface INewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  publishedAt: string;
  source: NewsSource;
  sourceUrl: string;
}

export interface INewsPage {
  content: INewsItem[];
  totalPages: number;
  number: number;
}
