import {INewsItem, INewsPage} from './types';
import {mockNewsBySlug, mockNewsPage} from './mockNews';

// TODO: адрес бэкенда BROK, отдающего /api/v1/public/news (см. server/news-aggregator/SPEC.md).
// Пока пусто — экран работает на демо-данных из mockNews.ts.
const API_BASE_URL = '';

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  if (!API_BASE_URL) throw new Error('API_BASE_URL is not configured');
  const res = await fetch(`${API_BASE_URL}${path}`, {signal});
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

export async function fetchNewsList(page = 0, signal?: AbortSignal): Promise<{data: INewsPage; isLive: boolean}> {
  try {
    const data = await request<INewsPage>(`/api/v1/public/news?page=${page}&size=12`, signal);
    return {data, isLive: true};
  } catch {
    return {data: mockNewsPage(page), isLive: false};
  }
}

export async function fetchNewsItem(slug: string, signal?: AbortSignal): Promise<{data: INewsItem | null; isLive: boolean}> {
  try {
    const data = await request<INewsItem>(`/api/v1/public/news/${slug}`, signal);
    return {data, isLive: true};
  } catch {
    return {data: mockNewsBySlug(slug), isLive: false};
  }
}
