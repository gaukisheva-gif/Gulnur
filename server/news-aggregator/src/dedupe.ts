/**
 * Грубая дедупликация по заголовку (та же идея, что duplicateOf/duplicateScore
 * в news-admin SmartCargo): разные источники нередко пишут об одном и том же
 * событии (например, встрече Межправкомиссии РФ-РК) почти одинаковыми словами.
 * Дубль не отбрасываем — помечаем, редактор решает сам.
 */
const STOPWORDS = new Set(['и', 'в', 'на', 'с', 'по', 'для', 'от', 'до', 'из', 'о', 'к', 'за', 'а', 'the', 'a']);

function tokenize(title: string): Set<string> {
  return new Set(
    title
      .toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !STOPWORDS.has(w)),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const w of a) if (b.has(w)) intersection++;
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

export interface DuplicateMatch {
  id: string;
  score: number;
}

/** threshold подобран на глаз (нет реальных данных для калибровки) — при первых
 * прогонах свериться вручную и подправить. */
export function findDuplicate<T extends {id: string; title: string}>(
  candidate: {title: string},
  existing: T[],
  threshold = 0.5,
): DuplicateMatch | null {
  const candidateTokens = tokenize(candidate.title);
  let best: DuplicateMatch | null = null;
  for (const item of existing) {
    const score = jaccard(candidateTokens, tokenize(item.title));
    if (score >= threshold && (!best || score > best.score)) {
      best = {id: item.id, score};
    }
  }
  return best;
}
