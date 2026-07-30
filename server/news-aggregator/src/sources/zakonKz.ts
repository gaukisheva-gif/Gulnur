import {RawCandidate} from '../types';
import {fetchGenericCandidates} from './shared';

/**
 * Общий новостной портал — отбираем по теме через relevance.ts. Можно заменить
 * NEWS_URL на более узкий тег по Комитету госдоходов:
 * https://www.zakon.kz/organization/Komitet-gosudarstvennykh-dokhodov/
 * URL подтверждён поиском, разметка не проверена: WebFetch на этот адрес тоже
 * вернул 403 из текущей песочницы (см. SPEC.md).
 */
const NEWS_URL = 'https://www.zakon.kz/news/';
const BASE_URL = 'https://www.zakon.kz';
const CANDIDATE_SELECTORS = ['.short-news a', '.news-list__item a', '.b-article-item a', 'article a'];

export function fetchZakonKzCandidates(): Promise<RawCandidate[]> {
  return fetchGenericCandidates({
    source: 'ZAKON_KZ',
    newsUrl: NEWS_URL,
    baseUrl: BASE_URL,
    candidateSelectors: CANDIDATE_SELECTORS,
  });
}
