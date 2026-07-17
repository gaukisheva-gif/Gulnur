import {fallbackRates} from './mockData';

export type Rate = {code: string; name: string; rate: number};

const NBK_URL = 'https://www.nationalbank.kz/rss/rates_all.xml';

const nbkNames: Record<string, string> = {
  AUD: 'Австралийский доллар',
  AZN: 'Азербайджанский манат',
  AMD: 'Армянский драм',
  BYN: 'Белорусский рубль',
  BRL: 'Бразильский реал',
  HUF: 'Венгерский форинт',
  HKD: 'Гонконгский доллар',
  GEL: 'Грузинский лари',
  DKK: 'Датская крона',
  AED: 'Дирхам ОАЭ',
  USD: 'Доллар США',
  EUR: 'Евро',
  INR: 'Индийская рупия',
  IRR: 'Иранский риал',
  CAD: 'Канадский доллар',
  CNY: 'Китайский юань',
  KWD: 'Кувейтский динар',
  KGS: 'Кыргызский сом',
  MYR: 'Малазийский ринггит',
  MXN: 'Мексиканское песо',
  MDL: 'Молдавский лей',
  NOK: 'Норвежская крона',
  PLN: 'Польский злотый',
  SAR: 'Риял Саудовской Аравии',
  RUB: 'Российский рубль',
  XDR: 'СДР',
  SGD: 'Сингапурский доллар',
  TJS: 'Таджикский сомони',
  THB: 'Тайский бат',
  TRY: 'Турецкая лира',
  UZS: 'Узбекский сум',
  UAH: 'Украинская гривна',
  GBP: 'Фунт стерлингов',
  CZK: 'Чешская крона',
  SEK: 'Шведская крона',
  CHF: 'Швейцарский франк',
  ZAR: 'Южно-Африканский рэнд',
  KRW: 'Южно-корейская вона',
  JPY: 'Японская йена',
};

function extractTag(block: string, tag: string): string | null {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i'));
  return match ? match[1].trim() : null;
}

function parseNbkXml(xml: string): Rate[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  const rates: Rate[] = [];
  items.forEach(block => {
    const code = extractTag(block, 'title');
    const desc = extractTag(block, 'description');
    const quantStr = extractTag(block, 'quant');
    if (!code || !desc || !nbkNames[code]) return;
    const rate = parseFloat(desc);
    const quant = quantStr ? parseInt(quantStr, 10) : 1;
    if (!isNaN(rate) && quant > 0) {
      rates.push({code, name: nbkNames[code], rate: rate / quant});
    }
  });
  return rates;
}

export async function fetchNbkRates(): Promise<{rates: Rate[]; isLive: boolean}> {
  try {
    const res = await fetch(NBK_URL, {headers: {Accept: 'application/xml,text/xml'}});
    if (!res.ok) throw new Error('bad status');
    const xml = await res.text();
    const rates = parseNbkXml(xml);
    if (!rates.length) throw new Error('empty');
    return {rates, isLive: true};
  } catch {
    return {rates: fallbackRates, isLive: false};
  }
}

export const priorityOrder = ['USD', 'EUR', 'CNY', 'RUB', 'GBP', 'TRY', 'AED', 'CHF', 'JPY', 'KRW'];

export function sortRates(rates: Rate[]): Rate[] {
  return [...rates].sort((a, b) => {
    let ia = priorityOrder.indexOf(a.code);
    let ib = priorityOrder.indexOf(b.code);
    if (ia === -1) ia = 999;
    if (ib === -1) ib = 999;
    if (ia !== ib) return ia - ib;
    return a.name.localeCompare(b.name, 'ru');
  });
}

export function pseudoTrend(code: string): number {
  let seed = 0;
  for (let i = 0; i < code.length; i++) seed += code.charCodeAt(i) * (i + 7);
  const day = Math.floor(Date.now() / 86400000);
  seed = Math.abs((seed * 31 + day * 17) % 1000);
  return ((seed % 240) - 120) / 100;
}
