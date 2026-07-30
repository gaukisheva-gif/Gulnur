import {RawCandidate} from '../types';
import {fetchGenericCandidates} from './shared';

/**
 * Официальные новости Евразийской экономической комиссии — основной источник
 * по теме «таможенное сотрудничество Казахстан ↔ Россия / ЕАЭС». URL ленты
 * подтверждён поиском, но сама разметка не проверена (см. SPEC.md).
 */
const NEWS_URL = 'https://eec.eaeunion.org/news/';
const BASE_URL = 'https://eec.eaeunion.org';
const CANDIDATE_SELECTORS = ['.news-item a', '.views-row a', '.b-news-list__item a', 'article a'];

export function fetchEaeuCandidates(): Promise<RawCandidate[]> {
  return fetchGenericCandidates({
    source: 'EAEU',
    newsUrl: NEWS_URL,
    baseUrl: BASE_URL,
    candidateSelectors: CANDIDATE_SELECTORS,
  });
}
