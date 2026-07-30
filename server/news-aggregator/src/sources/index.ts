import {RawCandidate} from '../types';
import {fetchAltaSoftCandidates} from './altaSoft';
import {fetchEaeuCandidates} from './eaeu';
import {fetchZakonKzCandidates} from './zakonKz';

const fetchers = [fetchAltaSoftCandidates, fetchEaeuCandidates, fetchZakonKzCandidates];

export interface FetchAllResult {
  candidates: RawCandidate[];
  errors: {source: string; error: string}[];
}

/** Один упавший источник не должен ронять весь прогон — ошибки собираются отдельно. */
export async function fetchAllCandidates(): Promise<FetchAllResult> {
  const candidates: RawCandidate[] = [];
  const errors: {source: string; error: string}[] = [];

  for (const fetcher of fetchers) {
    try {
      candidates.push(...(await fetcher()));
    } catch (err) {
      errors.push({source: fetcher.name, error: err instanceof Error ? err.message : String(err)});
    }
  }

  return {candidates, errors};
}
