import { describe, expect, it } from 'vitest';

import { fileUtils } from '$/core/utils/file';

describe('file utils', () => {
  describe('convertToFileSize', () => {
    it('works for bytes', () => {
      const results = fileUtils.convertToFileSize(1);

      expect(results).to.equal('1 B');
    });

    it('works for kilobytes', () => {
      const results = fileUtils.convertToFileSize(1024);

      expect(results).to.equal('1.00 KB');
    });

    it('works for megabytes', () => {
      const results = fileUtils.convertToFileSize(1024 * 1024);

      expect(results).to.equal('1.00 MB');
    });

    it('works for gigabytes', () => {
      const results = fileUtils.convertToFileSize(1024 * 1024 * 1024);

      expect(results).to.equal('1.00 GB');
    });
  });
});
