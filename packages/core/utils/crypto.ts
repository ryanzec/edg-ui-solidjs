import sparkMd5 from 'spark-md5';

import type { CommonDataType } from '$/core/types/generic';

const md5 = (data: CommonDataType) => {
  return sparkMd5.hash(JSON.stringify(data));
};

const sha256 = async (message: string): Promise<string> => {
  // Convert the message string to an ArrayBuffer
  const msgBuffer = new TextEncoder().encode(message);

  // Hash the message using the SubtleCrypto interface
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // Convert the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
};

export const cryptoUtils = {
  md5,
  sha256,
};
