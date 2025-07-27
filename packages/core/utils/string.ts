const pascalToKabob = (value: string) => {
  return value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
};

type IsPascalCaseOptions = {
  allowLeadingUnderscore?: boolean;
};

const isPascalCase = (value: string, options: IsPascalCaseOptions = {}): boolean => {
  let regex = '^';

  if (options.allowLeadingUnderscore) {
    regex += '(_)?';
  }

  regex += '([A-Z][a-z]+)+$';

  return new RegExp(regex).test(value);
};

type ToWordsOptions = {
  replaceDashes?: boolean;
};

// this should work for pascal case, camel case, and snake case
const toWords = (value: string, options: ToWordsOptions = {}): string => {
  if (!value) {
    return '';
  }

  let newValue = value;

  if (options.replaceDashes) {
    newValue = newValue.replace(/-/g, ' ');
  }

  newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);

  // handle snake case
  newValue = newValue
    .replace(/_/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => capitalize(word))
    .join('');

  // regex should match either:
  // - a sequence of uppercase letters (initialisms)
  // - an uppercase letter followed by lowercase letters
  const matches: RegExpMatchArray | null = newValue.match(/[A-Z]+(?=[A-Z][a-z]|$)|[A-Z][a-z]*/g);

  if (!matches) {
    return '';
  }

  return matches.join(' ');
};

const snakeToCamel = (value: string) => {
  if (!value) {
    return '';
  }

  return value.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

const capitalize = (str: string): string => {
  if (!str) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

const titleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};

type ToInitialismOptions = {
  limit?: number;
};

const toInitialism = (str: string, options: ToInitialismOptions = {}): string => {
  const initials = str
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();

  return options.limit ? initials.slice(0, options.limit) : initials;
};

const splitOnce = (str: string, separator: string): [string, string] => {
  const index = str.indexOf(separator);

  if (index === -1) {
    return [str, ''];
  }

  return [str.slice(0, index), str.slice(index + 1)];
};

export const stringUtils = {
  pascalToKabob,
  isPascalCase,
  toWords,
  snakeToCamel,
  capitalize,
  titleCase,
  toInitialism,
  splitOnce,
};
