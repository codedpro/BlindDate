export function parseUrlParams(url: string): Record<string, any> {
  const params = new URLSearchParams(url);
  const result: Record<string, any> = {};

  for (const [key, value] of params.entries()) {
    if (key === "user" || key === "tgWebAppThemeParams") {
      result[key] = JSON.parse(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}
