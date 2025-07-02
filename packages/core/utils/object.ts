// biome-ignore lint/suspicious/noExplicitAny: this is generic so we need to allow any type
const toQueryString = (obj: Record<string, any>): string => {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
};

export const objectUtils = {
  toQueryString,
};
