import { describe, expect, it } from 'vitest';
import { tailwindUtils } from '$/core/utils/tailwind';

describe('tailwind utils', () => {
  it('color works', () => {
    expect(tailwindUtils.merge('bg-brand', 'bg-brand-bold')).toBe('bg-brand-bold');
    expect(tailwindUtils.merge('text-brand', 'text-brand-bold')).toBe('text-brand-bold');
    expect(tailwindUtils.merge('border-brand', 'border-brand-bold')).toBe('border-brand-bold');
    expect(tailwindUtils.merge('bg-brand', 'bg-brand-bold')).toBe('bg-brand-bold');
    expect(tailwindUtils.merge('bg-brand', 'bg-brand-bold')).toBe('bg-brand-bold');
    expect(tailwindUtils.merge('bg-brand', 'bg-brand-bold')).toBe('bg-brand-bold');
  });

  it('color and font size works', () => {
    const result = tailwindUtils.merge('text-3xs', 'bg-brand-bold');

    expect(result).toBe('text-3xs bg-brand-bold');
  });

  it('spacing works', () => {
    expect(tailwindUtils.merge('p-base', 'p-lg')).toBe('p-lg');
    expect(tailwindUtils.merge('px-base', 'px-lg')).toBe('px-lg');
    expect(tailwindUtils.merge('py-base', 'py-lg')).toBe('py-lg');
  });

  it('border radius works', () => {
    expect(tailwindUtils.merge('rounded-sm', 'rounded-base')).toBe('rounded-base');
  });

  it('z-index works', () => {
    expect(tailwindUtils.merge('z-dialog', 'z-tooltip')).toBe('z-tooltip');
  });

  it('opacity works', () => {
    expect(tailwindUtils.merge('opacity-none', 'opacity-full')).toBe('opacity-full');
  });

  it('font family works', () => {
    expect(tailwindUtils.merge('font-switzer', 'font-ibm-plex-mono')).toBe('font-ibm-plex-mono');
  });

  it('font weight works', () => {
    expect(tailwindUtils.merge('font-regular', 'font-medium')).toBe('font-medium');
  });

  it('different font classes work', () => {
    expect(tailwindUtils.merge('font-switzer', 'font-medium', 'text-3xs', 'text-brand')).toBe(
      'font-switzer font-medium text-3xs text-brand',
    );
  });
});
