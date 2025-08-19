const BYTES_IN_KILOBYTE = 1024;
const BYTES_IN_MEGABYTE = 1024 * 1024;
const BYTES_IN_GIGABYTE = 1024 * 1024 * 1024;
const BYTES_IN_TERABYTE = 1024 * 1024 * 1024 * 1024;

const convertToFileSize = (bytes: number) => {
  if (bytes >= BYTES_IN_TERABYTE) {
    return `${(bytes / BYTES_IN_TERABYTE).toFixed(2)} TB`;
  }

  if (bytes >= BYTES_IN_GIGABYTE) {
    return `${(bytes / BYTES_IN_GIGABYTE).toFixed(2)} GB`;
  }

  if (bytes >= BYTES_IN_MEGABYTE) {
    return `${(bytes / BYTES_IN_MEGABYTE).toFixed(2)} MB`;
  }

  if (bytes >= BYTES_IN_KILOBYTE && bytes < BYTES_IN_MEGABYTE) {
    return `${(bytes / BYTES_IN_KILOBYTE).toFixed(2)} KB`;
  }

  return `${bytes} B`;
};

export const fileUtils = {
  convertToFileSize,
};
