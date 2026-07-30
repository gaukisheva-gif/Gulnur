const USER_AGENT = 'Mozilla/5.0 (compatible; BrokNewsBot/0.1; +https://brok.kz)';

/**
 * Скачивает страницу источника. Ошибку не глотает — вызывающий код каждого
 * source-модуля должен сам решить, что делать при недоступности сайта
 * (обычно: залогировать и пропустить прогон для этого источника).
 */
export async function fetchHtml(url: string, timeoutMs = 15000): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: {'User-Agent': USER_AGENT, Accept: 'text/html,application/xhtml+xml'},
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`${url} -> HTTP ${res.status}`);
    }
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}
