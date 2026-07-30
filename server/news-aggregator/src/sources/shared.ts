import * as cheerio from 'cheerio';
import {fetchHtml} from '../fetchHtml';
import {NewsSource, RawCandidate} from '../types';

export interface SourceConfig {
  source: NewsSource;
  newsUrl: string;
  baseUrl: string;
  /**
   * CSS-селекторы ссылки на карточку новости, перебираются по порядку — берём
   * первый селектор, который что-то нашёл. НЕ ПРОВЕРЕНЫ на живой разметке
   * (см. SPEC.md, «Что уже известно» / «Селекторы не проверены»).
   */
  candidateSelectors: string[];
  maxItems?: number;
}

/** Общий разбор для всех четырёх источников: карточка = ссылка с текстом заголовка. */
export async function fetchGenericCandidates(config: SourceConfig): Promise<RawCandidate[]> {
  const html = await fetchHtml(config.newsUrl);
  const $ = cheerio.load(html);

  for (const selector of config.candidateSelectors) {
    const nodes = $(selector);
    if (nodes.length === 0) continue;

    const seen = new Set<string>();
    const candidates: RawCandidate[] = [];

    nodes.each((_, el) => {
      const anchor = $(el);
      const title = anchor.text().trim().replace(/\s+/g, ' ');
      const href = anchor.attr('href');
      if (!title || title.length < 8 || !href) return;

      let sourceUrl: string;
      try {
        sourceUrl = new URL(href, config.baseUrl).toString();
      } catch {
        return;
      }
      if (seen.has(sourceUrl)) return;
      seen.add(sourceUrl);

      candidates.push({title, sourceUrl, publishedAt: null, snippet: null, source: config.source});
    });

    if (candidates.length > 0) {
      return candidates.slice(0, config.maxItems ?? 30);
    }
  }

  return [];
}
