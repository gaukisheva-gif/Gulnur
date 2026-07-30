import {RawCandidate} from '../types';
import {fetchGenericCandidates} from './shared';

/**
 * alta-soft.kz — портал для участников ВЭД (не путать с российским alta.ru).
 * NEWS_URL и селекторы — рабочая гипотеза, не проверены на живой разметке: из
 * песочницы, где писался этот код, домен недоступен (403 на CONNECT). Открыть
 * страницу в браузере и поправить перед первым запуском (см. SPEC.md).
 */
const NEWS_URL = 'https://alta-soft.kz/news';
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
