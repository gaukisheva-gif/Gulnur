import {RawCandidate} from '../types';
import {fetchGenericCandidates} from './shared';

/**
 * alta-soft.kz — портал для участников ВЭД (не путать с российским alta.ru).
 * URL — https://alta-soft.kz/, как указано владельцем продукта; своей ссылки
 * на раздел новостей я не подбирал. Селекторы — рабочая гипотеза, не проверены
 * на живой разметке: и обычный запрос, и WebFetch получают 403 от этого домена
 * из текущей песочницы. Открыть страницу в браузере и поправить перед первым
 * запуском (см. SPEC.md) — если новости на главной не собраны отдельным
 * блоком, возможно, понадобится сначала найти реальный URL раздела новостей.
 */
const NEWS_URL = 'https://alta-soft.kz/';
const BASE_URL = 'https://alta-soft.kz';
const CANDIDATE_SELECTORS = ['.news-list a', '.news-item a', 'article a', '.card a'];

export function fetchAltaSoftCandidates(): Promise<RawCandidate[]> {
  return fetchGenericCandidates({
    source: 'ALTA_SOFT',
    newsUrl: NEWS_URL,
    baseUrl: BASE_URL,
    candidateSelectors: CANDIDATE_SELECTORS,
  });
}
