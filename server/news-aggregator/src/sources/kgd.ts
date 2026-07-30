import {RawCandidate} from '../types';
import {fetchGenericCandidates} from './shared';

/**
 * Пресс-служба Комитета государственных доходов МФ РК — таможня, налоги,
 * платежи в бюджет. URL раздела новостей подтверждён поиском, разметка не
 * проверена (см. SPEC.md).
 */
const NEWS_URL = 'https://kgd.gov.kz/ru/newslettercategory/novosti';
const BASE_URL = 'https://kgd.gov.kz';
const CANDIDATE_SELECTORS = ['.views-row a', '.node-title a', '.view-content a', 'article a'];

export function fetchKgdCandidates(): Promise<RawCandidate[]> {
  return fetchGenericCandidates({
    source: 'KGD',
    newsUrl: NEWS_URL,
    baseUrl: BASE_URL,
    candidateSelectors: CANDIDATE_SELECTORS,
  });
}
