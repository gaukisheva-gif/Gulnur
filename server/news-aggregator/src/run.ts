import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fetchAllCandidates} from './sources/index';
import {isRelevant, scoreRelevance} from './relevance';
import {findDuplicate} from './dedupe';
import {NewsCandidate, RawCandidate} from './types';

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? './output';

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/ё/g, 'е')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // диакритика, оставшаяся после NFKD
    .replace(/[^a-z0-9Ѐ-ӿ]+/g, '-') // всё, кроме латиницы/цифр/кириллицы, -> дефис
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function toDraft(raw: RawCandidate, index: number): NewsCandidate {
  const {score} = scoreRelevance(raw.title, raw.snippet);
  return {
    id: `${raw.source.toLowerCase()}-${Date.now()}-${index}`,
    slug: slugify(raw.title) || `news-${Date.now()}-${index}`,
    title: raw.title,
    excerpt: raw.snippet ?? '',
    imageUrl: null,
    publishedAt: raw.publishedAt ?? new Date().toISOString(),
    source: raw.source,
    sourceUrl: raw.sourceUrl,
    status: 'DRAFT',
    relevanceScore: score,
  };
}

async function main() {
  const {candidates, errors} = await fetchAllCandidates();

  if (errors.length > 0) {
    console.warn('Источники, которые не удалось прочитать в этом прогоне:');
    for (const e of errors) console.warn(`  - ${e.source}: ${e.error}`);
  }

  const relevant = candidates.filter(c => isRelevant(c.title, c.snippet));
  console.log(`Найдено кандидатов: ${candidates.length}, по теме таможня/деньги: ${relevant.length}`);

  const accepted: NewsCandidate[] = [];
  relevant.forEach((raw, index) => {
    const draft = toDraft(raw, index);
    const dup = findDuplicate(draft, accepted);
    if (dup) {
      draft.status = 'DUPLICATE';
      draft.duplicateOf = dup.id;
      draft.duplicateScore = dup.score;
    }
    accepted.push(draft);
  });

  await mkdir(OUTPUT_DIR, {recursive: true});
  const outputPath = path.join(OUTPUT_DIR, `news-drafts-${new Date().toISOString().slice(0, 10)}.json`);
  await writeFile(outputPath, JSON.stringify(accepted, null, 2), 'utf-8');
  console.log(`Готово: ${outputPath}`);
  console.log('Дальше — вручную (или через будущий экран админки) разобрать DRAFT/DUPLICATE и опубликовать нужное.');
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
