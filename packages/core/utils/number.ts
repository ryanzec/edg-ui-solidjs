type FormatNumberOptions = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

const defaultFormatNumberOptions: FormatNumberOptions = {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
};

const isNumber = (value: string): boolean => {
  return !Number.isNaN(Number(value)) && !Number.isNaN(Number.parseFloat(value as string));
};

const formatNumber = (value: number | string, options: FormatNumberOptions = defaultFormatNumberOptions): string => {
  if (isNumber(value as string) === false) {
    return value as string;
  }

  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: options.minimumFractionDigits,
    maximumFractionDigits: options.maximumFractionDigits,
  });
};

export const numberUtils = {
  isNumber,
  formatNumber,
};
