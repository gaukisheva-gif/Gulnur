export type NewsSource = 'ALTA_SOFT' | 'EAEU' | 'KGD' | 'ZAKON_KZ';

export type NewsStatus = 'DRAFT' | 'PUBLISHED' | 'REJECTED' | 'DUPLICATE';

/** Сырой кандидат, как его вернул парсер конкретного источника — до фильтра и дедупликации. */
export interface RawCandidate {
  title: string;
  /** Прямая ссылка на статью на источнике — обязательна. */
  sourceUrl: string;
  /** Дата публикации, если источник её отдаёт (ISO); иначе null — проставляется на момент сбора. */
  publishedAt: string | null;
  /** Короткий сниппет/лид с источника, если есть — черновик excerpt, редактор его правит. */
  snippet: string | null;
  source: NewsSource;
}

export interface NewsCandidate {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  publishedAt: string;
  source: NewsSource;
  sourceUrl: string;
  status: NewsStatus;
  relevanceScore: number;
  duplicateOf?: string;
  duplicateScore?: number;
}
