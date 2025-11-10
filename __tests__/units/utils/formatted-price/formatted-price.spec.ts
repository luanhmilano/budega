import { describe, expect, it } from 'vitest';

import { formattedPrice } from '../../../../src/utils/formatted-price/index';

describe('formattedPrice', () => {
  it('should format positive integers correctly', () => {
    expect(formattedPrice(100)).toBe('R$\u00A0100,00');
    expect(formattedPrice(1000)).toBe('R$\u00A01.000,00');
    expect(formattedPrice(10000)).toBe('R$\u00A010.000,00');
  });

  it('should format decimal numbers correctly', () => {
    expect(formattedPrice(99.99)).toBe('R$\u00A099,99');
    expect(formattedPrice(1234.56)).toBe('R$\u00A01.234,56');
    expect(formattedPrice(0.01)).toBe('R$\u00A00,01');
  });

  it('should format zero correctly', () => {
    expect(formattedPrice(0)).toBe('R$\u00A00,00');
  });

  it('should format negative numbers correctly', () => {
    expect(formattedPrice(-100)).toBe('-R$\u00A0100,00');
    expect(formattedPrice(-1234.56)).toBe('-R$\u00A01.234,56');
  });

  it('should handle very large numbers', () => {
    expect(formattedPrice(1000000)).toBe('R$\u00A01.000.000,00');
    expect(formattedPrice(999999999.99)).toBe('R$\u00A0999.999.999,99');
  });

  it('should handle very small decimal numbers', () => {
    expect(formattedPrice(0.001)).toBe('R$\u00A00,00');
    expect(formattedPrice(0.005)).toBe('R$\u00A00,01');
  });

  it('should round numbers with more than 2 decimal places', () => {
    expect(formattedPrice(99.999)).toBe('R$\u00A0100,00');
    expect(formattedPrice(99.994)).toBe('R$\u00A099,99');
  });
});
