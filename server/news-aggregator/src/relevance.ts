/**
 * Простой keyword-фильтр «относится ли новость к таможне и/или деньгам».
 * Сознательно не ML-классификатор — источников слишком мало и они нестабильны
 * по разметке, чтобы сейчас оправдать полноценную модель. Если фильтр начнёт
 * пропускать явный мусор или резать нужное — это первое место для правки
 * (см. SPEC.md, раздел «Фильтр релевантности»).
 */
const CUSTOMS_KEYWORDS = [
  'таможен', // таможня, таможенный, таможенное...
  'декларац', // декларация, декларант, декларирование
  'вэд',
  'тн вэд',
  'тнвэд',
  'пошлин',
  'тариф', // в т.ч. ЕТТ ЕАЭС
  'ис «кеден»',
  'ис кеден',
  'спот', // система прослеживаемости и оперативного контроля товаров
  'еаэс',
  'еэк',
  'евразийск',
  'таможенный представитель',
  'таможенный брокер',
  'товарооборот',
  'экспорт',
  'импорт',
  'граница',
  'пункт пропуска',
];

const MONEY_KEYWORDS = [
  'ндс',
  'акциз',
  'бюджет',
  'государственн доход',
  'государственные доходы',
  'кгд',
  'налог',
  'платеж',
  'платёж',
  'сбор',
  'валют',
  'курс тенге',
  'нацбанк',
  'финанс',
];

function normalize(text: string): string {
  return text.toLowerCase().replace(/ё/g, 'е');
}

export interface RelevanceResult {
  score: number;
  matchedCustoms: string[];
  matchedMoney: string[];
}

/**
 * score = 1, если найдено хотя бы одно слово из таможенной темы;
 * 0.6, если найдено только денежное слово без таможенного контекста
 * (менее уверенный сигнал — такие кандидаты стоит явно помечать редактору);
 * 0 — не по теме, кандидат отбрасывается.
 */
export function scoreRelevance(title: string, snippet: string | null): RelevanceResult {
  const haystack = normalize(`${title} ${snippet ?? ''}`);

  const matchedCustoms = CUSTOMS_KEYWORDS.filter(k => haystack.includes(normalize(k)));
  const matchedMoney = MONEY_KEYWORDS.filter(k => haystack.includes(normalize(k)));

  if (matchedCustoms.length > 0) {
    return {score: 1, matchedCustoms, matchedMoney};
  }
  if (matchedMoney.length > 0) {
    return {score: 0.6, matchedCustoms, matchedMoney};
  }
  return {score: 0, matchedCustoms, matchedMoney};
}

export function isRelevant(title: string, snippet: string | null, threshold = 0.6): boolean {
  return scoreRelevance(title, snippet).score >= threshold;
}
