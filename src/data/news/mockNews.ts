import {INewsItem, INewsPage} from './types';

/**
 * Демо-данные на случай, если бэкенд агрегатора новостей (server/news-aggregator)
 * ещё не поднят или недоступен. Каждый пункт — правдоподобный пример в духе
 * реальных тем лета 2026 года, НЕ сверенный с фактической публикацией на
 * источнике (сайты источников недоступны из песочницы, где это писалось —
 * см. SPEC.md). Перед показом реальным пользователям заменить на настоящие
 * новости. Источники — только те три, что подтвердил продакт: ALTA_SOFT,
 * EAEU, ZAKON_KZ (KGD исключён по его решению от 30.07.2026).
 */
export const mockNews: INewsItem[] = [
  {
    id: 'demo-1',
    slug: 'tovarooborot-rf-rk-rost-iyul-2026',
    title: 'Товарооборот России и Казахстана вырос почти на 15% за пять месяцев 2026 года',
    excerpt:
      'На заседании Межправительственной комиссии сопредседатели отметили рост взаимной торговли до 12,2 млрд долларов и договорились уделить особое внимание таможенному администрированию и логистике.',
    imageUrl: null,
    publishedAt: '2026-07-22T09:00:00Z',
    source: 'EAEU',
    sourceUrl: 'https://eec.eaeunion.org/news/',
  },
  {
    id: 'demo-3',
    slug: 'eaes-poshlina-elektronnaya-torgovlya-iyul-2026',
    title: 'С 1 июля 2026 года в ЕАЭС изменились правила для товаров интернет-торговли',
    excerpt:
      'Товары электронной торговли выделены в отдельную категорию: при превышении лимита в 200 евро за посылку взимается пошлина 5% от стоимости и НДС 16%.',
    imageUrl: null,
    publishedAt: '2026-07-05T09:00:00Z',
    source: 'ZAKON_KZ',
    sourceUrl: 'https://www.zakon.kz/news/',
  },
  {
    id: 'demo-4',
    slug: 'ett-eaes-raschet-stavok-deklarantam',
    title: 'Разъяснение по расчёту ставок ЕТТ ЕАЭС для декларантов',
    excerpt:
      'Портал для участников ВЭД напоминает, как правильно определять код ТН ВЭД и применяемую ставку Единого таможенного тарифа при расчёте платежей по декларации.',
    imageUrl: null,
    publishedAt: '2026-06-28T09:00:00Z',
    source: 'ALTA_SOFT',
    sourceUrl: 'https://alta-soft.kz/',
  },
];

const PAGE_SIZE = 12;

export function mockNewsPage(page: number): INewsPage {
  const start = page * PAGE_SIZE;
  return {
    content: mockNews.slice(start, start + PAGE_SIZE),
    totalPages: Math.max(1, Math.ceil(mockNews.length / PAGE_SIZE)),
    number: page,
  };
}

export function mockNewsBySlug(slug: string): INewsItem | null {
  return mockNews.find(n => n.slug === slug) ?? null;
}
